import type { NextPage } from 'next';
import Image from 'next/image';
import { AboutSection, Code } from '../src';
import { BFS, DFS, Layer1, Layer2 } from '../img';

const About: NextPage = () => {
  return (
    <>
      <AboutSection heading="the game">
        <p>
          Minesweeper involves a grid of cells where some cells have hidden
          mines and others do not. The player&apos;s objective is to uncover all
          cells that are not hiding a mine. If the player uncovers a cell that
          is hiding a mine, the player loses. To assist the player in
          discovering the mineless cells, each uncovered cell shows the number
          of adjacent cells that are hiding mines. It will never be the case
          that the first cell a player selects is hiding a mine.
        </p>
        <p>
          The player is able to flag cells that they believe to be hiding a
          mine. Note however, that the number of flags placed on the board will not 
          impact the game end conditions. All safe cells must be uncovered in order to 
          achieve a successful outcome. 
          Different difficulty modes offer different board dimensions and 
          number of mines. This implementation includes the following minesweeper 
          modes:
        </p>
        <ul className="bullets">
          <li>Easy - 8 x 12 with 10 mines</li>
          <li>Medium - 12 x 16 with 30 mines</li>
          <li>Hard - 16 x 20 with 50 mines</li>
        </ul>
      </AboutSection>
      <AboutSection heading="the algorithm">
        <p>
          If the player uncovers a cell which is not adjacent to any mines, all
          nearby cells will also be automatically uncovered. Let&apos;s define{' '}
          <i>nearby</i> in this statement.
        </p>
        <p>
          For the purposes of this description, we will refer to the originally
          selected cell as the <strong>source</strong>. All mines that are
          directly adjacent to the source, are considered to be <i>nearby</i>{' '}
          and will be uncovered.
        </p>
        <div className="aboutImgContainer">
          <Image src={Layer1} alt="layer1" height={656} width={498} className="aboutImg" />
        </div>
        <p>
          Now our definition of <i>nearby</i> cells does not stop here. Let&apos;s
          consider the case that one of these newly uncovered cells is similar
          to the source in that all of its directly adjacent neighbors are not
          mines. In this case, we can consider this cell to be a{' '}
          <strong>new source</strong> cell. All of the cells directly adjacent
          to the new source cell are considered to be <i>nearby</i> and will be
          uncovered.
        </p>
        <div className="aboutImgContainer">
          <Image src={Layer2} alt="layer2" height={656} width={498} className="aboutImg" />
        </div>
        <p>
          From this point forward, our search for <i>nearby</i> cells becomes
          rather repetitive. Each new cell that is uncovered becomes a new
          source if it satisfies the condition that none of its directly
          adjacent neighbors are mines.
        </p>
        <p>
          So, let&apos;s recap. In the framing of a divide-and-conquer algorithm, we
          need to break our problem down into smaller tasks. The first small task in
          this case is to check that a cell is not adjacent to any mines. If
          this condition is met, we need to traverse each of its directly
          adjacent neighbors and perform the same check for each of those cells.
          We can choose between two methods to perform this traversal.
        </p>
      </AboutSection>
      <AboutSection heading="dfs">
        <p>
          Our first option is <strong>depth-first search</strong> (DFS). In
          DFS, we start at a source node and search as far down a single &apos;path&apos;
          as possible before backtracking. The first path is typically chosen
          based on how the structure is organized. In minesweeper, we may label
          all adjacent cells with indices and give preference to the lowest
          index. Thus, the first cell we visit is the cell which is one row up, 
          and one column to the left.
        </p>
        <div className="aboutImgContainer">
          <Image src={DFS} alt="dfs" height={632} width={498} className="aboutImg" />
        </div>
        <p>
          The key data structure involved in DFS is the <strong>stack</strong>. The stack is a <strong>last in, first out (LIFO) </strong> 
          data structure, meaning that the most recent item added (pushed) to the data structure, will be the first item 
          removed (popped) from the data structure. A stack can be thought of as a 
          <i>stack</i> of boxes where we can only add and remove boxes at the top of the stack. Thus, we can quickly 
          grab the top box, but other boxes are not accessible.
        </p>
        <p>          
          So, in the case of minesweeper, in a DFS implementation each cell 
          that should be uncovered will be added to the stack including the cell which was clicked. Now, the next cell 
          to be uncovered will be the cell which was added to the stack most recently. We refer to this as the top of the stack. 
          This continues until there are no more cells to add to the stack, and the stack has been emptied.
        </p>
        <p>
          Now, in JavaScript/TypeScript, we can easily implement a stack using an array without the need for a class implementation. 
          However, for the sake of demonstration, the following is a possible class implementation.
        </p>
        <Code
          language={'javascript'}
          centered={true}
          code={
`class Stack {
  s: Array<CellObj>;

  constructor(cell: CellObj) {
    this.s = [cell];
  }

  /* Assumes that queue has at least one member */
  pop(): CellObj {
    return this.s.pop()!;
  }

  push(cell: CellObj): void {
    this.s.push(cell);
  }

  size(): Number { return this.s.length };
}`}
        />
      </AboutSection>
      <AboutSection heading="bfs">
        <p>
          <strong>Breadth-first search</strong> (BFS) is a traversal where we
          start at a source node and search all connected nodes in{' '}
          <strong>layers</strong>. The first layer is the set of nodes that are
          directly connected to the source, the second layer is the set of nodes
          that are directly connected to the first layer, and so on until we are
          out of connected nodes. In the context of minesweeper, cells are
          connected by adjacency. Using BFS, we first visit the cells that are
          directly adjacent to the source - the <strong>first layer</strong>.
          The <strong>second layer</strong> would be all cells directly adjacent
          to the first layer, the <strong>third layer</strong> would be all
          cells directly adjacent to the second layer, etc.
        </p>
        <div className="aboutImgContainer">
          <Image src={BFS} alt="bfs" height={632} width={498} className="aboutImg" />
        </div>
        <p>
          Similar to the use of a stack data structure in DFS, BFS relies on a <strong>queue</strong> data structure. 
          The queue is a <strong>first in, first out (FIFO)</strong> data structure, which means that the earliest item which 
          was pushed to the data structure is the first item to popped from the data structure. Now if a stack is analogous to a stack 
          of boxes, a queue can be related to a <i>queue</i> (or line) of people at a grocery shop. The first person to enter the queue 
          will be the first person to be serviced by the cashier (assuming reasonable politeness). So, as more people enter the queue, 
          they will have to wait for those ahead of them to be serviced first.
        </p>
        <p>
          In the context of minesweeper, each cell which needs to be uncovered will be added to the queue. The cell at the front of the queue 
          will be popped from the queue, uncovered, and then each of it's adjacent cells which should be uncovered are added back to the queue. 
          The result is that the cells are uncovered in an order which is consistent with closeness to the source cell.
        </p>
        <p>
          Unlike languages like C++, in JavaScript/TypeScript, there is no queue implementation included in the standard library. Therefore, 
          it is necessary to implement one using a class.
        </p>
        <Code
          language={'javascript'}
          centered={true}
          code={
`class Queue {
  q: Array<CellObj>;
  head: number;

  constructor() {
    this.q = [];
    this.head = 0;
  }

  pop(): CellObj {
    const front: CellObj = this.q[this.head];
    delete this.q[this.head];
    this.head++;

    return front;
  }

  push(cell: CellObj): void {
    this.q.push(cell);
  }

  size(): Number { return (this.head - this.q.length) };
}`}
        />
      </AboutSection>

      <AboutSection heading="comparison">
        <p>
          So, which search is the most optimal for minesweeper? It
          turns out that the performance of both algorithms in this situation
          are fairly similar. At first glance, the performance seems even
          identical. When analyzing the algorithms, both approaches yield a{' '}
          <strong>linear time complexity</strong> as each cell which will be
          uncovered must only be visited once. However, there is more to the
          story here.
        </p>
        <p>
          To better understand the performance of <strong>BFS</strong> and{' '}
          <strong>DFS</strong> in the context of minesweeper, I conducted
          empirical analysis on the two implementations. See the findings of the
          analysis <a href="/performance">here</a> .
        </p>
      </AboutSection>

      <AboutSection heading="the developer">
        <p>
          My name is Samuel Adamson. I am a undergraduate Computer Science
          student at the University of Colorado with a focus in AI. For the most
          part, my professional experience has centered around full stack
          engineering and data engineering/analysis. As my career progresses, I
          hope to shift my focus towards machine learning engineering. In my
          freetime, I enjoy building web apps like this one. Feel free to check
          out my <a href="https://samueladamson.github.io/">portfolio</a>.
        </p>
      </AboutSection>
    </>
  );
};

export default About;
