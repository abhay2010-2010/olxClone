const express = require('express');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const bodyParser = require('body-parser');
const dbconnect = require('./config/config');
const productController = require('./controllers/productController');
const userController = require('./controllers/userController');

const app = express();
const port = 4000;

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads'),
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});

const upload = multer({ storage });

// Middleware setup
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route definitions
app.get('/', (req, res) => res.send('Hello...'));

// Product routes
app.get('/search', productController.searchProducts);
app.post('/add-product', upload.fields([{ name: 'pimage' }, { name: 'pimage2' }]), productController.addProduct);
app.get('/get-products', productController.getProducts);
app.get('/get-product/:pId', productController.getProductsById);
app.post('/my-products', productController.myProducts);

// User routes
app.post('/like-product', userController.likeProducts);
app.post('/signup', userController.signup);
app.post('/login', userController.login);
app.get('/my-profile/:userId', userController.myProfileById);
app.get('/get-user/:uId', userController.getUserById);
app.post('/liked-products', userController.likedProducts);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ message: 'Internal server error' });
});

// Start server
app.listen(port, async () => {
    try {
        await dbconnect;
        console.log(`App listening on port ${port}`);
    } catch (error) {
        console.error('Database connection error:', error);
    }
});
