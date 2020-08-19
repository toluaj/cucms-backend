"use strict";

module.exports = (sequelize, DataTypes) => {

    const review = sequelize.define('review', {

        id: {
            type: 		  DataTypes.UUID,
            primaryKey:   true,
            defaultValue: DataTypes.UUIDV4,
            allowNull:    false
        },
        abstract_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },
        conference_id: {
            type: DataTypes.INTEGER,
            allowNull: false, 
            required: true
        },
        feedback: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true
        },
        recommendation: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },
        // released: {
        //     type: DataTypes.ENUM,
        //     values: ["true","false"],
        //     defaultValue: "false"
        // }
    }, {
        underscored: true
    })
    return review;
}