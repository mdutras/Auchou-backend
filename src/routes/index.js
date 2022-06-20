import { Router } from 'express';

const router = Router();

router
    .get('/')
    .get('/encontrados')
    .get('/adote')
    .get('/user')
    .get('/user/desaparecimento')
    .get('/user/acompanhamento')

export { router };

