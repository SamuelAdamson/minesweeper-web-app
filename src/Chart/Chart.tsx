'use client'

/* Custom chart wrapper component */

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Container } from 'react-bootstrap';

import { Algorithm, Cascade, Clear } from '../index';
import styles from './Chart.module.css';


type Props = {
  newCascade: Cascade | null;
  algo: Algorithm,
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



export const Chart = ({ newCascade, algo, } : Props) => {
 const [data, setData] = useState<{ name: string, data: { x: string, y: number, }[] }[]>([]);

  const resetChart = () => {
    setData([]);
  }

  /**
   * [
    * {
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
      ]
   */

  useEffect(() => {
    if(!newCascade) return;

    const algoName = algo == Algorithm.DFS ? 'DFS' : 'BFS';
    const newSeriesData = newCascade.times.map(time => {
      return {
        x: `${algoName} (${time.toFixed(2)})`,
        y: Math.round((time + Number.EPSILON) * 100) / 100,
      }
    })

    setData((prevData) => {
      let currAlgoExists = false;

      let newData = prevData.map(series => {
        if(series.name == algoName) {
          currAlgoExists = true;

          return {
            name: algoName,
            data: [
              ...series.data,
              ...newSeriesData,
            ],
          }
        }

        return series;
      });

      if(currAlgoExists)
        return newData;

      return [...newData, {
        name: algoName,
        data: newSeriesData,
      }];
    });
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
