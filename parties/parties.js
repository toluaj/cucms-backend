"use strict";

module.exports = (sequelize, DataTypes) => {

    const party = sequelize.define('parties', {

        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false
        },

        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },

        conference_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },

        role: {
            type: DataTypes.ENUM,
            values: ["author", "participant", "reviewer", "chair"],
            defaultValue: "participant",
            allowNull: false,
            required: true
        },

        affiliation: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        }

    }, {
        underscored: true
    })
    return party;
}