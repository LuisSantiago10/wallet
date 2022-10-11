import { ApplicationException } from "../common/exceptions/application.exception";
import { Subcription } from "./repositories/domain/subcription";
import { SubcriptionRepository } from "./repositories/subcription.repository";

export class SubcriptionService {
    constructor(
        private readonly subcriptionRepository:SubcriptionRepository
    ){
    }

    public async find(id:number): Promise<Subcription | null>{
        return await this.subcriptionRepository.find(id);
    }

    public async all(): Promise<Subcription[]>{
        return await this.subcriptionRepository.all();
    }
    public async store(entry:SubcriptionCreateDto): Promise<void>{
        const originalEntry = await this.subcriptionRepository.findByUserAndCode(entry.user_id,entry.code);
        if (!originalEntry) {
            await this.subcriptionRepository.store(entry as Subcription);
        }else{
            throw new ApplicationException('User subcription already exists.');
        }
    }
    public async update(id:number,entry:SubcriptionUpdateDto): Promise<void>{
        let originalEntry = await this.subcriptionRepository.find(id);
        const newEntry = {...originalEntry}
        console.log(originalEntry);
        console.log(newEntry);      
        if (originalEntry){
            originalEntry.code = entry.code;
            originalEntry.amount = entry.amount;
            originalEntry.cron = entry.cron;
            console.log("----------");
            
            console.log(newEntry);
            // await this.subcriptionRepository.update(originalEntry);
        }else{
            throw new ApplicationException('User subcription already exists.');
        }
    }
    public async remove(id:number): Promise<void>{
        await this.subcriptionRepository.remove(id);
    }
}