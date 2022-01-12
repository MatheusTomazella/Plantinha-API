import { Model, DataTypes } from "sequelize";

import database from "./Database";

export enum GraphDataTypes {
    TEMPERATURE   = 0,
    AIR_HUMIDITY  = 1,
    SOIL_HUMIDITY = 2,
};

export default class Graph extends Model {
    static addPoint ( plant : number, dataType : number, value : number ) : void {
        const date    = new Date();
        const year    = date.getFullYear();
        const month   = date.getMonth() + 1;
        const day     = date.getDate();
        const time    = date.toLocaleTimeString();

        Graph.create( {
            plant,
            year,
            month,
            day,
            time,
            dataType,
            value,
        } );
    } 
}

Graph.init( 
    {
        plant: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false        
        },
        year: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        month: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        day: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        time: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false
        },
        dataType: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false
        },
        value: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    },
    {
        sequelize: database.getSequelize(),
        modelName: 'Graph',
        timestamps: false,
        tableName: 'PLT_graph',
    }
);