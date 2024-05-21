'use client'

import { useEffect } from 'react';
import dynamic from 'next/dynamic';
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });
import { Algorithm } from '../Game/components/type';


type Props = {
  data: { type: Algorithm, time: number, }[];
};

export const Chart = ({ data, } : Props) => {

};
