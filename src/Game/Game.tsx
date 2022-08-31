import { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Grid, ModeSelect } from './components';
import { Mode } from './components/type';
import styles from './Game.module.css';

export const Game = () => {
  const [gameMode, setGameMode] = useState<Mode>('easy');
  const modeChange = (newMode: Mode) => {
    setGameMode(newMode);
  };

  /**
   * TODO
   * Create new grid on mode change
   * Set minimum height/width for grid container
   * Bootstrap loader while grid is created
   */

  return (
    <Container fluid className={styles.game}>
      <ModeSelect mode={gameMode} onModeChange={modeChange} />
      <Grid mode={gameMode} />
    </Container>
  );
};
