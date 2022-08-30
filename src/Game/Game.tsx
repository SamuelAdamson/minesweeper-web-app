import { Container } from 'react-bootstrap';
import { Grid, ModeSelect } from './components';
import styles from './Game.module.css';

export const Game = () => {
  return (
    <Container fluid className={styles.game}>
      <ModeSelect mode="medium" />
      <Grid mode="medium" />
    </Container>
  );
};
