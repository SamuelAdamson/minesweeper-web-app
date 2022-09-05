import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Grid, ModeSelect, Control } from './components';
import { Mode } from './components/type';
import styles from './Game.module.css';


export const Game = () => {
  const [gameMode, setGameMode] = useState<Mode>('easy');
  const [paused, setPause] = useState<Boolean>(false);
  
  const modeChange = (newMode: Mode) => {
    setGameMode(newMode);
  };

  const pause = () => {
    setPause(true);
  }

  const unpause = () => {
    setPause(false);
  }

  return (
    <Container fluid className={styles.game}>
      <ModeSelect mode={gameMode} onModeChange={modeChange} />
      <Grid mode={gameMode} />
      <Control onPause={pause} onUnpause={unpause} />
      <div className={styles.temp}>
        some other content coming soon
      </div>
    </Container>
  );
};
