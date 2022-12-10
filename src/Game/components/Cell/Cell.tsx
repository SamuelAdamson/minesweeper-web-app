import { useState, MouseEvent, useEffect } from 'react';
import { BookmarkFill as FlagIcon } from 'react-bootstrap-icons';
import { getAdjacentStr } from './helper';
import { CellObj, Mode } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

type Props = {
  cell: CellObj,
  mode: Mode;
  paused: Boolean;
  onClick: (cell: CellObj) => void;
  onRightClick: (cell: CellObj) => void;
};

function getStyle(covered: Boolean, mine: Boolean, adjacentNum: Number, paused: Boolean, mode: Mode) : string 
{
  let modeStyle: String = (mode == 'easy') ? styles.cellEasy 
      : (mode == 'medium') ? styles.cellMedium : styles.cellHard;

  let style = paused
    ? cx(styles.paused) : covered
      ? cx(styles.covered) : mine
        ? cx(styles.mine) : cx(styles.uncovered, styles[getAdjacentStr(adjacentNum)]);
  
  return cx(styles.cell, style, modeStyle);
}

export const Cell = ({ cell, mode, paused, onClick, onRightClick }: Props) => {
  const [flagged, setFlagged] = useState<Boolean>(false);
  const [content, setContent] = useState<String>('');
  const [style, setStyle] = useState<string>(cx(styles.cell, styles.covered));

  const handleClick = (_e: MouseEvent<HTMLElement>) => {
    if(cell.covered) onClick(cell);
  };

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); // suppress context menu
    onRightClick(cell);
  };

  useEffect(() => {
    if(paused || cell.covered || cell.mine || cell.adjacentNum == 0) setContent('');
    else setContent(`${cell.adjacentNum}`);
    setStyle(getStyle(cell.covered, cell.mine, cell.adjacentNum, paused, mode));
  }, [cell.covered, cell.mine, cell.adjacentNum, paused, mode])

  return (
    <div
      className={style}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {flagged ? <FlagIcon /> : (<h3>{content}</h3>)}
    </div>
  );
};
