'use client'

/* Custom chart wrapper component */

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Container } from 'react-bootstrap';
import cx from 'classnames';

import { Algorithm, Cascade, Clear } from '../index';
import styles from './Chart.module.css';


type Props = {
  newCascade: Cascade | null;
};

// placeholder for no chart data
const emptyText: string = 'No available cascade data. Play minesweeper and cascade data will populate in a diagram here.';

// chart options
const chartOptions: ApexCharts.ApexOptions = {
  chart: {
    height: 360,
    width: '100%',
    type: 'treemap',
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
    position: 'top',
    horizontalAlign: 'right',
    fontSize: '16px',
    fontFamily: 'Poppins',
    fontWeight: 'normal',
  },
  stroke: {
    width: 4,
    colors: ['#E9E9E9'],
  },
  xaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
  yaxis: {
    labels: {
      show: false,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
  },
};



export const Chart = ({ newCascade, } : Props) => {
 const [data, setData] = useState<ApexAxisChartSeries>([]);

  const resetChart = () => {
    setData([]);
  }
  
  useEffect(() => {
    setData([
      {
        name: 'DFS',
        data: [
          { x: 'DFS (0.2 ms)', y: 0.2 },
        ]
      },
      {
        name: 'BFS',
        data: [
          { x: 'BFS', y: 0.3 },
        ]
      },
    ])
  }, [newCascade]);

  return (
    <Container fluid className={styles.chart}>
      <div className={styles.chartHeader}>
        <Clear onClear={resetChart} />
      </div>
      <div className={styles.chartContainer}>
        {
          data.length == 0 ?
            <div className={styles.chartPlaceholder}>
              <p>{emptyText}</p>
            </div>
          :
            <ApexChart
              options={chartOptions}
              series={data}
              type="treemap"
              height={360}
              width={'100%'}
            />
        }
      </div>
    </Container>
  );
};
