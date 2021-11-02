const express = require('express');
const { route } = require('.');
const router = express.Router();
const { User, Post } = require("../../models");
const bcrypt = require('bcrypt');
// const { restore } = require('../../models/user');
// const e = require('express');


router.get("/", (req, res) => {
    User.findAll({
        include: [{
            model: Post,
            attributes: {
                exclude: ["createdAt", "updatedAt"]
            }
        }]
    }).then(dbUser => {
        if (dbUser.length) {
            res.json(dbUser)
        } else {
            res.status(404).json({ message: "No users found in db" })
        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({ message: "An error occured", err: err })
    });
});

router.post("/", (req, res) => {
    // const encryptedPassword = bcrypt.hashSync(req.body.password, 3);
    User.create({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    }).then(newUser => {
        res.json(newUser);
    }).catch(err => {
        console.log(err);
        res.status(500).json({ message: "An error occured", err: err })
    })
})

//update user info:
//for future reference but likely an issue with the password being encrypted
// router.put("/:id", async (req, rec) => {
//     try {
//         const userData = await User.update(req.body, {
//             where: {
//                 id: req.params.id,
//             },
//             individualHooks: true
//         });
//         if (!userData[0]) {
//             res.status(404).json({ message: "wrong user id!"});
//             return;
//         }
//         res.status(200).json(userData);
//     } catch(err) {
//         res.status(500).json(err);
//     }
// })

//login route (always use a post)
router.post('/login', async (req, res) => {
    try {
      const userData = await User.findOne({ where: { email: req.body.email } });
  
      if (!userData) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      const validPassword = await userData.checkPassword(req.body.password);
  
      if (!validPassword) {
        res
          .status(400)
          .json({ message: 'Incorrect email or password, please try again' });
        return;
      }
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.logged_in = true;
        
        res.json({ user: userData, message: 'You are now logged in!' });
      });
  
    } catch (err) {
      res.status(400).json(err);
    }
  });

module.exports = router;