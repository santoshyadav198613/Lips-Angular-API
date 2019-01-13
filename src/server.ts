import * as express from 'express';
import * as bodyParser from 'body-parser';
import { Request, Response, NextFunction } from 'express';
import * as env from 'dotenv';
import { MongoConnect } from './db/db';
import { UserRoute } from './routes/user';

env.load();
let app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.set('token', process.env.JWT_SECRET);

app.use('/v1/user', UserRoute);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is get API');
})

app.listen(process.env.EXPRESS_PORT, () => {
    const db = MongoConnect.connect();
    console.log('server running on port 3000');
});