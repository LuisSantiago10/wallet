
import { Request,Response } from 'express';
import { GET, route } from 'awilix-express';
import { TestService } from '../services/test.servece';

@route('/')
export class DefaultController{
    constructor(private readonly testService:TestService){

    }

    @GET()
    public index(req: Request, res: Response):void{
        res.send('running...');
    }
}