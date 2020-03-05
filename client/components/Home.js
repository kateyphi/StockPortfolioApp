import React from 'react'

// This component displays to a user who is not logged in. 
const Home = () => {
    return (
        <div>
            <h3>Welcome to Play the Mock Market!</h3>
            <p>Here, you can pretend to play the stock market. Just buy stocks and watch their value go up! (or down! both can happen!)</p>
            <p>To start buying stocks, either register a new account or sign in if you have one already.</p>
        </div>
    )
}

export default Home