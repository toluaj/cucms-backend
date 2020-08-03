"use strict";

module.exports = (sequelize, DataTypes) => {

    const conference = sequelize.define('conference', {

        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            // allowNull: false
        },

        name: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            required: true,
            allowNull: false
        },
        location: {
            type: DataTypes.TEXT, 
            required: true,
            allowNull: false
        },
        topic: {
            type: DataTypes.STRING,
            required: true,
            allowNull: false
        },
        start_date: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        end_date: {
            type: DataTypes.DATE,
            required: true,
            allowNull: false
        },
        // sessions: {
        //     type: DataTypes.INTEGER,
        //     required: true,
        //     allowNull: true
        // },
        created_at: DataTypes.DATE,

      updated_at: DataTypes.DATE,

      deleted_at: {
        type: DataTypes.DATE,
        allowNull: true
      }
    },
    {
        underscored: true
    }
    );
    return conference;
}