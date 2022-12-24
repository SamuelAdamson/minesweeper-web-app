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
    setLoaded(false);
    setResetFlag(prev => !prev);
  }

  const loadComplete = () => {
    setLoaded(true);
  }

  const gameEnd = (result: Boolean) => {
    
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
        onGameEnd={gameEnd}
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
