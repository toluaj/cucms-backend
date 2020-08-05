"use strict";

module.exports = (sequelize, DataTypes) => {

    const activity = sequelize.define('activity', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        name: {
            type: DataTypes.STRING,
            allowNull: false, 
            required: true
        },

        room: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },

        date: {
            type: DataTypes.DATE,
            allowNull: false,
            required: true
        },
        
        start_time: {
            type: DataTypes.TIME,
            allowNull: false,
            required: true
        },

        end_time: {
            type: DataTypes.TIME,
            allowNull: false,
            required: true
        }
    }, {
        underscored: true
    })
    return activity;
}