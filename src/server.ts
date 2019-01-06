import * as express from 'express';
import { Request, Response, NextFunction } from 'express';
let app = express();

app.get('/', (req: Request, res: Response, next:  NextFunction) => {
    res.send('This is get API');
})

app.listen(3000, () => {
    console.log('server running on port 3000');
});