const { User } = require('./model/user')
const checkIfEmailAlreadyExist = `SELECT COUNT(*) AS count FROM users WHERE email = ?`

async function checkEmailExist(email) 
{
    const existingUser = await User.findOne({
        where: {
            email: email
        }
    })

    if(existingUser)
    {
        return true
    }
    else
    {
        return false
    }
}

module.exports = {
    checkIfEmailAlreadyExist,
    checkEmailExist
}
