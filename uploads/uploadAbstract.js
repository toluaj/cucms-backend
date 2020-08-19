"use strict";


module.exports = (sequelize, DataTypes) => {

    const abstract = sequelize.define('abstract', {

            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },

            title: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },

            abstract_text: {
                type: DataTypes.TEXT,
                allowNull: false,
                required: true
            },

            affiliation: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },

            firstName: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },

            lastName: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },

            email: {
                type: DataTypes.STRING,
                allowNull: false,
                required: true
            },

            abstract: {
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
            },
            status: {
                type: DataTypes.ENUM,
                values : ["accepted", "declined", "pending"],
                defaultValue : "pending"
            }
    }, {
        underscored: true
    } 
    )
    return abstract;
}