import express from 'express';
const sch = require('./scheme');

const app = express();
const PORT: number = 5000;
const basicStr: string = 'The sedulous hyena ate the antelope!'

console.log(sch);

app.get('/', (req, res) => {
    res.send(basicStr);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));