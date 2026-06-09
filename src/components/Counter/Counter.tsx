import {useCounter} from "../../store/store.tsx";
import './counter.css'

const Counter = () => {

    const counter = useCounter(state => state.value)

    return (
        <div className="counter">
            <h2 className='counter-logo'>Количество очков</h2>
            <h1>{counter}</h1>
        </div>
    );
};

export default Counter;