import { Movement } from "./domain/movement";

export interface MovementRepository{
    find(id:number): Promise<Movement | null>;
    all(): Promise<Movement[]>;
    // findByUserAndCode(user_id:number,code:string): Promise<Movement | null>;
    store(entry:Movement): Promise<void>;
    update(entry:Movement): Promise<void>;
    remove(id:number): Promise<void>;
}