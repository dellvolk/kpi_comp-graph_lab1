type IMatrixRow = [number, number, number]
export type ITransformMatrix = [IMatrixRow, IMatrixRow, IMatrixRow]

export interface ICore {
    draw(): void;

    set(key: string, value: number): void;
}

export interface IFigure {
    d1: number
    d2: number
    r1: number
    r2: number
    // inside figure
    d3: number
    d4: number
    r3: number
    r4:number
}

export interface IPoint {
    x: number
    y: number
}

export interface IRotation {
    x: number
    y: number
    angle: number
}

export interface IAffine {
    xx: number
    xy: number
    yy: number
    yx: number
    ox: number
    oy: number
}

export interface IProjective {
    xx: number,
    xy: number,
    yy: number,
    yx: number,
    ox: number,
    oy: number,
    wx: number,
    wy: number,
    wo: number
}
