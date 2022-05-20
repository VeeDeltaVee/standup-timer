import { getTheme, ITheme, Stack, ProgressIndicator, PrimaryButton, DefaultButton, TextField, SpinButton } from '@fluentui/react';
import React, { useState, useEffect } from 'react';
import { useInterval } from 'react-interval-hook';
import { Clock } from './ClockComponent';

const theme: ITheme = getTheme();

export enum ScrumState {
  BeforeStart,
  Running,
  Finished,
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

  const [scrumState, setScrumState] = useState(ScrumState.BeforeStart);
  const [speakerNumber, setSpeakerNumber] = useState(0);

  useInterval(() => {
    let currentTime = new Date();

    if (teamStartTime && currentSpeakerStartTime && scrumState === ScrumState.Running) {
      setTeamElapsedTime(currentTime.getTime() - teamStartTime.getTime());
      setCurrentSpeakerElapsedTime(currentTime.getTime() - currentSpeakerStartTime.getTime());
      setCurrentSpeakerPercentTimeUsed(currentSpeakerElapsedTime / (secondsPerSpeaker * 1000));
    }
  }, 100);

  return (
    <Stack horizontal styles={{ root: { padding: '20px' } }}>
      <Stack tokens={{ childrenGap: 10, padding: 20 }} styles={{ root: { boxShadow: theme.effects.elevation4, width: 500 } }}>

        {scrumState === ScrumState.BeforeStart &&
          <Stack>
            <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
              <SpinButton
                label="Seconds Per Speaker"
                value={secondsPerSpeaker.toString()}
                onChange={(_, newValue) => {
                  if (newValue) setSecondsPerSpeaker(parseInt(newValue))
                }}
                step={15}
                min={15}
                max={600}
              />
              <PrimaryButton text="Start Scrum" onClick={() => { 
                setScrumState(ScrumState.Running);
                setTeamStartTime(new Date());
                setCurrentSpeakerStartTime(new Date());
              }} />
            </Stack>
          </Stack>
        }

        {scrumState === ScrumState.Running &&
          <Stack horizontalAlign="center">
            <ProgressIndicator label={`Speaker ${speakerNumber + 1} Time Used`} percentComplete={currentSpeakerPercentTimeUsed} />
            <Clock labelText="Team Time" displayedTime={teamElapsedTime} />

            <Stack horizontal tokens={{ childrenGap: 10, padding: 10 }}>
              <DefaultButton text="Stop Scrum" onClick={() => { setScrumState(ScrumState.Finished) }} />
              <DefaultButton text="Next Speaker" onClick={() => { setSpeakerNumber(speakerNumber + 1); setCurrentSpeakerStartTime(new Date()) }} />
            </Stack>
          </Stack>
        }

        {scrumState === ScrumState.Finished &&
          <Stack horizontalAlign="center" tokens={{ childrenGap: 20 }}>
            <Clock labelText="Team Time" displayedTime={teamElapsedTime} />
            <DefaultButton text="Resume Scrum" onClick={() => {
              setScrumState(ScrumState.Running);
              setSpeakerNumber(speakerNumber + 1);
            }} />
          </Stack>
        }

      </Stack>
    </Stack>
  );
}
