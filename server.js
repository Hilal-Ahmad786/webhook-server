const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    try {
        console.log('Received request:', JSON.stringify(req.body, null, 2));

        const queryResult = req.body.queryResult;
        if (!queryResult || !queryResult.intent) {
            throw new Error('Invalid request structure: queryResult or intent is missing');
        }

        const intent = queryResult.intent.displayName;
        let response;

        switch(intent) {
            case 'WeatherExpert':
                response = {
                    fulfillmentText: 'Today’s weather in Bursa is sunny and warm.'
                };
                break;
            case 'BursaTourGuide':
                response = {
                    fulfillmentText: 'Historical sites in Bursa include Ulucami, Yeşil Türbe, Koza Han, and Bursa Castle.'
                };
                break;
            default:
                response = {
                    fulfillmentText: 'Sorry, I didn’t get that.'
                };
        }

        res.json(response);
    } catch (error) {
        console.error('Error handling request:', error.message);
        res.json({
            fulfillmentText: `There was an error processing your request: ${error.message}`
        });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
