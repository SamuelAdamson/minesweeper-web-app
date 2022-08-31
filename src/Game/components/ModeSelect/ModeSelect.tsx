import { useState } from 'react';
import { Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Mode } from '../type';
import styles from './ModeSelect.module.css';

type Props = {
  mode: Mode;
  onModeChange: Function;
};

const modes: Array<Mode> = ['easy', 'medium', 'hard'];

export const ModeSelect = ({ mode, onModeChange }: Props) => {
  const onNewMode = (newMode: Mode) => {
    onModeChange(newMode);
  };

  return (
    <Container fluid className={styles.ModeSelect}>
      <ToggleButtonGroup type="radio" name="options" defaultValue={0}>
        {modes.map((m: Mode, idx: number) => (
          <ToggleButton
            key={`button__${m}`}
            value={idx}
            onClick={() => onNewMode(m)}
          >
            {m}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Container>
  );
};
