import { initializeIcons } from '@fluentui/react';
import React from 'react';
import ReactDOM from 'react-dom';
import { ScrumTimer } from './ScrumTimerComponent';

initializeIcons();

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <React.StrictMode>
    <ScrumTimer />
  </React.StrictMode>
  , root);
