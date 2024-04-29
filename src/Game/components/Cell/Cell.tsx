import { useState, MouseEvent, useEffect } from 'react';
import { BookmarkFill as FlagIcon } from 'react-bootstrap-icons';
import { getStyle } from './helper';
import { CellObj, Mode } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

type Props = {
  cell: CellObj,
  mode: Mode;
  paused: Boolean;
  gameOver: Boolean;
  onClick: (cell: CellObj) => void;
  onRightClick: (cell: CellObj) => void;
};

export const Cell = ({ cell, mode, paused, gameOver, onClick, onRightClick }: Props) => {
  const [content, setContent] = useState<string>('');
  const [style, setStyle] = useState<string>(cx(styles.cell, styles.covered));

  const handleClick = (_e: MouseEvent<HTMLElement>) => {
    if(!gameOver && !paused && !cell.flagged) onClick(cell);
  };

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); // suppress context menu
    if(!gameOver && cell.covered) onRightClick(cell);
  };

  useEffect(() => {
    if(paused || cell.covered || cell.mine || cell.adjMines == 0) setContent('');
    else setContent(`${cell.adjMines}`);
    setStyle(getStyle(cell.covered, cell.mine, cell.adjMines, paused, mode, gameOver));
  }, [cell.covered, cell.mine, cell.adjMines, paused, mode, gameOver])

  return (
    <div
      className={style}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {(cell.flagged && !(paused || gameOver)) ? 
        <FlagIcon className={styles.flag} /> 
        : (<h3>{content}</h3>)}
    </div>
  );
};
