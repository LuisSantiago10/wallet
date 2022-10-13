import connector from '../../../../common/persistence/msql.persistence';
import { Movement } from "../../domain/movement";
import { MovementRepository } from "../../movement.repository";

export class MovementMySQLRepository implements MovementRepository{
    public async all(): Promise<Movement[]>{
        const [rows] = await connector.execute(
            'SELECT * FROM wallet_movement ORDER BY id DESC'
        );
        return rows as Movement[];
    }

    public async find(id:number): Promise<Movement | null>{
        const [rows]:any[] = await connector.execute(
            'SELECT * FROM wallet_movement WHERE id = ?',
            [id]
        );
        if(rows.length){
            return rows[0] as Movement;
        }else{
            return null;
        }
    }

    public async store(entry:Movement): Promise<void>{
        const now = new Date();
        const { user_id,type,amount } = entry;
        await connector.execute(
            'INSERT INTO wallet_movement(user_id, type, amount, created_at) VALUES(?, ?, ?, ?)',
            [user_id,type,amount,now]
        )
    }

    public async update(entry:Movement): Promise<void>{
        const now = new Date();
        const { user_id,type,amount,id } = entry;
        await connector.execute(
            'UPDATE wallet_movement SET user_id = ?, type = ?, amount = ?, updated_at = ? WHERE id = ?',
            [user_id,type,amount,now,id]
        )
    }

    public async remove(id:number): Promise<void>{
        await connector.execute(
            'DELETE FROM wallet_movement WHERE id = ?',
            [id]
        );
    }

}