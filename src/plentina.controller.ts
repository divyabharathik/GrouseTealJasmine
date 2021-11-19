import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { PlentinaService } from './plentina.service';

export interface ShapeDTO {
  x: number;
  y: number;
  radius?: number;
  width?: number;
  height?: number;
}

export interface CollideShapesRequest {
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

export interface CollideShapesResponse {
  collides: boolean;
  firstShape: ShapeDTO;
  secondShape: ShapeDTO;
}

@Controller()
export class PlentinaController {
  constructor(private readonly plentinaService: PlentinaService) {}

  @Get()
  healthCheck(): any {
    return this.plentinaService.healthCheck();
  }

  @Post('/shape')
  collideShapes(@Body() req: CollideShapesRequest, @Res() res: Response) {
    try {
      const response: CollideShapesResponse =
        this.plentinaService.doShapesCollide(req);
      res.status(HttpStatus.OK).json(response);
    } catch (e) {
      res.status(HttpStatus.BAD_REQUEST).json(e);
    }
  }
}
