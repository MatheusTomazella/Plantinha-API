import PlantData from "../typings/PlantData";
import { Model, DataTypes } from "sequelize";

import database from "./Database";
import Graph, { GraphDataTypes } from "./Graph";

export default class Plant extends Model {
    public  id          : number | undefined;
    public  name        : string | undefined;
    private timestamp   : number | undefined;

    private temperature   : number = 0;
    private airHumidity   : number = 0;
    private soilHumidity  : number = 0;
    private waterLevel    : number = 0;

    public getLifetime ( ) {
        return Math.floor( ( Date.now() - (this.timestamp as number) ) / (1000 * 3600 * 24) );
    }
    
    public getData ( ) : PlantData {
        return {
            temperature   : this.temperature,
            airHumidity   : this.airHumidity,
            soilHumidity  : this.soilHumidity,
            waterLevel    : this.waterLevel,
            lifetime      : this.getLifetime()
        }
    }

    public setData ( data : PlantData ) : void { 
        this.temperature   = data.temperature;
        this.airHumidity   = data.airHumidity;
        this.soilHumidity  = data.soilHumidity;
        this.waterLevel    = data.waterLevel;
    }

    public async addPoint ( ) : Promise<void> {
        Graph.addPoint( this.id as number, GraphDataTypes.TEMPERATURE, this.temperature );
        Graph.addPoint( this.id as number, GraphDataTypes.AIR_HUMIDITY, this.airHumidity );
        Graph.addPoint( this.id as number, GraphDataTypes.SOIL_HUMIDITY, this.soilHumidity );
    }
};

Plant.init(
    {
        id: {
            type: DataTypes.BIGINT.UNSIGNED,
            primaryKey: true,
            allowNull: false,
            unique: true,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        timestamp: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, 
    {
        sequelize: database.getSequelize(),
        modelName: 'Plant',
        timestamps: false,
        tableName: 'PLT_plant',
    }
);
  