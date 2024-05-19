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

const modes: Array<Mode> = ['small', 'medium', 'large'];

export const ModeSelect = ({ mode, onModeChange }: Props) => {
  const [modeValue, setModeValue] = useState<Mode>(mode);
  const onNewMode = (newMode: Mode) => {
    onModeChange(newMode);
    setModeValue(newMode);
  };

  return (
    <Container fluid className={styles.ModeSelect}>
      <ButtonGroup id="mode-select-group" aria-label="mode-select-group">
        {modes.map((m: Mode, idx: Number) => (
          <ToggleButton
            className={styles.ModeButton}
            key={`mode-${idx}`}
            id={`mode-${idx}`}
            type="radio"
            name="mode-radio"
            value={m}
            checked={m == modeValue}
            onClick={(e) => onNewMode(m)}
          >
            {m}
          </ToggleButton>
        ))}
      </ButtonGroup>
    </Container>
  );
};
