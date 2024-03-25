import { CanvasClass } from './../class/CanvasClass';
export interface IGameState {
    GameClass: CanvasClass | null,
    activePrint: IPrintData | null,
    liveCount: number,
    

}

export interface IPrintData {
    id: number,
    width: number,
    height: number,
    image: string,
    print: number[]
}