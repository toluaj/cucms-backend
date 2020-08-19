"use strict";

module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define('user', {

        id: {
            type: 		  DataTypes.UUID,
            primaryKey:   true,
            defaultValue: DataTypes.UUIDV4,
            allowNull:    false
        },

        title: {
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

        gender: {
            type: DataTypes.ENUM,
			values: ['Male', 'Female', 'Other'],
			allowNull: false,
			required: true
        },

        role: {
            type: DataTypes.ENUM,
            values: ["chair", "reviewer", "user", "admin"],
            defaultValue: "user",
            allowNull: false,
            required: true
        },

        email: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true,
            unique: true,
            validate : {
                isEmail: true
            }
        },

        phoneNumber: {
            type: DataTypes.STRING,
            required: true, 
            allowNull: false,
            validate: {
                isNumeric: true,
                min: 11
            }
        },

        alternate_phone: {
            type: DataTypes.STRING,
            required: false, 
            allowNull: true,
        },

        password: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },

        country: {
            type: DataTypes.STRING,
            allowNull: false,
            required: true
        },

        address: {
            type: DataTypes.TEXT,
            allowNull: false,
            required: true
        },

        active: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        activeToken: DataTypes.STRING,
        activeExpires: DataTypes.DATE
    }, {
        underscored: true
    })
    return User;
}