const router = require('express').Router();
const Post = require('../../models/Post');

router.post('/', async (req, res) =>{
    try{
        const postData = await Post.create({
            title: req.body.title,
            text:req.body.text,
            user_id: req.body.user_id
        });
        res.status(205).json(postData);
    }catch (err){
        console.log(err);
        res.status(500);
    }
});

router.put('/:id', async (req, res) =>{
    try{
        const postDataId = await Post.update({
            title: req.body.title,
            text: req.body.text
        },
        {
            where: {
                id: req.params.id
            }
        })
        res.status(205).json(postDataId);
    } catch{
        console.log(err);
        res.status(500);
    }
});

router.delete(':/id', async (req, res) =>{
    try{
        const postDataDelete = await Post.findByPk(req.params.id);
        await postDataDelete.destroy();
        res.status(200).json({ message: 'content deleted'});
    } catch {
        console.log(err);
        res.status(500);
    }
});

module.exports = router;