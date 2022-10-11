import { Request,Response } from 'express';
import { route,GET, POST, PUT, DELETE } from 'awilix-express';
import { SubcriptionService } from '../services/subcription.service';
import { BaseController } from '../common/controllers/base.controller';

@route('/subscriptions')
export class SubscriptionController extends BaseController{
    constructor(
        private readonly subscriptionService: SubcriptionService
    ){
        super();
    }

    @GET()
    public async all(req: Request, res: Response) {
        try {
            res.send(
                await this.subscriptionService.all()
            );
        } catch (error) {
            this.handleException(error, res);
        }
    }

    @route('/:id')
    @GET()
    public async find(req:Request, res:Response){
        try {
            const id = parseInt(req.params.id);

            const result = await this.subscriptionService.find(id);

            if (result) {
                res.send(result)            
            }else{
                res.status(404).send();
            }
        } catch (error) {
            this.handleException(error,res);
        }
    }

    @POST()
    public async store(req:Request, res:Response){
        try {
            const { user_id,code,amount,cron } = req.body;
            await this.subscriptionService.store({
                user_id,code,amount,cron
            } as SubcriptionCreateDto);
            res.send({
                user_id,code,amount,cron
            });
        } catch (error) {
            this.handleException(error,res);
        }
    }

    @route('/:id')
    @PUT()
    public async update(req:Request, res:Response){
        try {
            const id = parseInt(req.params.id);
            const { code,amount,cron } = req.body;
            await this.subscriptionService.update(id,{
                code,amount,cron
            } as SubcriptionUpdateDto);
            res.send();            
        } catch (error) {
            this.handleException(error,res);
        }
    }

    @route('/:id')
    @DELETE()
    public async remove(req:Request, res:Response){        
        try {
            const id = parseInt(req.params.id);
            await this.subscriptionService.remove(id);
            res.send();            
        } catch (error) {
            this.handleException(error,res);
        }
    }
}