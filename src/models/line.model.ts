import { Circle } from './circle.model';
import { Rect } from './rect.model';
import { distanceBetween, Point, Shape, Type } from './shape.model';
export class Line implements Shape {
  readonly center: Point;
  readonly start: Point;
  readonly end: Point;
  readonly type: Type;
  constructor(start: Point, end: Point) {
    this.start = start;
    this.end = end;
    this.center = this.midpoint(start, end);
    this.type = Type.LINE;
  }
  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const _other = <Circle>(<any>other);
        const distance = distanceBetween(this.center, _other.center);
        return distance <= _other.radius;
      case Type.RECT:
        const rect: Rect = Rect.fromShape(other);
        const topEdge1 = this.center.y + 0;
        const rightEdge1 =
          this.center.x + distanceBetween(this.start, this.end);
        const leftEdge1 = this.center.x;
        const bottomEdge1 = this.center.y;
        const topEdge2 = rect.center.y + rect.height;
        const rightEdge2 = rect.center.x + rect.width;
        const leftEdge2 = rect.center.x;
        const bottomEdge2 = rect.center.y;
        if (
          leftEdge1 < rightEdge2 &&
          rightEdge1 > leftEdge2 &&
          bottomEdge1 < topEdge2 &&
          topEdge1 > bottomEdge2
        ) {
          return true;
        }
        return false;
      case Type.LINE:
        const line: Line = Line.fromShape(other);
        return this.intersect(this.start, this.end, line.start, line.end);
      default:
        throw new Error(`Invalid shape type!`);
    }
  }
  static fromShape(other: Shape): Line {
    const polymorph = <any>other;
    return new Line(polymorph.start, polymorph.end);
  }
  midpoint(start: Point, end: Point): Point {
    return { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
  }
  ccw(A: Point, B: Point, C: Point) {
    return (C.y - A.y) * (B.x - A.x) > (B.y - A.y) * (C.x - A.x);
  }
  intersect(A: Point, B: Point, C: Point, D: Point) {
    return (
      this.ccw(A, C, D) != this.ccw(B, C, D) &&
      this.ccw(A, B, C) != this.ccw(A, B, D)
    );
  }
}
