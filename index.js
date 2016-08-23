// Bring in the Twitter package
const Twitter = require('twitter');


// bring in readline
const readline = require('readline');

//Set up readline module
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Import request
const request = require('request');

// API and Token keys
const client = new Twitter({
    consumer_key: 'ZZ6rdrhIgwDpTh1V9DNzNk6Y2',
    consumer_secret: 'PG1Eiv7yBZeKDqiiwKLVGcftr1a4hSKLdA7sbqOArQ5x484hqa',
    access_token_key: '445679779-iUcgExLGGxSg4cEZmD6WSkT6NR7QN4QAQQhUQjZP',
    access_token_secret: 'kQLK8PJqCYEAgslLgmnXfDUI9UPD6d9LgJMGCkBSA7uC4'
});



const quoteApi = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

console.log("Please wait while I fetch a quote\n\n");

/**
 * getQuote 
 * Gets a random quote and posts to twitter
 */
function getQuote() {

    request(quoteApi, function(error, response, body) {

        // If getting a new quote succeeds
        if (!error && response.statusCode === 200) {
            let randomQuote = JSON.parse(body);

            let text = randomQuote.quoteText
            let author = randomQuote.quoteAuthor;
            toTweet = text + " -" + author;

            console.log("\n  " + toTweet);

            // Ask if user would like to post this
            rl.question('\n\nType "yes" to tweet, `CTRL + C` to exit\n', (userChoice) => {
                
                // If user decides to tweet
                if (userChoice.toLowerCase() == "yes")
                    tweet(toTweet);
                
                rl.close();
            });

        }
    })
}

/**
* tweet
* Posts some texts to twitter 
* @param tweetText
*/
function tweet(tweetText) {
    // Post it to twitter
    client.post('statuses/update', {
        status: toTweet
    }, function(error, tweet, response) {
        if (error) console.log("Unable to tweet");

        console.log("Tweet posted!");
    });

}

// Get a quote
getQuote();