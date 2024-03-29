export interface ICanvas {
    width: number,
    height: number,
    sizePix: number,
    emerges: number[],
    survives: number[],
    timeUp: number,
    bgColor: string,
    lineColor?: string,
    cellColor?: string
}