// import  {PositionsContext}  from '../../contexts/PosContext';
// import {useContext} from 'react';
import './DoughnutChart.css'
import {Doughnut} from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(ArcElement, Tooltip, Legend);

function DoughnutChart({data, options}) {
  // const {posChartData, options} = useContext(PositionsContext)
  // console.log(data)

  return (
    // <Doughnut data={posChartData} options={options}/>
    <div className="chart-item">
      <Doughnut data={data} options={options}/>
    </div>
  )
}
export default DoughnutChart