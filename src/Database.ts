import process from "process";
import { Sequelize } from "sequelize";

class Database {
    private sequelize : Sequelize | undefined;

    constructor ( ) { 
        this.connect();

        this.ping();
    }

    public getSequelize ( ) : Sequelize { 
        if ( this.sequelize === undefined ) { throw new Error("Database not connected"); }
        return this.sequelize; 
    }

    public connect ( ) : void { 
        this.sequelize = new Sequelize(process.env.DB_DATABASE||"", process.env.DB_USERNAME||"", process.env.DB_PASSWORD||"", {
            host: process.env.DB_HOST||"",
            dialect: 'mysql',
            port: parseInt(process.env.DB_PORT||"3306"),
        });
    }

    public async ping ( ) : Promise<void> { 
        try {
            if ( this.sequelize === undefined ) { throw new Error("Database not connected"); }
            await this.sequelize.authenticate();
            console.log('Connection has been established successfully.');
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }
}

export default new Database();