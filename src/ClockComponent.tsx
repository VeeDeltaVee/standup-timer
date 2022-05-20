import { Text, Label, Stack } from "@fluentui/react";
import React from 'react';

export type ClockProps = { displayedTime: number, labelText: string};

function formatNumberForClock(num: number) {
  if (num < 10) {
    return `0${num}`;
  } else {
    return `${num}`;
  }
}

function formatClock(time: Date) {
  return `${formatNumberForClock(time.getMinutes())}:${formatNumberForClock(time.getSeconds())}`
}

export const Clock = ({displayedTime, labelText}: ClockProps): JSX.Element => {
  let displayedTimeAsDate = new Date(displayedTime);
  let displayedTimeString = formatClock(displayedTimeAsDate);

  return (
    <Stack horizontalAlign="center">
      <Label>{labelText}</Label>
      <Text variant='xLarge' > {displayedTimeString} </Text>
    </Stack>
  );
}

