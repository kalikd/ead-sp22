import logo from './logo.svg';
import './App.css';

import {useState} from 'react'


function Counter(props){

  const [count, setCount] = useState(0)

  function increment(){

      setCount(count+1)

  }

  return <>{props.render(count,increment)}</>
}

function ClickCounter(props){
  return (<>
    <h1>Count:{props.count}</h1>
    <button onClick={props.increment}>Increment</button>
  
  </>)
}

function HoverCounter(props){
  return (<>
    <h1>Count:{props.count}</h1>
    <button onMouseOver={props.increment}>Increment</button>
  
  </>)
}

function App(){

  return (<>
     <Counter render={(count,increment) => { return <ClickCounter count={count} increment={increment} />}}  />
     <Counter render={(count,increment) => { return <HoverCounter count={count} increment={increment} />}}  />
  </>)
}
export default App;
