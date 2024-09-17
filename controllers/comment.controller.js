const { User } = require('../model/user')
const Comment = require('../model/comment')

async function createComment(req, res) 
{
    try 
    {
        const { body, userId, postId } = req.body
        const checkUser = await User.findByPk(userId)
        const checkPost = await User.findByPk(postId)
        
        if(!checkUser)
        {
            return res.status(404).json({
                success: false,
                message: 'User ID Does Not Exist...'
            })
        }
        else if(!checkPost)
        {
            return res.status(404).json({
                success: false,
                message: 'Post ID Does Not Exist...'
            })
        }


        const newComment = Comment.build({
            body: body,
            userId: userId,
            postId: postId
        })

        const saveComment = await newComment.save()

        return res.status(201).json({
            success: true,
            message: 'Comment Was Created Successfully!',
            data: saveComment
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

async function fetchComments(req, res) 
{
    try 
    {
        const allComments = await Comment.findAll({ include: ['user', 'post'] })

        if (allComments.length === 0)
        {
            return res.status(404).json({
                success: false,
                message: "No Comment Record Was Found!"
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: allComments
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

async function updateComment(req, res) 
{
    try 
    {
        const { id } = req.params
        
        const { body, userId, postId } = req.body
        const checkUser = await User.findByPk(userId)
        const checkPost = await User.findByPk(postId)
        
        if(!checkUser)
        {
            return res.status(404).json({
                success: false,
                message: 'User ID Does Not Exist...'
            })
        }
        else if(!checkPost)
        {
            return res.status(404).json({
                success: false,
                message: 'Post ID Does Not Exist...'
            })
        }
        else
        {
            const checkCommentId = await Comment.findByPk(id)

            if (checkCommentId)
            {
                checkCommentId.set({
                    body: body,
                    userId: userId,
                    postId: postId
                })

                await checkCommentId.save()

                return res.status(200).json({
                    success: true,
                    message: "Comment Was Updated Successfully!"
                })
            }
            else
            {
                return res.status(404).json({
                    success: false,
                    message: `Comment Wth The ID od ${ id } Does Not Exist!`
                })
            }
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

async function singleComment(req, res) 
{
    try 
    {
        const { id } = req.params
        const commentById = await Comment.findOne({ where: { id: id }, include: ['user', 'post'] })

        if(!commentById)
        {
            return res.status(404).json({
                success: false,
                message: `Comment With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            return res.status(200).json({
                success: true,
                data: commentById
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

async function deleteComment(req, res) 
{
    try 
    {
        const { id } = req.params
        const deleteCommentById = await Comment.findByPk(id)

        if(!deleteCommentById)
        {
            return res.status(404).json({
                success: false,
                message: `Comment With The ID Of ${ id } Does Not Exist!`
            })
        }
        else
        {
            await deleteCommentById.destroy()

            return res.status(200).json({
                success: true,
                message: "Comment Was Deleted Successfully!"
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
    createComment,
    fetchComments,
    updateComment,
    singleComment,
    deleteComment
}

