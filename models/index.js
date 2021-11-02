const User = require("./user");
const Post = require("./post");
const Bird = require("./bird")
const Location = require("./location")
// const Group = require("./Group");

User.hasMany(Post);
Post.belongsTo(User);

// User.belongsToMany(Group,{
//     through:"UserGroup"
// })

// Group.belongsToMany(User,{
//     through:"UserGroup"
// })

module.exports={
    //if the value of the variable is same name as key, you can omit the key and just ref variable (see the 2 examples below)
    User: User,
    Post,
    Bird,
    Location
    // Group
};