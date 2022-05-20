import { connect } from "react-redux";
import { INCREASE_ONE, DECREASE_ONE } from "./actions";

function Counter(props){

    function increment() {
        props.dispatch({type:INCREASE_ONE})
    }

    function decrement() {
        props.dispatch({type:DECREASE_ONE})

    }

    return (<>
    <h1>Counter</h1>
    <button onClick={increment}>+</button>
    <label>Counter-{props.count}</label>
    <button onClick={decrement}>-</button>
    </>)
}


const mapStateToProps = (state) =>{
    return {count:state.count}
}

export default connect(mapStateToProps)(Counter) ;