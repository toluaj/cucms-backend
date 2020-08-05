"use strict";

module.exports = (sequelize, DataTypes) => {

    const payment = sequelize.define('payment', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull:    false
        },
        ref: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },
        program_id: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false
        }

    }, {
        underscored: true
    })
    return payment;
}