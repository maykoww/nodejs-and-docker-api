import 'reflect-metadata';
import express from 'express';
import routes from './routes';

import './database';
import uploadConfig from './config/uploadConfig';
// import ensureAuthenticated from './middlewares/ensureAuthenticated';

const app = express();

app.use(express.json());
app.use('/files', /**ensureAuthenticated,**/ express.static(uploadConfig.directory));
app.use(routes);

app.listen(3333, () => console.log('server running'));
