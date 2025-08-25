'use client'

import dynamic from "next/dynamic"
import 'chart.js/auto'
import dayjs from "dayjs";

const Bar = dynamic(() => import('react-chartjs-2').then(mod => mod.Bar), {ssr: false});

export default function OrderChart({chartData}){
    const data = {
        datasets: [{
            label: 'Orders',
            data: chartData,
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
            parsing: {
                xAxisKey: 'orderDate',
                yAxisKey: 'totalOrders',
              },      
        }],
        
    }
    return <Bar data={data}/>
}