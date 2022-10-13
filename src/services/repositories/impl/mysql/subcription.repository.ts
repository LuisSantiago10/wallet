import connector from '../../../../common/persistence/msql.persistence';
import { Subcription } from '../../domain/subcription';
import { SubcriptionRepository } from '../../subcription.repository';

export class SubcriptionMySQLRepository implements SubcriptionRepository{
    public async all(): Promise<Subcription[]>{
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_subscription ORDER BY id DESC'
        );
        return rows as Subcription[];
    }

    public async find(id:number): Promise<Subcription | null>{
        const [rows]:any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE id = ?',
            [id]
        );
        if(rows.length){
            return rows[0] as Subcription;
        }else{
            return null;
        }
    }

    public async findByUserAndCode(user_id:number,code:string): Promise<Subcription | null>{
        const [rows]:any[] = await connector.execute(
            'SELECT * FROM wallet_subscription WHERE user_id = ? AND code = ?',
            [user_id,code]
        );
        if(rows.length){
            return rows as Subcription;
        }else{
            return null;
        }
    }

    public async store(entry:Subcription): Promise<void>{
        const now = new Date();
        const { user_id,code,amount,cron } = entry;
        await connector.execute(
            'INSERT INTO wallet_subscription(user_id, code, amount, cron, created_at) VALUES(?, ?, ?, ?, ?)',
            [user_id,code,amount,cron,now]
        )
    }

    public async update(entry:Subcription): Promise<void>{
        const now = new Date();
        const { user_id,code,amount,cron,id } = entry;
        await connector.execute(
            'UPDATE wallet_subscription SET user_id = ?, code = ?, amount = ?, cron = ?, updated_at = ? WHERE id = ?',
            [user_id,code,amount,cron,now,id]
        )
    }

    public async remove(id:number): Promise<void>{
        await connector.execute(
            'DELETE FROM wallet_subscription WHERE id = ?',
            [id]
        );
    }
}