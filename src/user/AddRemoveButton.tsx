import { useState } from "react"

export const AddRemoveButton = (props: { counter: number, getCounter: (counter: number) => void }) => {

    const [counter, setCounter] = useState(props.counter);
    return (
        <div>
            <button className="btn btn-primary btn-sm" onClick={e => { setCounter(counter + 1); props.getCounter(counter + 1) }}>
                +
            </button>
            <button className="btn btn-secondary btn-sm" onClick={e => { setCounter(counter - 1); props.getCounter(counter - 1) }}>
                -
            </button>
            <span>
                {counter}
            </span>
        </div>
    )
}