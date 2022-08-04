import { Line } from 'react-chartjs-2';
import {Chart as ChartJS, Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler} from 'chart.js';
ChartJS.register(
    Title, Tooltip, LineElement, Legend,
    CategoryScale, LinearScale, PointElement, Filler
  )

function LineChart({xValues, yValues}) {

    
    console.log('xvalues')
    console.log('y', yValues)
    const data = {
        labels: xValues,
        datasets: [
            {   label: 'Equity',
                data: yValues,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: 'rgb(143,212,0)',
                pointRadius: 1,
                pointHoverRadius: 1.5,
                tension: 0
            }
        ]
    }
    const options = {
        bezierCurve: false,
        responsive: true,
        plugins: {
            legend: {
              display: false
            }
          },
        maintainAspectRatio: true,
         layout: {
             padding: 40
         },
         scales: {
             xAxes: 
                 {
                    //  reverse: true, // will reverse the scale
                 }
         }
     };
 
  return (
    <div>
        <Line data={data} options={options}/>
    </div>
  )
}
export default LineChart