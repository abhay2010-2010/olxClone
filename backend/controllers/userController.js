const jwt = require('jsonwebtoken');
const Users = require('../schema/user');

// Helper function to handle errors
const handleError = (res, message = 'Server error') => res.status(500).send({ message });

const likeProducts = (req, res) => {
    const { productId, userId } = req.body;

    Users.updateOne({ _id: userId }, { $addToSet: { likedProducts: productId } })
        .then(() => res.send({ message: 'Product liked successfully.' }))
        .catch(() => handleError(res));
};

const signup = (req, res) => {
    const { username, password, email, mobile } = req.body;
    const user = new Users({ username, password, email, mobile });

    user.save()
        .then(() => res.send({ message: 'User registered successfully.' }))
        .catch(() => handleError(res));
};

const myProfileById = (req, res) => {
    Users.findOne({ _id: req.params.userId })
        .then(result => {
            if (result) {
                const { email, mobile, username } = result;
                res.send({ message: 'Success', user: { email, mobile, username } });
            } else {
                res.send({ message: 'User not found.' });
            }
        })
        .catch(() => handleError(res));
};

const getUserById = (req, res) => {
    Users.findOne({ _id: req.params.uId })
        .then(result => {
            if (result) {
                const { email, mobile, username } = result;
                res.send({ message: 'Success', user: { email, mobile, username } });
            } else {
                res.send({ message: 'User not found.' });
            }
        })
        .catch(() => handleError(res));
};

const login = (req, res) => {
    const { username, password } = req.body;

    Users.findOne({ username })
        .then(result => {
            if (!result) {
                res.send({ message: 'User not found.' });
            } else if (result.password === password) {
                const token = jwt.sign({ data: result }, 'MYKEY', { expiresIn: '1h' });
                res.send({ message: 'Login successful.', token, userId: result._id });
            } else {
                res.send({ message: 'Incorrect password.' });
            }
        })
        .catch(() => handleError(res));
};

const likedProducts = (req, res) => {
    Users.findOne({ _id: req.body.userId }).populate('likedProducts')
        .then(result => {
            if (result) {
                res.send({ message: 'Success', products: result.likedProducts });
            } else {
                res.send({ message: 'User not found.' });
            }
        })
        .catch(() => handleError(res));
};

module.exports = {
    likeProducts,
    signup,
    myProfileById,
    getUserById,
    login,
    likedProducts
};
