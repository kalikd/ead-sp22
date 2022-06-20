import { INCREASE_ONE, DECREASE_ONE } from "../actions";

const initialState = {
    count:0,
    products:[],
    complex:{arr:[()=>{},{abc:'abc'},12]}
}

const reducer = (state = initialState, action) => {
    console.log(state)

    switch (action.type) {
        case INCREASE_ONE:
            return {...state,count: state.count+1}
           
        case DECREASE_ONE:
            return {state,count: state.count - 1}
    
        default:
            return state
    }

}

export default reducer;