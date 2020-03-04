import React from 'react'
import BuyStocks from './BuyStocks'
import PortfolioList from './PortfolioList'
const Portfolio = () => {
    return (
        <div className="portfolio">
            <PortfolioList />
            <BuyStocks />
        </div>
    )
}

export default Portfolio