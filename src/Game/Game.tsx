import { useState } from 'react';
import { Container, Modal, Button } from 'react-bootstrap';
import { Grid, ModeSelect, Control } from './components';
import { Mode } from './components/type';
import styles from './Game.module.css';


export const Game = () => {
  const [gameMode, setGameMode] = useState<Mode>('easy');
  const [paused, setPaused] = useState<Boolean>(false);
  const [loaded, setLoaded] = useState<Boolean>(true);
  const [gameOver, setGameOver] = useState<Boolean>(false);

  const [resetFlag, setResetFlag] = useState<Boolean>(false);
  const [modeChangeFlag, setModeChangeFlag] = useState<Boolean>(false);

  const [modal, setModal] = useState<boolean>(false);
  const [gr, setGR] = useState<Boolean>(false);

  const modeChange = (newMode: Mode) => {
    setModeChangeFlag(prev => !prev);
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
    setResetFlag(prev => !prev);
  }

  const loadComplete = () => {
    setLoaded(true);
  }

  const gameEnd = (result: Boolean) => {
    setGameOver(true);
    setGR(result);
    setTimeout(() => setModal(true), 300);
  }

  const hideModal = () => setModal(false);

  return (
    <Container fluid className={styles.game}>
      <Modal show={modal} onHide={hideModal}>
        <Modal.Header>
          <Modal.Title > {gr ? 'success' : 'failure'} </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* TODO - Add game performance stats here. */}
          {gr ? 'All non-mine cells have been uncovered.' : 'The player has uncovered a cell that is hiding a mine.' }
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
        onGameEnd={gameEnd}
      />

      <Control
        onPause={pause}
        onUnpause={unpause}
        onReset={reset}
        modeChangeFlag={modeChangeFlag}
        loaded={loaded}
        gameOver={gameOver}
      />

      <div className={styles.temp}>
        some other content coming soon
      </div>
    </Container>
  );
};
