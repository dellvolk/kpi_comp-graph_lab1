import {stage} from './stage'

export default function(x: number, y: number, r: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void {
    const {ctx, pos, px_per_sm, shift, transform} = stage;

    ctx.beginPath()
    ctx.lineWidth = 2;

    x *= px_per_sm
    y *= px_per_sm
    r *= px_per_sm;


    const step = .01
    for(let i = startAngle; i < endAngle; i+= step) {
        let l = i + step

        let px = r * Math.cos(i) + x,
            py = r * Math.sin(i) + y,
            qx = r * Math.cos(l) + x,
            qy = r * Math.sin(l) + y

        ctx.moveTo(...pos(px,py))
        ctx.lineTo(...pos(qx,qy))
        ctx.stroke()
    }

}
