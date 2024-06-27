const express = require('express');
const productController = require('../controllers/productController');
const { authenticate, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
        const bearer = header.split(' ');
        const token = bearer[1];

        jwt.verify(token, 'secretKey', (err,decoded) => {
            if(err) {
                console.error('Token verification failed:', err);
                res.sendStatus(403);
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

router.post('/addProduct', checkToken, productController.createProduct);
router.get('/product/:id', checkToken,  productController.getProduct);
router.get('/products', checkToken, productController.getAllProducts);

module.exports = router;
