import { createContext, useState, useEffect } from "react";

const AcctContext = createContext();

export function AcctProvider({children}){
    const [acctData, setAcctData] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const data = await fetch('https://investopia-paper-trading-app.herokuapp.com/account')
            const dataJson = await data.json()
            setAcctData(dataJson)
        }
        fetchData()
    }, [])
    
    const acctChartData = {
        labels: ['Cash', 'Stocks'],
        datasets: [
            {
                data: [acctData.cash, acctData.long_market_value],
                backgroundColor: [
                    '#a3da0b','#c3f53c','#daf986','#e9fcb6','#cccccc'
                ]
            }
        ]
    }
    return(
        <AcctContext.Provider value={{acctData, acctChartData}}>
            {children}
        </AcctContext.Provider>
    )
}

export default AcctContext