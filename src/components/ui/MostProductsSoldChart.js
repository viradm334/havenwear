'use client'

import dynamic from "next/dynamic"
import 'chart.js/auto'

const Doughnut = dynamic(() => import('react-chartjs-2').then(mod => mod.Doughnut), {ssr: false});

export default function MostProductsSoldChart({chartData}){

    const data = {
        labels: chartData.map(item => item.name),
        datasets: [
          {
            label: 'Total Sold',
            data: chartData.map(item => item.totalProductsSold),
            backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
            borderWidth: 1,
          },
        ],
      }
      
      const options = {
        maintainAspectRatio: false
      }
      
    return (<div className="h-64 relative">
    <Doughnut data={data} options={options} />
  </div>)


}