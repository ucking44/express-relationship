const Post = require('../model/post')
const { User } = require('../model/user')

async function createPost(req, res) 
{
    try 
    {
        const { title, content, image, userId } = req.body

        const checkUser = await User.findByPk(userId)
        //const checkUser = await User.findOne({ where: { id: userId } })
        
        if(!checkUser)
        {
            return res.status(404).json({
                success: false,
                //message: `User With The ID Of ${ checkUser } Does Not Exist`
                message: 'User ID Does Not Exist...'
            })
        }
        else if (!title)
        {
            return res.status(400).json({
                success: false,
                message: 'Title Field Can Not Be Empty...'
            })
        }
        else if (!content)
        {
            return res.status(400).json({
                success: false,
                message: 'Content Field Can Not Be Empty...'
            })
        }

        const newPost = Post.build({
            title: title,
            content: content,
            image: image,
            userId: userId
        })

        const savePost = await newPost.save()

        return res.status(201).json({
            success: true,
            message: 'Post Was Created Successfully!',
            data: savePost
        })
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

async function fetchPosts(req, res) 
{
    try 
    {
        const allPosts = await Post.findAll()

        if (allPosts.length === 0)
        {
            res.status(404).json({
                success: false,
                message: "No Post Record Was Found!"
            })
        }
        else
        {
            res.status(200).json({
                success: true,
                data: allPosts
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

async function updatePost(req, res) 
{
    try 
    {
        /// GET REQUEST PARAM ID
        const { id } = req.params
        const { title, content, image, userId } = req.body
        const checkUser = await User.findOne({ where: { id: userId } })
        
        if(!checkUser)
        {
            return res.status(404).json({
                success: false,
                //message: `User With The ID Of ${ checkUser } Does Not Exist`
                message: 'User ID Does Not Exist...'
            })
        }
        const postId = await Post.findByPk(id)

        if(postId)
        {
            postId.set({
                title: title,
                content: content,
                image: image,
                userId: userId
            })

            await postId.save()

            res.status(200).json({
                success: true,
                message: 'Post Was Updated Successfully!'
            })
        }
        else
        {
            return res.status(404).json({
                success: false,
                message: `Post Wth The ID od ${ id } Does Not Exist!`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

async function fetchPostById(req, res) 
{
    try 
    {
        // CHECK IF POST ID EXIST
        const { id } = req.params
        const postID = await Post.findByPk(id, { include: ["user"]})

        if(postID)
        {
            res.status(200).json({
                success: true,
                data: postID
            })
        }
        else
        {
            return res.status(404).json({
                success: false,
                message: `Post Wth The ID od ${ id } Does Not Exist!`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

async function deletePost(req, res) 
{
    try 
    {
        /// CHECK IF POST ID EXIST
        const { id } = req.params
        const postId = await Post.findByPk(id)
        
        if(postId)
        {
        
            await postId.destroy()

            return res.status(200).json({
                success: true,
                message: "Post Was Deleted Successfully!"
            })
        }
        else
        {
            return res.status(404).json({
                success: false,
                message: `Post Wth The ID od ${ id } Does Not Exist!`
            })
        }
    } 
    catch (error) 
    {
        console.log(error)
        res.status(500).json({
            success: false,
            message: error
        })
    }
}

module.exports = {
    createPost: createPost,
    fetchPosts: fetchPosts,
    updatePost: updatePost,
    fetchPostById,
    deletePost
}
