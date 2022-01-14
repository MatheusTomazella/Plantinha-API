import { Model, DataTypes } from "sequelize";
import database from "./Database";

type ConfigData = {
    PUMP_CHECK_INTERVAL_MS    : number;
    PUMP_RUN_TIME_MS          : number;
    DRY_THRESHOLD_PERCENTAGE  : number;
    GRAPH_PLOT_INTERVAL_MS    : number;
};

export default class Config extends Model { 
    
    static createOrUpdate ( plant : number, data : ConfigData ) : Promise<Config> {
        return Config.findOne({ where: { plant } })
            .then( ( config : Config | null ) => {
                if ( config ) return config.update( data );
                else return Config.create( { ...data, plant } );
            } )
    }
}

Config.init(
    {
        plant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            unique: true,
        },
        PUMP_CHECK_INTERVAL_MS: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        PUMP_RUN_TIME_MS: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        DRY_THRESHOLD_PERCENTAGE: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        GRAPH_PLOT_INTERVAL_MS: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    }, 
    {
        sequelize: database.getSequelize(),
        modelName: 'Config',
        timestamps: false,
        tableName: 'PLT_config',
    }
);