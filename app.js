const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoute = require('./routes/blogRoute');

const app = express();
const port = 3000;

const db = "mongodb://localhost:27017/node_blogs";
mongoose.connect(db)
    .then(result => app.listen(port))
    .catch(err => console.log(err))

app.set('view engine','ejs');


app.use(express.static('public')); 
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))

app.use('/blogs',blogRoute)

// app.get('/all-blogs', (req , res) => {
//     Blog.find()
//         .then(result => {
//             res.send(result)
//         })
//         .catch(err => console.log(err))
// })

// app.get('/add-blog',(req , res) => {
//     const blog = new Blog({
//         title: 'new Blog 1',
//         snippet: 'About my new blog 2',
//         body: 'lorem iseini iiekto'
//     });

//     blog.save()
//         .then(result => {
//             res.send(result);
//         })
//         .catch(err => console.log(err))
// })

app.get('/', (req, res) => {
   res.redirect('/blogs')
})



app.get('/about', (req, res) => {
  res.render('about' , {title: 'About'})
})

// 404 not found
app.use((req,res) => {
    res.status(404).render('404' , {title: '404'});
})


