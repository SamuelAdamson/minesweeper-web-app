import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Grid, ModeSelect, Control } from './components';
import { Mode } from './components/type';
import styles from './Game.module.css';


export const Game = () => {
  const [gameMode, setGameMode] = useState<Mode>('easy');
  const [resetFlag, setResetFlag] = useState<Boolean>(false);
  const [modeChangeFlag, setModeChangeFlag] = useState<Boolean>(false);
  const [paused, setPaused] = useState<Boolean>(false);
  const [loaded, setLoaded] = useState<Boolean>(true);

  const modeChange = (newMode: Mode) => {
    setLoaded(false);
    setModeChangeFlag(prev => !prev);
    setGameMode(newMode);
  };

  const pause = () => {
    setPaused(true);
  }

  const unpause = () => {
    setPaused(false);
  }

  const reset = () => {
    setResetFlag(prev => !prev);
    setLoaded(false);
  }

  const loadComplete = () => {
    setLoaded(true);
  }

  return (
    <Container fluid className={styles.game}>
      <ModeSelect 
        mode={gameMode} 
        onModeChange={modeChange} 
      />
      
      <Grid
        mode={gameMode} 
        paused={paused} 
        resetFlag={resetFlag}
        onLoadComplete={loadComplete} 
      />
      
      <Control 
        onPause={pause} 
        onUnpause={unpause} 
        onReset={reset} 
        modeChangeFlag={modeChangeFlag}
        loaded={loaded} 
      />
      
      <div className={styles.temp}>
        some other content coming soon
      </div>
    </Container>
  );
};
