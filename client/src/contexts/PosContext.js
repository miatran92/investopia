import { createContext, useState, useEffect } from "react";

export const PositionsContext = createContext();

export function PositionProvider ({ children }){
    const [pos, setPos] = useState([])

    useEffect(() => {
        const fetchPositions = async () => {
          const data = await fetch('https://investopia-paper-trading-app.herokuapp.com/positions')
          const dataJson = await data.json()
          const sortedData = dataJson.sort((a,b) => (b.qty*b.current_price)-(a.qty*a.current_price))
          setPos(sortedData)
        }
        fetchPositions()
      }, [])

      const posChartData = {
        labels: (pos.map(i => i.symbol)).slice(0,3),
        datasets: [
          {
          label: 'Stocks',
          data: (pos.map(i => (i.qty*i.current_price))).sort((a,b) => (b-a)),
          backgroundColor: [
            '#a3da0b','#c3f53c','#daf986','#e9fcb6','#cccccc'
            ]
          }
        ]
      }
        const options = {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            title: {
              display: true,
            }
          }
        }
    return(
        <PositionsContext.Provider value={{pos, posChartData, options}}>
            {children}
        </PositionsContext.Provider>
    )
}