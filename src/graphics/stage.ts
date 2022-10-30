import {IAffine, IFigure, IPoint, IProjective, IRotation, ITransformMatrix} from "./types"


interface IStage {
    width: number
    height: number
    padding: number
    px_per_sm: number
    ox: (x: number) => number
    oy: (x: number) => number
    pos: (x: number, y: number, grid?: boolean) => [number, number]
    grid_width: number
    setTransformMatrix: (matrix: ITransformMatrix) => void
    transform: (matrix: ITransformMatrix) => (x: number, y: number) => [number, number]
    ctx: CanvasRenderingContext2D
    shift: IPoint
    rotation: IRotation
    affine: IAffine
    projective: IProjective,
    figure: IFigure
}

// @ts-ignore
export var stage: IStage = {
    width: 1500,
    height: 1500,
    padding: 20,
    px_per_sm: 11,
    grid_width: 1300,
    shift: {
        x: 40,
        y: 40,
    },
    figure: {
        d1: 44,
        d2: 44,
        r1: 10,
        r2: 10,
        // inside figure
        d3: 20,
        d4: 20,
        r3: 5,
        r4:5,
        // a: { x: 0, y: 22 * Math.sqrt(2) },
        // b: { x: 22 * Math.sqrt(2), y: 0 },
        // c: { x: 0, y: -22 * Math.sqrt(2) },
        // d: { x: -22 * Math.sqrt(2), y: 0 },
    },
    rotation: {
        x: 0,
        y: 0,
        angle: 0,
    },
    affine: {
        xx: 1,
        xy: 0,
        yx: 0,
        yy: 1,
        ox: 0,
        oy: 0,
    },
    projective: {
        xx: 100,
        xy: 0,
        yy: 100,
        yx: 0,
        ox: 0,
        oy: 0,
        wx: 1,
        wy: 1,
        wo: 300
    }
}

stage.ox = (x: number) => stage.padding + x;
stage.oy = (y: number) => stage.height - y - stage.padding;

stage.pos = (x: number, y: number) => [stage.padding + x, stage.height - y - stage.padding]


stage.setTransformMatrix = (m: ITransformMatrix) => {
    stage.pos = (x: number, y: number, grid = false) => {

        if (!grid) {

            const rtx = stage.rotation.x * stage.px_per_sm;
            const rty = stage.rotation.y * stage.px_per_sm;

            [x, y] = stage.transform([ // rotation
                [Math.cos(stage.rotation.angle), Math.sin(stage.rotation.angle), 0],
                [-Math.sin(stage.rotation.angle), Math.cos(stage.rotation.angle), 0],
                [
                    -rtx * (Math.cos(stage.rotation.angle) - 1) + rty * Math.sin(stage.rotation.angle),
                    -rtx * Math.sin(stage.rotation.angle) - rty * (Math.cos(stage.rotation.angle) - 1),
                    1],
            ])(x, y);

            [x, y] = stage.transform([ // translate
                [1, 0, 0],
                [0, 1, 0],
                [stage.shift.x * stage.px_per_sm, stage.shift.y * stage.px_per_sm, 1],
            ])(x, y);

            // console.log({x, y, m})
        }

        // console.log(x,y,m)

        // x *= stage.px_per_sm
        // y *= stage.px_per_sm

        return [
            stage.ox((x * m[0][0] + y * m[1][0] + m[2][0]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
            stage.oy((x * m[0][1] + y * m[1][1] + m[2][1]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
        ]
    }
}

stage.transform = (m: ITransformMatrix) => (x: number, y: number) => [
    ((x * m[0][0] + y * m[1][0] + m[2][0]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
    ((x * m[0][1] + y * m[1][1] + m[2][1]) / (x * m[0][2] + y * m[1][2] + m[2][2])),
]


console.log(stage)
