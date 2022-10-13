import { Balance } from "./domain/balance";

export interface BalanceRepository{
    find(id:number): Promise<Balance | null>;
    all(): Promise<Balance[]>;
    findByUserId(user_id:number): Promise<Balance | null>;
    store(entry:Balance): Promise<void>;
    update(entry:Balance): Promise<void>;
    remove(id:number): Promise<void>;
}