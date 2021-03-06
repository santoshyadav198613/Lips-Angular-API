import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import * as helmet from 'helmet';
import { Request, Response, NextFunction } from 'express';
import * as env from 'dotenv';
import { MongoConnect } from './db/db';
import { UserRoute } from './routes/user';
import { ProductRoute } from './routes/product';
import { auth } from './middleware/auth';

env.load();
let app = express();

app.use(compression());
app.use(helmet());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json());

// app.use(function (req, res, next) {
//     console.log(req.headers);
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header("Access-Control-Allow-Headers", "access-token,Origin, X-Requested-With, Content-Type, Accept");
//     res.header("Access-Control-Allow-Methods","GET,POST,PUT,DELETE");
//     next();
// });

app.set('token', process.env.JWT_SECRET);

app.use('/api/v1/user', UserRoute);

app.use('/api/v1/product', auth, ProductRoute);


app.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.send('This is get API');
})

app.listen(process.env.PORT, () => {
    const db = MongoConnect.connect();
    console.log('server running on port 3000');
});