import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TestService } from './services/test.servece';
import { SubcriptionService } from "./services/subcription.service";
import { SubcriptionMySQLRepository } from "./services/repositories/impl/mysql/subcription.repository";

export default ( app: express.Application ) => {
    const container = createContainer({
        injectionMode : 'CLASSIC'
    });

    container.register({
        //Repositories
        subcriptionRepository: asClass(SubcriptionMySQLRepository).scoped(),
        //Services
        subscriptionService : asClass(SubcriptionService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
}