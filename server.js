const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const intent = req.body.queryResult.intent.displayName;
    let response;

    if (intent === 'WeatherExpert') {
        response = {
            fulfillmentText: 'Bugün Bursa\'da hava durumu güneşli ve sıcak olacak.'
        };
    } else if (intent === 'BursaTourGuide') {
        response = {
            fulfillmentText: 'Bursa\'daki tarihi yerler arasında Ulucami, Yeşil Türbe, Koza Han ve Bursa Kalesi bulunmaktadır.'
        };
    }

    res.json(response);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
