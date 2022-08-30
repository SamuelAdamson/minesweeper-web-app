import { useEffect, useState } from 'react';
import { Container, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import { Mode } from '../type' 
import styles from './ModeSelect.module.css'
import cx from 'classnames';

type Props = {
  mode: Mode;
}

const modes: Array<Mode> = ['easy', 'medium', 'hard']

export const ModeSelect = ({ mode }: Props) => {
  const [currMode, setCurrMode] = useState<Mode>(mode);
  const onNewMode = (newMode: Mode) => {
    mode = newMode;
    console.log(mode);
    // setCurrMode(newMode);
  }

  useEffect(() => {
    console.log("HERE");
    setCurrMode(mode);
  }, [mode])

  return (
    <Container fluid className={ styles.ModeSelect }>
      <ToggleButtonGroup type="radio" name="options" defaultValue={0} >
        {modes.map((m: Mode, idx: Number) => (
          <ToggleButton 
            key={`button__${m}`}
            id={idx}
            className={ 
              (m == mode) ? cx(styles.ModeButton, styles.Selected)
              : styles.ModeButton
            }
            onClick={() => onNewMode(m)}
          >
            {m}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Container>
  )
}