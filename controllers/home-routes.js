const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const { post } = require('./api');


router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username', 'github']
                },
                {
                    model: Comment,
                    attributes: ['body']
                }
            ],
        });
        const everyPost = postData.map((post) =>
            post.get({ plain: true })
        );
        res.render('homepage', { postData: everyPost});
    } catch (err){
        res.status(500).json('error')
    }
});

router.get('/login', async (req, res) => {
    if (req.session.logged_in){
        res.redirect('/');
    } else {
        res.render('login');
    }
});

router.get('/signup', async (req, res) =>{
    if (req.session.logged_in){
        res.redirect('/');
    } else {
        res.render('create_account');
    }
});

router.get('/post/:id', async (req, res) =>{
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ['title', 'text'],
        include: [{
            model: User,
            attributes: ['username', 'github']
        }],
        
    }).then(dbPostData => {
        if (!dbPostData){
            res.status(404).json({message: "no matching posts"});
        }
        const allPost = dbPostData.get({plain: true});

        res.render('one-post', {
            post,
            logged_in: req.session.logged_in
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    })
});

module.exports = router;
