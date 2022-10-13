import connector from '../../../../common/persistence/msql.persistence';
import { BalanceRepository } from '../../balance.repository';
import { Balance } from '../../domain/balance';


export class BalanceMySQLRepository implements BalanceRepository{
    public async all(): Promise<Balance[]>{
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_balance ORDER BY id DESC'
        );
        return rows as Balance[];
    }

    public async find(id:number): Promise<Balance | null>{
        const [rows]:any[] = await connector.execute(
            'SELECT * FROM wallet_balance WHERE id = ?',
            [id]
        );
        if(rows.length){
            return rows[0] as Balance;
        }else{
            return null;
        }
    }

    public async findByUserId(user_id:number): Promise<Balance | null>{
        const [rows]:any[] = await connector.execute(
            'SELECT * FROM wallet_balance WHERE user_id = ?',
            [user_id]
        );
        if(rows.length){
            return rows[0] as Balance;
        }else{
            return null;
        }
    }

    public async store(entry:Balance): Promise<void>{
        const now = new Date();
        const { user_id,amount } = entry;
        console.log(entry);
        
        await connector.execute(
            'INSERT INTO wallet_balance(user_id, amount, created_at) VALUES(?, ?, ?)',
            [user_id,amount,now]
        )
    }

    public async update(entry:Balance): Promise<void>{
        const now = new Date();
        const { user_id,amount,id } = entry;
        await connector.execute(
            'UPDATE wallet_balance SET user_id = ?, amount = ?, updated_at = ? WHERE id = ?',
            [user_id,amount,now,id]
        )
    }

    public async remove(id:number): Promise<void>{
        await connector.execute(
            'DELETE FROM wallet_balance WHERE id = ?',
            [id]
        );
    }
}