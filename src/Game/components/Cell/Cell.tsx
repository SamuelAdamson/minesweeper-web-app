import { useState, CSSProperties, MouseEvent, useEffect } from 'react';
import { BookmarkFill as FlagIcon } from 'react-bootstrap-icons';
import { getAdjacentStr } from './helper';
import { Mode } from '../type';
import styles from './Cell.module.css';
import cx from 'classnames';

type Props = {
  mode: Mode;
  mine: Boolean;
  adjacentNum: Number;
  paused: Boolean;
};

function getStyle(
  covered: Boolean, 
  mine: Boolean, 
  adjacentNum: Number,
  paused: Boolean
): string {
  let style = paused
  ? cx(styles.cell, styles.paused)
  : covered
    ? cx(styles.cell, styles.covered)
    : mine
      ? cx(styles.cell, styles.mine)
      : cx(styles.cell, styles.uncovered, styles[getAdjacentStr(adjacentNum)])

  return style;
}

export const Cell = ({ mode, mine, adjacentNum, paused }: Props) => {
  const cellMode: CSSProperties = {
    '--mode': `var(--${mode})`,
  } as CSSProperties;

  const [covered, setCovered] = useState<Boolean>(true);
  const [flagged, setFlagged] = useState<Boolean>(false);
  const [content, setContent] = useState<String>('');
  const [style, setStyle] = useState<string>(cx(styles.cell, styles.covered));

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setCovered(false);
    setContent((adjacentNum > 0) ? `${adjacentNum}` : '');
  };

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); // suppress context menu
    setFlagged(true); // TODO more logic here
  };

  useEffect(() => {
    setStyle(getStyle(covered, mine, adjacentNum, paused));
  }, [covered, mine, adjacentNum, paused])

  return (
    <div
      className={style}
      style={cellMode}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {flagged ? <FlagIcon /> : content}
    </div>
  );
};
