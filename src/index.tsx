import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Text } from '@fluentui/react';
import reportWebVitals from './reportWebVitals';

const root = document.getElementById('root') as HTMLElement;

export type ClockProps = { };

export const Clock = ({}): JSX.Element => {
  const [startTime, _] = useState<Date>(new Date());
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setElapsedTime((new Date()).getTime() - startTime.getTime());
    }, 1000);
  });

  let timeToDisplay = new Date(elapsedTime);
  let timeToDisplayString = `${timeToDisplay.getMinutes()}:${timeToDisplay.getSeconds()}`;

  return (
    <Text> {timeToDisplayString} </Text>
  );
}


ReactDOM.render(
  <React.StrictMode>
    <Clock />
  </React.StrictMode>
  , root);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
