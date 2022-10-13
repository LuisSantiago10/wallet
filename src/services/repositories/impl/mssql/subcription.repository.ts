import connector from '../../../../common/persistence/mssql.persistence';
import { Subcription } from '../../domain/subcription';
import { SubcriptionRepository } from '../../subcription.repository';

export class SubscriptionMSSQLRepository implements SubcriptionRepository{
    public async all(): Promise<Subcription[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement ORDER BY id DESC`;
        return result.recordset
    }

    public async find(id:number): Promise<Subcription | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async findByUserAndCode(id:number): Promise<Subcription | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async store(entry:Subcription): Promise<void>{
        const now = new Date();
        const { user_id,amount,code,cron } = entry;
        const pool = await connector;
        const result = await pool.query`INSERT INTO wallet_movement(user_id,  amount, created_at,code,cron) 
        VALUES(${user_id},  ${amount}, ${now}, ${code}, ${cron}) `;
    }

    public async update(entry:Subcription): Promise<void>{
        const now = new Date();
        const { user_id,amount,id,code,cron } = entry;
        const pool = await connector;
        const result = await pool.query`UPDATE wallet_movement SET user_id = ${user_id}, amount = ${amount},code = ${code}, cron = ${cron}, updated_at = ${now} WHERE id = ${id}`;
    }

    public async remove(id:number): Promise<void>{
        const pool = await connector;
        const result = await pool.query`DELETE FROM wallet_movement WHERE id = ${id}`;
    }

}