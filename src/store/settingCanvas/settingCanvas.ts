import { ICanvas } from './../../../App/assets/interface/Canvas'


export const enum EnumRules {
    noEdges = 0,
    fastSpeed = 1
}

export const settings: ICanvas = {
    width: 30,
    height: 30,
    sizePix: 15,
    emerges: [3],
    survives: [2, 3],
    bgColor: "rgb(255, 255, 255)",
    timeUp: 1,
    isRun: false,
    isPrint: false,
    rules: {
        noEdges: false,
        fastSpeed: false
    },
    colorsPix: [
        {
            neighbors: 1,
            rgb: '#000000'
        },
    ],
    activeNeighbors: []
}