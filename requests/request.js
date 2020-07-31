"use strict";

module.exports = (sequelize, DataTypes) => {

    const request = sequelize.define('requests', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        
        conference_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },

        requester_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },

        reply: {
            type: DataTypes.ENUM,
            values: ["accepted","rejected","pending"],
            defaultValue: "pending",
            allowNull: false,
            required: true
        },

        conference_name: {
            type: DataTypes.STRING,
            allowNull: true, 
            required: false
        },

        email: {
            type: DataTypes.STRING,
            allowNull: true,
            required: false
        },

        type: {
            type: DataTypes.STRING,
            allowNull: false, 
            required: true
        }

    }, {
        underscored: true
    })
    return request;
}