import connector from '../../../../common/persistence/mssql.persistence';
import { Movement } from "../../domain/movement";
import { MovementRepository } from "../../movement.repository";

export class MovementMSSQLRepository implements MovementRepository{
    public async all(): Promise<Movement[]>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement ORDER BY id DESC`;
        return result.recordset
    }

    public async find(id:number): Promise<Movement | null>{
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_movement WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }
        return null;
    }

    public async store(entry:Movement): Promise<void>{
        const now = new Date();
        const { user_id,type,amount } = entry;
        const pool = await connector;
       await pool.query`INSERT INTO wallet_movement(user_id, type, amount, created_at) 
        VALUES(${user_id}, ${type}, ${amount}, ${now}) `;
    }

    public async update(entry:Movement): Promise<void>{
        const now = new Date();
        const { user_id,type,amount,id } = entry;
        const pool = await connector;
       await pool.query`UPDATE wallet_movement SET user_id = ${user_id}, type = ${type}, amount = ${amount}, updated_at = ${now} WHERE id = ${id}`;
    }

    public async remove(id:number): Promise<void>{
        const pool = await connector;
       await pool.query`DELETE FROM wallet_movement WHERE id = ${id}`;
    }

}