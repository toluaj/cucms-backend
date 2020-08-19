"use strict";


module.exports = (sequelize, DataTypes) => {

    const paper = sequelize.define('paper', {

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },

            paper: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            user_id: {
                type: DataTypes.UUID,
                allowNull: false,
                required: true
            },
            path: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },
            conference_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                required: true
            },
            file_type: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            }
    }, {
        underscored: true
    } 
    )
    return paper;
}