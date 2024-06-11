'use client'

/* Custom chart wrapper component */

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Container } from 'react-bootstrap';

import { Algorithm } from '../Game/components/type';
import { ChartData } from './index';
import styles from './Chart.module.css';

type Props = {
  data: ChartData;
};

// placeholder for no chart data
const emptyText: string = 'No available cascade data.';

// chart options
const chartOptions: ApexCharts.ApexOptions = {

};

const makeSeries = (data: ChartData) => [];

export const Chart = ({ data, } : Props) => {
  return (
    <Container fluid className={styles.chartContainer}>
      {
        data.length == 0 ?
          <div className={styles.chartPlaceholder}>
            <p>{emptyText}</p>
          </div>
        :
          <ApexChart
            options={chartOptions}
            series={makeSeries(data)}
            type="bar"
            height={350}
          />
      }
    </Container>
  );
};
