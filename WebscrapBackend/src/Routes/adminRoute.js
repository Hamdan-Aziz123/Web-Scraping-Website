const express = require('express');
const router = express.Router();

const adminController = require('../Controllers/adminController');

router.post('/addproduct', adminController.addProduct);
router.post('/productsfetch', adminController.ProductsFetch);
router.delete('/deleteproduct', adminController.deleteproduct);
router.get('/EditedProductFetch/:productName', adminController.EditedProductFetch);
router.put('/updateProduct', adminController.updateProduct);
router.get('/OrdersFetch', adminController.OrdersFetch);
router.get('/usersFetch', adminController.usersFetch);
router.post('/MsgsFetch', adminController.MsgsFetch);
router.get('/orderDetailsFetchAdmin/:Oid', adminController.orderDetailsFetchAdmin);
router.get('/orderItemsFetchAdmin/:Oid', adminController.orderItemsFetchAdmin);

module.exports = router;