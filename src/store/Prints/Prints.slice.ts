import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { dataPrints } from './DataPrints.ts'
import { IPrintData } from '../../../App/assets/interface/dataPrints.interface.ts'

type state = {
    activePrint: IPrintData | null,
    dataPrints: IPrintData[]
}

const initialState:state = {
    activePrint: null,
    dataPrints
}


export const settingsSlice = createSlice({
    name: 'gameSettings',
    initialState,
    reducers: {
        ToggleActivePrints: (state, { payload: idPrint }: PayloadAction<number>)=>{
            state.activePrint = state.dataPrints[idPrint]
        }
    },
})

// Action creators are generated for each case reducer function
export const { actions } = settingsSlice

export const printsGame = settingsSlice.reducer