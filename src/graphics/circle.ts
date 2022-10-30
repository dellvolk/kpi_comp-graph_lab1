import {stage} from './stage'
import {IPoint} from "./types";

interface ICircle {
    startPoint: IPoint
    endPoint: IPoint
}

export default function (x: number, y: number, r: number, startAngle: number, endAngle: number, counterclockwise?: boolean): ICircle {
    const {ctx, pos, px_per_sm} = stage;

    ctx.beginPath()
    ctx.lineWidth = 2;

    x *= px_per_sm
    y *= px_per_sm
    r *= px_per_sm;

    if (counterclockwise) { // swap
        // [startAngle, endAngle] = [endAngle, startAngle]
        startAngle += Math.PI
        endAngle += Math.PI
    }

    let startPoint: IPoint,
        endPoint: IPoint

    const step = .15
    for (let i = startAngle; i < endAngle; i += step) {
        let l = i + step

        let px = r * Math.cos(i) + x,
            py = r * Math.sin(i) + y,
            qx = r * Math.cos(l) + x,
            qy = r * Math.sin(l) + y

        if (i === startAngle) {
            startPoint = {x: (r / px_per_sm) * Math.cos(i) + (x / px_per_sm), y: (r / px_per_sm) * Math.sin(i) + (y / px_per_sm)}
        }

        if (i + step >= endAngle) {
            endPoint = {x: (r / px_per_sm) * Math.cos(l) + (x / px_per_sm), y: (r / px_per_sm) * Math.sin(l) + (y / px_per_sm)}
        }

        ctx.moveTo(...pos(px,py))
        ctx.lineTo(...pos(qx,qy))
        ctx.stroke()
    }

    // @ts-ignore
    return {startPoint, endPoint}
}
