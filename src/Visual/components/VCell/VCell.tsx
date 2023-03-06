import { useState, useEffect } from 'react';
import styles from './VCell.module.css';
import cx from 'classnames';

export const VCell = () => {
  const [style, setStyle] = useState<string>(styles.cell);


  
  return (
    <div 
      className={style}
    />
  );
};