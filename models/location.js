const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Location extends Model {}

Location.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull: false
    },
    lat:{
        type:DataTypes.STRING,
    },
    long:{
        type:DataTypes.STRING,
    },
    // bird_id:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: 'bird',
    //         key: 'id',
    //       }
    // }
},{
    sequelize
})

module.exports = Location;