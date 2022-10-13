import connector from '../../../../common/persistence/mssql.persistence';
import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';

export class BalanceMSSQLRepository implements BalanceRepository{
    public async all(): Promise<Balance[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance ORDER BY id DESC`;
        return result.recordset
    }

    public async find(id:number): Promise<Balance | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async findByUserId(id:number): Promise<Balance | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async store(entry:Balance): Promise<void>{
        const now = new Date();
        const { user_id,amount } = entry;
        const pool = await connector;
        await pool.query`INSERT INTO wallet_balance(user_id,  amount, created_at) 
        VALUES(${user_id}, ${amount}, ${now}) `;
    }

    public async update(entry:Balance): Promise<void>{
        const now = new Date();
        const { user_id,amount,id } = entry;
        const pool = await connector;
        await pool.query`UPDATE wallet_balance SET user_id = ${user_id},  amount = ${amount}, updated_at = ${now} WHERE id =  ${id}`;
    }

    public async remove(id:number): Promise<void>{
        const pool = await connector;
        await pool.query`DELETE FROM wallet_balance WHERE id = ${id}`;
    }

}