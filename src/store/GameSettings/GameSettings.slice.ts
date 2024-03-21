import { IGameState } from './../../../App/assets/interface/GameState.interface';
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { CanvasClass } from '../../../App/assets/class/CanvasClass'

const initialState: IGameState = {
    GameClass: null,
}


export const settingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        init: (state, { payload: canvas }: PayloadAction<HTMLCanvasElement>) => {
            state.GameClass = new CanvasClass(canvas)
        },

        startOrStop: (state, { payload: isRun }: PayloadAction<boolean>) => {

            isRun ? state.GameClass?.start() : state.GameClass?.restart(true)
        },

        clear: state => {
            state.GameClass?.restart(false)
        },

        setMoveSpeed: (state, {payload: speed}: PayloadAction<number>) => {
            state.GameClass?.setMoveSpeed(speed)
        }
    },
})

// Action creators are generated for each case reducer function
export const { actions } = settingsSlice

export default settingsSlice.reducer