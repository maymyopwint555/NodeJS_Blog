const mongoose = require('mongoose');
const Blog = require('../models/blog')

const blog_index = (req , res) => {
    Blog.find()
    .then(result => {
        res.render('Blogs/index', {title: 'Home' , blogs: result})
    })
    .catch(err => console.log(err))
}

const blog_create = (req , res) => {
    res.render('Blogs/create' , {title: 'Create a New Blog'})
}

const blog_store = (req , res) => {
    const blog = new Blog(req.body)

    blog.save()
        .then(result => {
            res.redirect('/blogs')
        })
        .catch(err => console.log(err))
}

const blog_details = (req , res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('404', { title: '404 Not Found' });
    }
    
    Blog.findById(id)
        .then(result => {
            res.render('Blogs/details', {title: 'Blog Details', blog: result})
        })
        .catch(err => console.log(err))
}

const blog_delete = (req , res) => {
    const id = req.params.id;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).render('404', { title: '404 Not Found' });
    }
    
    Blog.findByIdAndDelete(id)
        .then(result => {
            res.json({redirect: '/blogs'})
        })
        .catch(err => console.log(err))
}

module.exports = {
    blog_index , blog_create , blog_store , blog_details , blog_delete
}