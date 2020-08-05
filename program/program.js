"use strict";


module.exports = (sequelize, DataTypes) => {

    const program = sequelize.define('program', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        program: {
            type: DataTypes.STRING,
            defaultValue: 'Session',
            allowNull: true,
            required: false
        },
        conference_id: {
            type: DataTypes.INTEGER,
            required: true,
            allowNull: false
        },
        spaces_available: {
            type: DataTypes.STRING,
            required: true, 
            allowNull: false
        },
        amount: {
            type: DataTypes.DECIMAL,
            required: true,
            allowNull: false
        }
    })
    return program;
}