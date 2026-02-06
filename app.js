const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/user');
const Task = require('./models/task');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(session({
    secret: 'secret key',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        const user = await User.findOne({ username: username });
        
        if (!user) { 
            return done(null, false, { message: 'Incorrect username.' }); 
        }
        
        if (user.password !== password) { 
            return done(null, false, { message: 'Incorrect password.' }); 
        }
        
        return done(null, user);
    } catch (err) {
        return done(err);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch(err) {
        done(err, null);
    }
});

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

mongoose.connect('mongodb://127.0.0.1:27017/globalTrendTaskApp')
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log("DB Connection Error:", err));


app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = new User({ username, password });
        await user.save();
        res.redirect('/login');
    } catch (e) {
        console.log(e);
        res.redirect('/register');
    }
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
}));

app.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
}


app.get('/', isLoggedIn, async (req, res) => {
    let filter = {};
    if (req.query.status && req.query.status !== 'All') {
        filter.status = req.query.status;
    }
    const tasks = await Task.find(filter);
    res.render('index', { tasks: tasks, currentFilter: req.query.status || 'All' });
});

app.get('/tasks/new', isLoggedIn, (req, res) => {
    res.render('new');
});

app.post('/tasks', isLoggedIn, async (req, res) => {
    const { title, description, status } = req.body;
    const newTask = new Task({ title, description, status });
    await newTask.save();
    res.redirect('/');
});

app.get('/tasks/:id/edit', isLoggedIn, async (req, res) => {
    const task = await Task.findById(req.params.id);
    res.render('edit', { task: task });
});

app.put('/tasks/:id', isLoggedIn, async (req, res) => {
    const { title, description, status } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, status });
    res.redirect('/');
});

app.delete('/tasks/:id', isLoggedIn, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.redirect('/');
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});