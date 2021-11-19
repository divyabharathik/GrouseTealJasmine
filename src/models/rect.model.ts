import { Circle } from './circle.model';
import { Point, Shape, Type } from './shape.model';

export class Rect implements Shape {
  readonly center: Point;
  readonly width: number;
  readonly height: number;
  readonly type: Type;

  constructor(x: number, y: number, width: number, height: number) {
    this.center = <Point>{ x, y };
    this.type = Type.RECT;
    this.width = width;
    this.height = height;
  }

  collides(other: Shape): boolean {
    switch (other.type) {
      case Type.CIRCLE:
        const circle: Circle = Circle.fromShape(other);
        const target: Point = circle.center;
        const pointDistance: Point = <Point>{
          x: Math.abs(this.center.x - target.x),
          y: Math.abs(this.center.y - target.y),
        };

        if (pointDistance.x > this.width / 2 + circle.radius) {
          return false;
        } else if (pointDistance.y > this.height / 2 + circle.radius) {
          return false;
        } else if (pointDistance.x <= this.width / 2) {
          return true;
        } else if (pointDistance.y <= this.height / 2) {
          return true;
        }
        const circleToRectDistance =
          Math.pow(pointDistance.x - this.width / 2, 2) +
          Math.pow(pointDistance.y - this.height / 2, 2);
        return circleToRectDistance <= Math.pow(circle.radius, 2);
      case Type.RECT:
        const rec2: Rect = Rect.fromShape(other);
        const topEdge1 = this.center.y + this.height;
        const rightEdge1 = this.center.x + this.width;
        const leftEdge1 = this.center.x;
        const bottomEdge1 = this.center.y;
        const topEdge2 = rec2.center.y + rec2.height;
        const rightEdge2 = rec2.center.x + rec2.width;
        const leftEdge2 = rec2.center.x;
        const bottomEdge2 = rec2.center.y;
        if (
          leftEdge1 < rightEdge2 &&
          rightEdge1 > leftEdge2 &&
          bottomEdge1 < topEdge2 &&
          topEdge1 > bottomEdge2
        ) {
          return true;
        }
        return false;
      default:
        throw new Error(`Invalid shape type!`);
    }
  }

  /**
   * Typecasts a Shape object into this Shape type
   * @param other the Shape object
   * @returns a Rect object
   */
  static fromShape(other: Shape): Rect {
    const polymorph = <any>other;
    if (!polymorph.width || !polymorph.height) {
      throw new Error('Shape is invalid! Cannot convert to a Rectangle');
    }

    return new Rect(
      polymorph.center.x,
      polymorph.center.y,
      polymorph.width,
      polymorph.height,
    );
  }
}
