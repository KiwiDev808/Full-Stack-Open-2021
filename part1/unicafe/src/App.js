import React, { useState } from 'react'

const Display = ({text}) => <h1>{text}</h1>

const Statistic = ({text, value}) => {
  return (
    <tr>
      <td>{text}</td> 
      <td>{value}</td>
    </tr>
  )
}

const Statistics = (props) => {
  let sum, average, positive;

  sum = props.good * 1 + props.bad * -1;

  average = sum / props.all || 0;
  positive = props.good / props.all || 0;
  positive = `${positive * 100} %`

  return (
    <table>
      <tbody>
        <Statistic text="good" value={props.good}/>
        <Statistic text="neutral" value={props.neutral}/>
        <Statistic text="bad" value={props.bad}/>
        <Statistic text="average" value={average}/>
        <Statistic text="positive" value={positive}/>
      </tbody>
    </table>
  )
}

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const statistics = {
    good: good,
    neutral: neutral,
    bad: bad,
    all: good + neutral + bad,
  }



  return (
    <div>
      <Display text="give feedback"/>
      <Button text="good" handleClick={() => setGood(good + 1)}/>
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)}/>
      <Button text="bad" handleClick={() => setBad(bad + 1)}/>

      <Display text="statistics"/>
      {statistics.all ? <Statistics {...statistics}/> : <p>No feedback given</p>}
    </div>
  )
}

export default App