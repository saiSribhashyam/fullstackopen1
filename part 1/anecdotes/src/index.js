import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({ anecdotes }) => {
  const x = Math.floor((Math.random() * anecdotes.length - 1) + 1);

  const [max, setMax] = useState(0)
  const [highest, setHighest] = useState(x)
  const [selected, setSelected] = useState(x)
  const [vote, setVote] = useState(...anecdotes)

  const handleNextAnecdotes = () => {
    const x = Math.floor((Math.random() * anecdotes.length - 1) + 1);
    setSelected(x)
  }

  const handleVote = () => {
    const copy = { ...anecdotes };

    copy[selected].vote++

    if (copy[selected].vote > max) {
        setHighest(selected)
        setMax(copy[selected].vote)
    }

    setVote(copy);
  }

  return (
    <div>
        <h1>Anecdote of the day</h1>
        { anecdotes[selected].anecdote }
        <br/>
        has { anecdotes[selected].vote } votes
        <br/>
        <button onClick={ handleNextAnecdotes }>
            Next Anecdotes
        </button>
        <button onClick={ handleVote }>
            Vote
        </button>

        <h1>Anecdote with most vote</h1>
        { anecdotes[highest].anecdote }
        <br/>
        has { anecdotes[highest].vote } votes
    </div>
  )
}

const anecdotes = [
    {
        'anecdote': 'If it hurts, do it more often',
        'vote': 0
    },
    {
        'anecdote': 'Adding manpower to a late software project makes it later!',
        'vote': 0
    },
    {
        'anecdote': 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'vote': 0
    },
    {
        'anecdote': 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'vote': 0
    },
    {
        'anecdote': 'Premature optimization is the root of all evil.',
        'vote': 0
    },
    {
        'anecdote': 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'vote': 0
    }
]

ReactDOM.render(
  <App anecdotes={ anecdotes }/>,
  document.getElementById('root')
)