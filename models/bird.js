const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Bird extends Model {}

Bird.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         unique:true,
         validate:{
            isAlphanumeric:true
         }
    },
    image_ref:{
        type:DataTypes.STRING,
    },
    // location_id:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: 'Location',
    //         key: 'id',
    //       }
    // }
},{
    sequelize
})

module.exports = Bird;