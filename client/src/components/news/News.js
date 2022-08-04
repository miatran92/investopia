import {useEffect, useState} from 'react';
import './News.css' 

function News() {
    const [news, setNews] = useState([])
    const [input, setInput] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const symbol = input
            const response = await fetch(`https://investopia-paper-trading-app.herokuapp.com/news/${symbol}`)
            const responseJson = await response.json()
            setNews(responseJson.news)
        }
        fetchData()
    }, [input])
  return (
    <div className='news'>
        <h1>Lastest News</h1>
        <input 
        className='search-input'
        placeholder='Enter Ticker'
        value={input}
        onChange={(e) => setInput(e.target.value)}/>
        <div className="news-items">
            {news.map(i => 
                <li key={i.id} className='news-item'>
                    <img src={(i.images[0])?.url} alt=''/>
                    <div className="news-context">
                        <h2> <a className='news-header' href={i.url}>{i.headline}</a></h2>
                        <div className="context-item">
                            <span>{i.updated_at}</span>
                            <p className='author'>{i.author}</p>
                        </div>    
                    </div>
                </li>
                )}
        </div>
    </div>
  )
}
export default News