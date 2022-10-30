import {stage} from './stage'
import Grid from './grid'
import Circle from './circle'
import {ICore, IPoint} from "./types";
import {LinePoint} from "./line";

const point = (x: number, y: number): IPoint => ({x, y})

export default function (): ICore {

    const canvas = document.getElementById('stage') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.beginPath();

    stage.ctx = ctx;

    const {height: HEIGHT, width: WIDTH} = stage

    canvas.width = WIDTH
    canvas.height = HEIGHT

    const grid = Grid(ctx)

    // @ts-ignore
    window.ctx = ctx

    stage.setTransformMatrix([
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1],
    ])

    function drawPivot() {
        ctx.strokeStyle = 'blue' // pivot point
        Circle(stage.rotation.x, stage.rotation.y, .1, 0, 2 * Math.PI)
        ctx.strokeStyle = 'black'
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        grid.draw()

        ctx.beginPath()

        figure()

        drawPivot()

        ctx.closePath()
    }

    function figure() {
        const {figure: {d1, d2, r1, r2, d3, d4, r3, r4}} = stage

        // Outside figure
        const outside = () => {
            // Outside figure
            const P = ((22 * Math.sqrt(2)) / 2)

            const t1 = (d1 / Math.sqrt(2)) / 2
            const t2 = (d2 / Math.sqrt(2)) / 2

            const a = point(P - t1, P + t1)
            const b = point(P + t1, P - t1)

            // console.log({P, t1,t2, a,b})
            const c = point(-P + t2, -P - t2)
            const d = point(-P - t2, -P + t2)

            LinePoint(a, b)
            LinePoint(c, d)

            // Circle 1 (a <-> d)
            const cr1 = point((a.x + d.x) / 2, (a.y + d.y) / 2) // point start circle 1
            let cr1_x = a.x - d.x
            let cr1_y = a.y - d.y
            const cr1_angle = Math.atan(cr1_y / cr1_x)
            const {
                startPoint: cr1_start,
                endPoint: cr1_end
            } = Circle(cr1.x, cr1.y, r1, cr1_angle, cr1_angle + Math.PI, cr1_angle < 0)
            LinePoint(cr1_start, a)
            LinePoint(cr1_end, d)

            // Circle 2 (b <-> c)
            const cr2 = point((b.x + c.x) / 2, (b.y + c.y) / 2) // point start circle 1
            let cr2_x = b.x - c.x
            let cr2_y = b.y - c.y
            const cr2_angle = Math.atan(cr2_y / cr2_x)
            const {
                startPoint: cr2_start,
                endPoint: cr2_end
            } = Circle(cr2.x, cr2.y, r2, cr2_angle, cr2_angle + Math.PI, !(cr2_angle < 0))
            LinePoint(cr2_start, c)
            LinePoint(cr2_end, b)
        }

        // Inside figure
        const inside = () => {

            const H = 5

            // upper line
            const a = point(-d3 / 2, H)
            const b = point(d3 / 2, H)

            // lower line
            const c = point(d4 / 2, -H)
            const d = point(-d4 / 2, -H)

            LinePoint(a, b)
            LinePoint(c, d)

            // Circle 1 (a <-> d)
            const cr1 = point((a.x + d.x) / 2, (a.y + d.y) / 2) // point start circle 1
            let cr1_x = a.x - d.x
            let cr1_y = a.y - d.y
            const cr1_angle = Math.atan(cr1_y / cr1_x)
            let {
                startPoint: cr1_start,
                endPoint: cr1_end
            } = Circle(cr1.x, cr1.y, r3, cr1_angle, cr1_angle + Math.PI, cr1_angle < 0)

            if (cr1_start.y < cr1_end.y) {
                [cr1_start, cr1_end] = [cr1_end, cr1_start]
            }
            LinePoint(cr1_start, a)
            LinePoint(cr1_end, d)

            // Circle 2 (b <-> c)
            const cr2 = point((b.x + c.x) / 2, (b.y + c.y) / 2) // point start circle 1
            let cr2_x = b.x - c.x
            let cr2_y = b.y - c.y
            const cr2_angle = Math.atan(cr2_y / cr2_x)
            let {
                startPoint: cr2_start,
                endPoint: cr2_end
            } = Circle(cr2.x, cr2.y, r4, cr2_angle, cr2_angle + Math.PI, !(cr2_angle < 0))

            if (cr2_start.y < cr2_end.y) {
                [cr2_start, cr2_end] = [cr2_end, cr2_start]
            }

            LinePoint(cr2_start, b)
            LinePoint(cr2_end, c)

        }


        outside()
        inside()

    }

    function set(changed: string, value: number) {
        const [type, key] = changed.split('.')
        if (!key) {
            // @ts-ignore
            stage[changed] = value
            // draw()
            // return void 0;
        } else {
            // @ts-ignore
            stage[type][key] = value
        }

        if (type === 'affine') {

            let {xx, xy, yx, yy, ox, oy} = stage.affine

            // xx /= stage.px_per_sm
            // xy /= stage.px_per_sm
            // yx /= stage.px_per_sm
            // yy /= stage.px_per_sm
            ox *= stage.px_per_sm
            oy *= stage.px_per_sm

            // console.log([
            //     [xx, xy, 0],
            //     [yx, yy, 0],
            //     [ox, oy, 1],
            // ])

            stage.setTransformMatrix([
                [xx, xy, 0],
                [yx, yy, 0],
                [ox, oy, 1],
            ])
        } else if (type === 'projective') {
            let {xx, xy, yx, yy, ox, oy, wx, wy, wo} = stage.projective

            // xx /= stage.px_per_sm
            // xy /= stage.px_per_sm
            // yx /= stage.px_per_sm
            // yy /= stage.px_per_sm
            // wx /= stage.px_per_sm * 100
            // wy /= stage.px_per_sm * 100
            // wo /= stage.px_per_sm
            // ox *= stage.px_per_sm
            // oy *= stage.px_per_sm

            xx *= stage.px_per_sm
            xy *= stage.px_per_sm
            yx *= stage.px_per_sm
            yy *= stage.px_per_sm

            ox *= stage.px_per_sm
            oy *= stage.px_per_sm
            // xx *= stage.px_per_sm

            // console.log([
            //     [xx, xy, wx],
            //     [yx, yy, wy],
            //     [ox, oy, wo],
            // ])

            stage.setTransformMatrix([
                [xx * wx, xy * wx, wx],
                [yx * wy, yy * wy, wy],
                [ox * wo, oy * wo, wo],
            ])
        }

        // switch (type) {
        //     case 'shift':
        //
        //
        //         break;
        //     default:
        //         break;
        // }

        draw()

    }

    draw()

    return {
        draw,
        set,
    }
}


