import { useState } from 'react';
import {
  Container,
  ToggleButton,
  ButtonGroup,
} from 'react-bootstrap';
import { Mode } from '../type';
import styles from './ModeSelect.module.css';

type Props = {
  mode: Mode;
  onModeChange: Function;
};

const modes: Array<Mode> = ['easy', 'medium', 'hard'];

export const ModeSelect = ({ mode, onModeChange }: Props) => {
  const [radioValue, setRadioValue] = useState<Mode>(mode);
  const onNewMode = (newMode: Mode) => {
    setRadioValue(newMode);
    onModeChange(newMode);
  };

  return (
    <Container fluid className={styles.ModeSelect}>
      <ButtonGroup>
        {modes.map((m: Mode, idx: Number) => (
          <ToggleButton
            className={styles.ModeButton}
            key={`mode-${idx}`}
            id={`radio-${idx}`}
            type="radio"
            name="radio"
            value={m}
            checked={m == radioValue}
            onClick={(e) => onNewMode(m)}
          >
            {m}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};
