import React from "react";
import { useDispatch, useSelector } from 'react-redux';
// == action
import { INCREMENT } from '../../store/actions';


const Counter = () => {
    const dispatch = useDispatch();
    const clickCount = useSelector((state) => state.counter);

    return (
        <>
        <div>Counter</div>
        <button
        type="button"
        onClick={() => dispatch({ type: INCREMENT })}
        >
        Clic-me ! ({clickCount})
        </button>
        </>
    )
}

export default Counter