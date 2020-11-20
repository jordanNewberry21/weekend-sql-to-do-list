const express = require('express');
const app = express();
const port = 5000;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('server/public'));


app.get('/', (req, res, next) =>{
    res.send('Hello world');
})


app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
});