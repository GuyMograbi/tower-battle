import express from 'express';
import routes from './src/routes.mjs';
import bodyParser from 'body-parser';
const app = express();
const port = 3000;

app.use(bodyParser.json())
app.use(routes);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
