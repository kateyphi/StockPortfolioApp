Hello, Tech Talent Pipeline evaluator and/or potential employers! 
I have some notes for you about this app. 

* I did not start by running any boilerplate code, but I did start by mostly following the Fullstack Academy workshop to create such boilerplate code. The 'solution' to that workshop can be found here: https://github.com/FullstackAcademy/boilermaker/

* I want to acknowledge that I have a very big no-no in this code. The alphavantage api key is visible in the code, as opposed to in a hidden environment variable. I struggled to get the environment variables working either locally or on heroku, so I decided to leave it in the code for the sake of being able to use this app at all. 

* Another point about AlphaVantage: the free version limits 5 calls per minute and 500 calls per day. If a user has more than 5 stocks in their portfolio, it certainly will cause an error, and it might cause errors in other situations. If this were a real app meant to serve the public, I would be paying for more calls per minute. 

