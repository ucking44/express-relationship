const express = require('express')
//const routes = require('./routes')
const {sequelize} = require('./db')
const conn = require('./config/config.json')
//const body_parser = require('body-parser')
const userRoute = require('./routes/user')
const postRoute = require('./routes/post')
const addressRoute = require('./routes/address')
const { User } = require('./model/user')
const Address = require('./model/address')
const Post = require('./model/post')
const Comment = require('./model/comment')
const CommentRoute = require('./routes/comment')
const ImageRoute = require('./routes/images')


const app = express()
const Port = 7000

//app.use(body_parser)

// PARSE FORM DATA
app.use(express.urlencoded({ extended: false }))
// PARSE JSON
app.use(express.json())
app.use('/uploads', express.static('uploads'))

//app.use('/api', routes)
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/address', addressRoute)
app.use('/comment', CommentRoute)
app.use('/images', ImageRoute)


User.hasOne(Address)
User.hasMany(Post)
User.hasMany(Comment)
Address.belongsTo(User)
Post.belongsTo(User)
Post.hasMany(Comment)
Comment.belongsTo(User)
Comment.belongsTo(Post)


//sequelize.sync({ force: true })

app.listen(Port, async () => {
    console.log(`Server is running on port http://localhost:${ Port }`)
    await conn
})

module.exports = app
