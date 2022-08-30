import { Container, Button, ButtonGroup } from 'react-bootstrap'
import { Mode } from '../type' 
import styles from './ModeSelect.module.css'
import cx from 'classnames';

type Props = {
  mode: Mode;
}

const modes: Array<Mode> = ['easy', 'medium', 'hard']

export const ModeSelect = ({ mode }: Props) => {
  return (
    <Container fluid className={ styles.ModeSelect }>
      <ButtonGroup size="lg" >
        {modes.map((m: Mode) => (
          <Button 
            className={ 
              (m == mode) ? cx(styles.ModeButton, styles.Selected)
              : styles.ModeButton
            }
          >
            {m}
          </Button>
        ))}
      </ButtonGroup>
    </Container>
  )
}