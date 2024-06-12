import { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { Grid, ModeSelect, Control } from './components';
import { Mode, Algorithm } from './components/type';
import styles from './Game.module.css';

type Props = {
  algo: Algorithm;
  onCascade: Function;
}

export const Game = ({ algo, onCascade }: Props) => {
  const [gameMode, setGameMode] = useState<Mode>('small');
  const [paused, setPaused] = useState<Boolean>(false);
  const [loaded, setLoaded] = useState<Boolean>(true);
  const [gameOver, setGameOver] = useState<Boolean>(false);

  const [resetFlag, setResetFlag] = useState<Boolean>(false);
  const [elapsedFlag, setElapsedFlag] = useState<Boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [result, setResult] = useState<Boolean>(false);

  const modeChange = (newMode: Mode) => {
    setElapsedFlag(prev => !prev);
    setGameMode(newMode);
    setLoaded(false);
    setGameOver(false);
  };

  const pause = () => {
    setPaused(true);
  }

  const unpause = () => {
    setPaused(false);
  }

  const reset = () => {
    hideModal();
    setLoaded(false);
    setGameOver(false);

    let prev = resetFlag;
    setResetFlag(!prev);

    setElapsedFlag(prev => !prev);
  }

  const loadComplete = () => {
    setLoaded(true);
  }

  const gameEnd = (result: Boolean) => {
    setGameOver(true);
    setResult(result);
    setTimeout(() => setModal(true), 300);
  }

  const hideModal = () => setModal(false);

  return (
    <Container fluid className={styles.game}>
      <Modal show={modal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title > {result ? 'success' : 'failure'} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* TODO - Add game performance stats here. */}
          {result ? 'All cells without mines have been uncovered.' : 'The player has uncovered a cell that is hiding a mine.' }
        </Modal.Body>
        <Modal.Footer>
          <Button className={styles.controlBtn} onClick={reset}>
            reset
          </Button>
          <Button className={styles.controlBtn} onClick={hideModal}>
            close
          </Button>
        </Modal.Footer>
      </Modal>

      <ModeSelect
        mode={gameMode}
        onModeChange={modeChange}
      />

      <Grid
        mode={gameMode}
        paused={paused}
        resetFlag={resetFlag}
        onLoadComplete={loadComplete}
        onCascade={onCascade}
        onGameEnd={gameEnd}
        algo={algo}
      />

      <Control
        onPause={pause}
        onUnpause={unpause}
        onReset={reset}
        elapsedFlag={elapsedFlag}
        loaded={loaded}
        gameOver={gameOver}
      />

    </Container>
  );
};
