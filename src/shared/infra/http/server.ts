import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from './routes';

import '@shared/infra/typeorm';
import uploadConfig from '@config/uploadConfig';
import AppError from '@shared/errors/AppError';
// import ensureAuthenticated from './middlewares/ensureAuthenticated';

const app = express();

app.use(express.json());
app.use('/files', /**ensureAuthenticated,**/ express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    console.log(err);

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => console.log('server running'));
