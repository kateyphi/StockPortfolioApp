import React from 'react'
import BuyStocks from './BuyStocks'
import PortfolioList from './PortfolioList'

// Container component for the PortfolioList and BuyStocks components. 
const Portfolio = () => {
    return (
        <div className="portfolio">
            <PortfolioList />
            <BuyStocks />
        </div>
    )
}

export default Portfolio