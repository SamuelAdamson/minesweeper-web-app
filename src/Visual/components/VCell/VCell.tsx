import { useState, useEffect } from 'react';
import { VCellObj } from '../type';
import styles from './VCell.module.css';
import cx from 'classnames';

type Props = {
  vCell: VCellObj,
  onClick: (vCell: VCellObj) => void;
  onRightClick: (vCell: VCellObj) => void;
};

export const VCell = ({ vCell, onClick, onRightClick }: Props) => {
  const [style, setStyle] = useState<string>(styles.cell);
  
  return (
    <div 
      className={style}
    />
  );
};