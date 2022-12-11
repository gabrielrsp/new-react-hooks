import logo from './logo.svg';
import './App.css';

import { useState, useTransition } from "react"

function App () {

    const [isPending, startTransition] = useTransition()
    const [input, setInput] = useState("")
    const [list, setList] = useState([])

    const LIST_SIZE = 20000

    /* 
         -> By default: React combine together all the different state changes we made into one call
        (setInput and setList)
        and then it's going to make them all in once before re-render our application
 
        -> With useTransition we can establish a priority render on different state changes running 
        at same time
 
        -> on the case below, when we type something to the input, it will take a little bit to show on the input because of the heavy computation on setting the list

        -> OBS: This should be used only when you are having specific performance issues, where you have code slowing down the application or has the potencial to slow down
        
    */
    function handleChange (e: any) {
      setInput(e.target.value)

      //start transition receives a function that wraps all the code we want to set a lower render priority
      startTransition(() => {
        const l = [] as any

        // Simulation of a LOT OF DATA TO DISPLAY IN A LIST
        // Time intensive computation that happening really often based on an input for example
        for (let i = 0; i < LIST_SIZE; i++) {
          l.push(e.target.value)
        }
        setList(l)
      })
    }

    return (
      <>
        <input type="text" value={input} onChange={handleChange} />

        {
          isPending ? "Loading..."
            : list.map((item, index) => {
              return <div key={index}>{item}</div>
            })}
      </>
    )
  }


export default App;


