const router = require('express').Router();
const { Comment, Post } = require('../../models');

router.post('/', async (req, res) =>{
    try{
        const commentData = await Comment.create({
            title: req.body.title,
            content:req.body.content,
            user_id: req.body.user_id,
            post_id: req.body.post_id
        });
        res.status(205).json(commentData);
    }catch (err){
        console.log(err);
        res.status(500);
    }
});

router.put('/:id', async (req, res) =>{
    try{
        const commentDataId = await Post.update({
            title: req.body.title,
            content: req.body.content
        },
        {
            where: {
                id: req.params.id
            }
        })
        res.status(205).json(commentDataId);
    } catch{
        console.log(err);
        res.status(500);
    }
});

router.delete(':/id', async (req, res) =>{
    try{
        const commentDataDelete = await Post.findByPk(req.params.id);
        await commentDataDelete.destroy();
        res.status(200).json({ message: 'content deleted'});
    } catch {
        console.log(err);
        res.status(500);
    }
});

module.exports = router;