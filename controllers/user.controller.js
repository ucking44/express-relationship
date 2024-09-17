const express = require('express')
const { User } = require('../model/user')
const Address  = require('../model/address')
const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const { queryPromise, processPromise } = require('../qpromise')


async function signUp (req, res) 
{

    const { password } = req.body
    const salt = bcryptjs.genSaltSync(10)
    const hashPassword = bcryptjs.hashSync(password, salt)

    const user = {
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    }

    const checkEmail = await User.findOne({ where: { email: user.email } })

    if(checkEmail)
    {
        return res.status(400).json({
            message: `${ user.email } Has Already Been Taken By Another User`
        })
    }
    else
    {
        const userResult = await User.create(user)

        if(userResult)
        {
            res.status(201).json({
                success: true,
                message: 'User Was Created Successfully!',
                data: userResult
            })
        }
        else
        {
            res.status(201).json({
                success: true,
                message: 'Ooopsss! Something Went Wrong...'
            })
        }
    }
}

async function singin(req, res) 
{
    const { email, password } = req.body
    const user = await User.findOne({
        where: {
            email: email
        }
    })

    if(!user)
    {
        return res.status(401).json({
            success: false,
            message: "Invalid Email Credentials..!"
        })
    }

    const isValidPassword = await bcryptjs.compare(password, user.password)

    if (!isValidPassword)
    {
        return res.status(401).json({
            success: false,
            message: 'Password Does Not Match!'
        })
    }

    const token = jwt.sign({
        email: user.email,
        userId: user.id
    }, process.env.JWT_KEY)

    if(token)
    {
        res.status(200).json({
            success: true,
            message: "Authentication Was Successful!",
            token: token
        })
    }
    else
    {
        res.status(401).json({
            success: false,
            message: "Invalid Credentials Given..!"
        })
    }
}

async function login(req, res) {
    User.findOne({ where: { email: req.body.email }}).then(user => {
        if(user === null) {
            res.status(401).json({
                message: "Invalid Credentials!"
            })
        }
        else {
            bcryptjs.compare(req.body.password, user.password, function(err, result) {
                if(result) {
                    const token = jwt.sign({
                        email: user.email,
                        userId: user.id
                    }, process.env.JWT_KEY, function(err, token) {
                        res.status(200).json({
                            message: "Authentication Was Successful!",
                            token: token
                        })
                    })
                }
                else {
                    res.status(401).json({
                        message: "Invalid Credentials!"
                    })
                }
            })
        }
    }).catch(error => {
        res.status(500).json({
            message: "Something Went Wrong!"
        })
    })
}

async function signingUp (req, res) {
    const { name, email, password } = req.body

    const salt = bcryptjs.genSaltSync(10)
    const hashPassword = bcryptjs.hashSync(password, salt)

    const newUser = User.build({
        'name': name,
        'email': email,
        'password': hashPassword
    })

    const checkEmail = await User.findOne({ where: { email: email } })

    if(checkEmail)
    {
        return res.status(400).json({
            message: `${ email } Has Already Been Taken By Another User`
        })
    }
    else
    {
        const userResult = await newUser.save()

        if(userResult)
        {
            res.status(201).json({
                success: true,
                message: 'User Was Created Successfully!',
                data: userResult
            })
        }
        else
        {
            res.status(201).json({
                success: true,
                message: 'Ooopsss! Something Went Wrong...'
            })
        }
    }
}

async function fetchUserById(req, res) 
{
    try 
    {
        const { id } = req.params
        //const singleUser = await User.findByPk(id, { include: [User.Address] })
        const singleUser = await User.findByPk(id, {
            include: Address
        })
        res.status(200).json({
            success: true,
            data: singleUser
        })
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: 'Ooopsss! Something Went Wrong!'
        })
    }
}

module.exports = {
    signUp: signUp,
    singin: singin,
    login: login,
    signingUp: signingUp,
    fetchUserById
}

