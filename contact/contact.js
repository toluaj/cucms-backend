"use strict";

module.exports = (sequelize, DataTypes) => {

    const contact = sequelize.define('contact', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },

        firstName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

        lastName: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

        email: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

        message: {
            type: DataTypes.TEXT,
            required: true,
            allowNull: false
        }
    })
    return contact;
}