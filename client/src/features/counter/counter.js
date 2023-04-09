import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { increment, decrement, increaseByAmount } from './counterSlice'

const Counter = () => {
	const count = useSelector(state => state.counter.value)
	const dispatch = useDispatch()

	return (
		<div>
			<div>
				<button onClick={() => dispatch(increment())}>Increment</button>
			</div>
			<div>
				<h1>{count}</h1>
			</div>
			<div>
				<button onClick={() => dispatch(decrement())}>Decrement</button>
			</div>
			<div>
				<button onClick={() => dispatch(increaseByAmount(10))}>Increase by 10</button>
			</div>
		</div>
	)
}

export default Counter