import {stage} from './stage'
import {IPoint} from "./types";

export const LinePoint = (a:IPoint, b: IPoint):void => {
    Line(a.x, a.y, b.x, b.y)
}

export default function Line(x1: number, y1: number, x2: number, y2: number): void {
    const {ctx, pos, px_per_sm,} = stage;

    ctx.beginPath()
    ctx.lineWidth = 2;

    x1 *= px_per_sm
    y1 *= px_per_sm

    x2 *= px_per_sm
    y2 *= px_per_sm

    ctx.moveTo(...pos(x1, y1))
    ctx.lineTo(...pos(x2, y2))
    ctx.stroke()

}
