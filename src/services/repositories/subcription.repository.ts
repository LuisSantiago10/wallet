import { Subcription } from "./domain/subcription";

export interface SubcriptionRepository{
    all(): Promise<Subcription[]>;
    find(id:number): Promise<Subcription | null>;
    findByUserAndCode(user_id:number,code:string): Promise<Subcription | null>;
    store(entry:Subcription): Promise<void>;
    update(entry:Subcription): Promise<void>;
    remove(id:number): Promise<void>;
}