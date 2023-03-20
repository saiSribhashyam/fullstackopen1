import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const FeedbackButton = ({ text, clickHandler }) => {
    return (
        <button onClick={ () => { clickHandler(text) } }>
            { text }
        </button>
    )
}

const Statistics = ({ good, neutral, bad }) => {
    if ( good <= 0 && neutral <= 0 && bad <= 0) {
        return (
            <div>No feedback given</div>
        )
    } else {
        const all = good + neutral + bad;

        return (
            <table>
                <tbody>
                    <Statistic
                        text="good"
                        value={ good }
                    />
                    <Statistic
                        text="neutral"
                        value={ neutral }
                    />
                    <Statistic
                        text="bad"
                        value={ bad }
                    />
                    <Statistic
                        text="all"
                        value={ all }
                    />
                    <Statistic
                        text="average"
                        value={ (good - bad) / all + "%" }
                    />
                    <Statistic
                        text="positive"
                        value={ good / all * 100 + "%" }
                    />
                </tbody>
            </table>
        )
    }
}

const Statistic = ({ text, value }) => {
    return (
        <tr>
            <td>
                { text }: { value }
            </td>
        </tr>
    )
}


const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClick = (t) => {
        if (t === "good") { setGood(good + 1) }
        if (t === "neutral") { setNeutral(neutral + 1) }
        if (t === "bad") { setBad(bad + 1) }
    }

    return (
        <div>
            <h1>Give Feedback</h1>
            <FeedbackButton
                text= "good"
                clickHandler= { handleClick }
            />
            <FeedbackButton
                text= "neutral"
                clickHandler= { handleClick }
            />
            <FeedbackButton
                text= "bad"
                clickHandler= { handleClick }
            />

            <h1>Statistics</h1>
            <Statistics
                good={ good }
                neutral={ neutral }
                bad={ bad }
            />
        </div>
    )
}

ReactDOM.render(<App />,
    document.getElementById('root')
)