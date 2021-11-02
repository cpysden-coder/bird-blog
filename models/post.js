const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    // add properites here, ex:
    content: {
        type: DataTypes.TEXT,
    },
    date_seen: {
        type: DataTypes.STRING,
    },
    // username_id:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: 'User',
    //         key: 'id',
    //       }
    // },
    // location_id:{
    //     type:DataTypes.INTEGER,
    //     references: {
    //         model: 'location',
    //         key: 'id',
    //       }
    // },
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
module.exports = Post;