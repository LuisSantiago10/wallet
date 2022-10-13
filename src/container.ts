import express = require('express');
import { asClass, createContainer } from 'awilix';
import { scopePerRequest } from 'awilix-express';
import { TestService } from './services/test.servece';
import { SubcriptionService } from "./services/subcription.service";
import { SubcriptionMySQLRepository } from "./services/repositories/impl/mysql/subcription.repository";
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMySQLRepository } from './services/repositories/impl/mysql/balance.repository';
import { MovementService } from './services/movement.service';
import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subcription.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';

export default ( app: express.Application ) => {
    const container = createContainer({
        injectionMode : 'CLASSIC'
    });

    container.register({
        //Repositories
        // subcriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
        // movementRepository: asClass(MovementMSSQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
        subcriptionRepository: asClass(SubcriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMySQLRepository).scoped(),
        //Services
        subscriptionService: asClass(SubcriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};