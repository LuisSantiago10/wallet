import { asClass, createContainer } from 'awilix';
import { TestService } from './services/test.servece';
import express from "express";
import { scopePerRequest } from 'awilix-express';

export default ( app: express.Application ) => {
    const container = createContainer({
        injectionMode : 'CLASSIC'
    });

    container.register({
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}