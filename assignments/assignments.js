"use strict";

module.exports = (sequelize, DataTypes) => {

    const assignments = sequelize.define('assignments', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        abstract_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },
        reviewer_id: {
            type: DataTypes.UUID,
            allowNull: false,
            required: true
        },
        conference_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            required: true
        },
        conference_name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

    }, {
        underscored: true
    })
    return assignments;
}