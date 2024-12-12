const User = require("../../models/User");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const asyncWrapper = require("../../middleware/async")
const login = asyncWrapper(async (req, res) => {
    const email = req.body.email;
    const rPassword = req.body.password;
    let user = await User.findOne({ email: email })
    console.log(user)
    if (user && (bcrypt.compare(rPassword, user.password))) {
        console.log('user')
        var token = jwt.sign({ userId: user._id, username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, isAdmin: user.isAdmin }, process.env.NEXT_PUBLIC_JWT_TOKEN);

        const newUser = {
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            avatar: user.avatar,
            email: user.email,
            age: user.age,
            isAdmin: user.isAdmin
        }

        return res.status(200).json({ success: true, message: "You are logged in successfully", token: token, user: newUser })

    }
    else {
        return res.status(400).json({ message: "Invalid Credientails", type: "error" })
    }

})
module.exports = login