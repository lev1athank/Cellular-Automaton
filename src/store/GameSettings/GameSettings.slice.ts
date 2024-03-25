import { IGameState } from './../../../App/assets/interface/GameState.interface';
import { createSlice, isAction } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CanvasClass } from '../../../App/assets/class/CanvasClass'
import { dataPrints } from './DataPrints';

const initialState: IGameState = {
    GameClass: null,
    activePrint: null,
    liveCount: 0,
}


export const settingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        init: (state, action) => {
            state.GameClass = new CanvasClass(action.payload[0], action.payload[1])
        },

        startOrStop: (state, { payload: isRun }: PayloadAction<boolean>) => {

            isRun ? state.GameClass?.start() : state.GameClass?.restart(true)
        },

        clear: state => {
            state.GameClass?.restart(false)
        },

        setMoveSpeed: (state, { payload: speed }: PayloadAction<number>) => {
            state.GameClass?.setMoveSpeed(speed)
        },

        setActivePrints: (state, { payload: idPrint }: PayloadAction<number>) => {
            if (idPrint !== -1) {
                state.activePrint = dataPrints[idPrint]
                state.GameClass?.setPrintMode(true, state.activePrint)
            }
            else {
                state.activePrint = null
                state.GameClass?.setPrintMode(false, null)
            }
        },




    },
})

// Action creators are generated for each case reducer function
export const { actions } = settingsSlice

export default settingsSlice.reducer