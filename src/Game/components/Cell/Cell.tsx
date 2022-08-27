import { CSSProperties, useState, MouseEvent } from "react";
import { BookmarkFill as FlagIcon } from "react-bootstrap-icons";
import { getAdjacentStr } from "./helper";
import { AdjacentStr } from "../type";
import styles from "./Cell.module.css";
import cx from "classnames";

type Props = {
  row: Number;
  col: Number;
  mode: String;
  mine: Boolean;
  adjacentNum: Number;
};

export const Cell = ({ row, col, mode, mine, adjacentNum }: Props) => {
  const cellMode: CSSProperties = {
    "--mode": `var(--${mode})`,
  } as CSSProperties;

  const [covered, setCovered] = useState<Boolean>(true);
  const [flagged, setFlagged] = useState<Boolean>(true);
  const [content, setContent] = useState<String>("");
  const [adjacent, setAdjacent] = useState<AdjacentStr>(
    getAdjacentStr(adjacentNum)
  );

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    setCovered(false);
  };

  const handleRightClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault(); // suppress context menu
    setFlagged(true);
  };

  return (
    <div
      className={
        covered
          ? cx(styles.cell, styles.covered)
          : mine
          ? cx(styles.cell, styles.mine)
          : cx(styles.cell, styles.uncovered, styles[adjacent])
      }
      style={cellMode}
      onClick={handleClick}
      onContextMenu={handleRightClick}
    >
      {flagged ? <FlagIcon /> : content}
    </div>
  );
};
