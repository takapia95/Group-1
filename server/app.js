const express = require('express');
const app = express();
const axios = require('axios');
const port = 3001;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
