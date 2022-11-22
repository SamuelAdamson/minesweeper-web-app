import { useState, CSSProperties, MouseEvent, useEffect } from 'react';
import { BookmarkFill as FlagIcon } from 'react-bootstrap-icons';
import { getAdjacentStr } from './helper';
import { CellObj } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

type Props = {
  cell: CellObj,
  onClick: (cell: CellObj) => void;
  onRightClick: (cell: CellObj) => void;
  modeStyle: CSSProperties;
  paused: Boolean;
};

function getStyle(covered: Boolean, mine: Boolean, adjacentNum: Number,paused: Boolean): string {
  let style = paused
    ? cx(styles.cell, styles.paused)
    : covered
      ? cx(styles.cell, styles.covered)
      : mine
        ? cx(styles.cell, styles.mine)
        : cx(styles.cell, styles.uncovered, styles[getAdjacentStr(adjacentNum)]);
  
  return style;
}

export const Cell = ({ cell, onClick, onRightClick, modeStyle, paused }: Props) => {
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
    setStyle(getStyle(cell.covered, cell.mine, cell.adjacentNum, paused));
  }, [cell.covered, cell.mine, cell.adjacentNum, paused])

  return (
    <div
      className={style}
      style={modeStyle}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {flagged ? <FlagIcon /> : (<h3>{content}</h3>)}
    </div>
  );
};
