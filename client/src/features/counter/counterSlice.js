import { createSlice } from "@reduxjs/toolkit";


const initialState = {
	value: 0
}

export const counterSlice = createSlice({
	name: "counter",
	initialState,
	reducers: {
		increment: (state) => {
			state.value++
		},
		decrement: (state) => {
			state.value--
		},
		increaseByAmount: (state, action) => {
			state.value += action.payload
		}
	}
})


export const { increment, decrement, increaseByAmount } = counterSlice.actions
export default counterSlice.reducer 