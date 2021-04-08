import React from "react";

const Header = (props) => {
  return <h1>{props.name}</h1>;
};

const Part = (props) => {
  return (
    <p>{props.p} {props.e}</p>
  )
}

const Content = (props) => {
  return (
    <>
      <Part p={props.p1} e={props.e1} />
      <Part p={props.p2} e={props.e2} />
      <Part p={props.p3} e={props.e3} />
    </>
  );
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.total}</p>
  )
}

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header name={course} />
      <Content
        p1={part1}
        p2={part2}
        p3={part3}
        e1={exercises1}
        e2={exercises2}
        e3={exercises3}
      />
      <Total total={exercises1 + exercises2 + exercises3}/>
    </div>
  );
};

export default App;
