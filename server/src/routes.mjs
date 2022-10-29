import express from 'express';
import * as controller from './controller.mjs';

const app = express();
app.get('/sessions', controller.getAllSessions);
app.post('/sessions', controller.startNewGame);

app.post('/sessions/:sessionId/shoot', controller.shoot);



export default app;
