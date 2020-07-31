"use strict";


module.exports = (sequelize, DataTypes) => {

    const program = sequelize.define('program', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            defaultValue: 'Program',
            allowNull: false,
            required: true
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
        }
    })
    return program;
}