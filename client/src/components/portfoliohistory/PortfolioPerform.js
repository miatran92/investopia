import { useEffect, useState } from "react";
import LineChart from "../charts/LineChart";
import './PortfolioPerformance.css'

function PortfolioPerform() {
  const [period, setPeriod] = useState('1D')
  const [xValues, setXValues] = useState([])
  const [yValues, setYValues] = useState([])
  
  const handlePeriod = (e) => {
    setPeriod(e.target.value)
  }

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`https://investopia-paper-trading-app.herokuapp.com/performance?period=${period}`)
      .then(res => res.json())
      console.log(data)
      setYValues(data.equity)

      let timeArray = (data.timestamp.map(x=> new Date(x*1000)))
      if (period === '1D'){
        const timeConvert = timeArray.toLocaleString('en-US', { hour: 'numeric', hour12: true})
        const split = timeConvert.split(",")
        let removeDup = split.filter((val, index) => split.indexOf(val) === index)
        setXValues(removeDup)
        } else {
        let timeConvert = timeArray.toLocaleString('en-US', {year: "numeric",month: "2-digit",day: "numeric"})
        let split = timeConvert.split(",")
        let removeDup = split.filter((val, index) => split.indexOf(val) === index)
        setXValues(removeDup)
        }
    }
    fetchData()
  }, [period])

  return (
    <div className="perform-container">
      <div className="perform-wrapper">
        <div className="perform-item">
        </div>
        <div className="perform-item">
          <div className="period-container" onChange={handlePeriod}>
            <label className="radio-button" id="period-btn" >
              <input type="radio" value='1D' name="period" />
              <span>DAY</span>
            </label>
            <label className="radio-button" id="period-btn">
              <input type="radio" value='1W' name="period" />
              <span>WEEK</span>
            </label>
            <label className="radio-button" id="period-btn">
              <input type="radio" value='1M' name="period"/>
              <span>MONTH</span>
            </label>
            <label className="radio-button" id="period-btn">
              <input type="radio" value='1A' name="period"/>
              <span>YEAR</span>
            </label>
          </div>
        </div>
        <LineChart xValues={xValues} yValues={yValues}/>
      </div>
    </div>
  )
}
export default PortfolioPerform