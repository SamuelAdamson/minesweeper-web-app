import { Button } from 'react-bootstrap';
import { Recycle } from 'react-bootstrap-icons';
import styles from './Clear.module.css'

type Props = {
  onClear: Function;
};

export const Clear = ({ onClear, }: Props) => {

  return (
    <Button 
      className={styles.clearButton}
      onClick={(_e) => onClear()}
    >
      clear <Recycle width={16} />
    </Button>
  );
};
