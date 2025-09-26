let express = require('express');
let app = express();
let mongoose = require('mongoose');
let multer = require('multer');
let cookieParser = require('cookie-parser');
let postsRouter = require("./routes/posts.route");
let callbackRequestRouter = require('./routes/callback-requests.route');
let emailsRouter = require('./routes/emails.route');
let usersRouter = require('./routes/users.route');
let Post = require('./models/post.model').Post;
let auth = require('./controllers/auth');


app.set('view engine', 'ejs');

mongoose.connect('mongodb://localhost/travels');
app.use(express.json());
app.use(cookieParser());


let imageStorage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'public/images'),
    filename: (req, file, cb) => cb(null, file.originalname)

});
app.use(multer({ storage: imageStorage }).single('imageFile'));
let id = 1;



app.use(express.static('public'));
app.use('/posts', postsRouter);
app.use('/callback-requests', callbackRequestRouter);
app.use('/emails', emailsRouter);
app.use('/users', usersRouter);



app.get('/landmark', async (req, resp) => {
    let id = req.query.id;
    let post = await Post.findOne({ id: id });
    resp.render('landmark', {
        title: post.title,
        imageURL: post.imageURL,
        date: post.date,
        text: post.text
    })
})




app.get('/admin', (req, resp) => {
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)) {
        resp.render('admin');
    } else {
        resp.redirect('/login');
    }

})

app.get('/login', (req, resp) => {
    let token = req.cookies['auth_token'];
    if (token && auth.checkToken(token)) {
        resp.redirect('/admin');
    } else {
        resp.render('login');
    }

})

app.listen(3000, () => console.log('Listening 3000....'));