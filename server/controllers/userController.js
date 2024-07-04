const User = require('../models/userModel')
const bcrypt = require('bcrypt')
const generateToken = require('../utils/generateToken')

/* CONTROLLER FOR REGISTERING USER */
const registerController = async (req, res) => {
    const { userName, email, password } = req.body
    try {
        if (!userName || !email || !password) {
            return res.status(400).json({ message: "Please enter all fields" })
        }

        //checks if the email id is already registered or not
        const userExists = await User.findOne({ email })

        //if email id alredy exists, returns a message to login
        if (userExists) {
            return res.status(400).json({ message: "User Already exists! Please login" })
        }

        //if email id does not exists, creates a new user by encrypting the password
        const user = new User({ userName, email, password })
        await user.save()

        //returning the response if registration completes successfully
        if (user) {
            return res.status(201).json({ message: "User successfully registered" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR USER LOGIN*/
const loginController = async (req, res) => {
    const { email, password } = req.body

    try {
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter all fields" })
        }

        //checks if the user exists with the given email id 
        const user = await User.findOne({ email })


        //if user does not exist returning from here
        if (!user) {
            return res.status(401).json({ msg: "Invalid Credentials" })
        }

        //if user exists, then checks if password matches with the encrypted 
        //password which was generated while user was registering
        if (user && (await user.comparePassword(password))) {
            res.status(200).json({
                message: "User loggedin successfully",
                user: {
                    id: user._id,
                    email: user.email,
                    //generating a jwt token by sending user id as payload
                    token: generateToken(user._id)
                }
            })
        }
        else {
            return res.status(401).json({ message: "Invalid Credentials" })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })
    }
}


/* CONTROLLER FOR RESETTING THE PASSWORD */
const resetPasswordController = async (req, res) => {
    const { email, newPassword } = req.body
    try {
        //finds the user with given email id
        const user = await User.findOne({ email })

        //if user does not exist returns a message
        if (!user) {
            return res.status(400).json({ message: "User does not exists" })
        }

        //if user exists, encrypts the new password 
        const hashedPassword = await bcrypt.hash(newPassword, 10)

        //update the existing password with the newly hashed password
        await User.findByIdAndUpdate(user._id, { password: hashedPassword }, { new: true })

        res.status(200).json({ message: "Password reset completed" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Internal Server Error" })
    }
}

module.exports = { registerController, loginController, resetPasswordController }