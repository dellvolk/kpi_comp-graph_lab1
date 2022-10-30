import {stage} from './stage'

export default function (ctx: CanvasRenderingContext2D) {
    const {setTransformMatrix} = stage

    function arrows() {
        const { grid_width, px_per_sm } = stage

        ctx.lineWidth = 2.5
        const { pos } = stage
        const p = grid_width - px_per_sm / 2,
            q = px_per_sm / 2
        ctx.moveTo(...pos(p, q, true))
        ctx.lineTo(...pos(grid_width, 0, true))
        ctx.lineTo(...pos(p, -q, true))

        ctx.moveTo(...pos(q, p, true))
        ctx.lineTo(...pos(0, grid_width, true))
        ctx.lineTo(...pos(-q, p, true))
    }

    function coords() {
        const { grid_width, px_per_sm, pos } = stage

        ctx.beginPath()

        arrows()
        ctx.lineWidth = 2.5

        for (let i = 0; i < grid_width; i += px_per_sm) {
            if (i === px_per_sm) {
                ctx.stroke();
                ctx.lineWidth = .25
            }
            ctx.moveTo(...pos(i, 0, true))
            ctx.lineTo(...pos(i, grid_width, true))

            ctx.moveTo(...pos(0, i, true))
            ctx.lineTo(...pos(grid_width, i, true))

        }

        ctx.stroke()
        ctx.lineWidth = 1
    }

    function draw() {
        // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        coords()
    }

    return {
        draw
    }
}
