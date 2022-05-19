import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Text, Stack, getTheme, createTheme, ITheme, Label, ProgressIndicator, DefaultButton } from '@fluentui/react';
import { useInterval } from 'react-interval-hook';

const myTheme = createTheme({
  palette: {
    themePrimary: '#0078d4',
    themeLighterAlt: '#eff6fc',
    themeLighter: '#deecf9',
    themeLight: '#c7e0f4',
    themeTertiary: '#71afe5',
    themeSecondary: '#2b88d8',
    themeDarkAlt: '#106ebe',
    themeDark: '#005a9e',
    themeDarker: '#004578',
    neutralLighterAlt: '#faf9f8',
    neutralLighter: '#f3f2f1',
    neutralLight: '#edebe9',
    neutralQuaternaryAlt: '#e1dfdd',
    neutralQuaternary: '#d0d0d0',
    neutralTertiaryAlt: '#c8c6c4',
    neutralTertiary: '#a19f9d',
    neutralSecondary: '#605e5c',
    neutralSecondaryAlt: '#8a8886',
    neutralPrimaryAlt: '#3b3a39',
    neutralPrimary: '#323130',
    neutralDark: '#201f1e',
    black: '#000000',
    white: '#ffffff',
  }});

const theme: ITheme = getTheme();

export type ClockProps = { displayedTime: number, labelText: string};

export const Clock = ({displayedTime, labelText}: ClockProps): JSX.Element => {
  let displayedTimeAsDate = new Date(displayedTime);
  let displayedTimeString = `${displayedTimeAsDate.getMinutes()} : ${displayedTimeAsDate.getSeconds()}`;

  return (
    <Stack>
      <Label>{labelText}</Label>
      <Text variant='xLarge' > {displayedTimeString} </Text>
    </Stack>
  );
}

export type ScrumTimerProps = {
};

export const ScrumTimer = (): JSX.Element => {
  const [teamStartTime, setTeamStartTime] = useState<Date>();
  const [teamElapsedTime, setTeamElapsedTime] = useState(0);

  const [secondsPerSpeaker, setSecondsPerSpeaker] = useState(60);

  const [currentSpeakerStartTime, setCurrentSpeakerStartTime] = useState<Date>();
  const [currentSpeakerElapsedTime, setCurrentSpeakerElapsedTime] = useState(0);
  const [currentSpeakerPercentTimeUsed, setCurrentSpeakerPercentTimeUsed] = useState(0);

  const [isScrumRunning, setIsScrumRunning] = useState(false);
  const [speakerNumber, setSpeakerNumber] = useState(0);

  useEffect(() => {
    if (isScrumRunning) {
      setTeamStartTime(new Date());
      setCurrentSpeakerStartTime(new Date());
    }
  }, [isScrumRunning]);

  useInterval(() => {
    let currentTime = new Date();

    if (teamStartTime && currentSpeakerStartTime && isScrumRunning) {
      setTeamElapsedTime(currentTime.getTime() - teamStartTime.getTime());
      setCurrentSpeakerElapsedTime(currentTime.getTime() - currentSpeakerStartTime.getTime());
      setCurrentSpeakerPercentTimeUsed(currentSpeakerElapsedTime / (secondsPerSpeaker * 1000));
    }
  }, 100);

  return (
    <Stack horizontal styles={{root: { padding: '20px', width: '500px' }}}>
      <Stack tokens={{childrenGap: 10, padding: 20}} styles={{root: { boxShadow: theme.effects.elevation4 }}}>
        {isScrumRunning &&
          <Stack>
            <ProgressIndicator label={`Speaker ${speakerNumber + 1} Time Used`} percentComplete={currentSpeakerPercentTimeUsed}/>
            <Clock labelText="Team Time" displayedTime={teamElapsedTime} />
          </Stack>
        }

        <Stack horizontal tokens={{childrenGap: 10, padding: 10}}>
          <DefaultButton text={isScrumRunning ? "Stop Scrum" : "Start Scrum"} onClick={() => {if (!isScrumRunning) { setSpeakerNumber(0) } ; setIsScrumRunning(!isScrumRunning)}} />
          {isScrumRunning && <DefaultButton text="Next Speaker" onClick={() => {setSpeakerNumber(speakerNumber + 1); setCurrentSpeakerStartTime(new Date())}} />}
        </Stack>
      </Stack>
    </Stack>
  );
}

const root = document.getElementById('root') as HTMLElement;
ReactDOM.render(
  <React.StrictMode>
    <ScrumTimer />
  </React.StrictMode>
  , root);
