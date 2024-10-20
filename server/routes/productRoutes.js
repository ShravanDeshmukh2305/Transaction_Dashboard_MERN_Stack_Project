import express from 'express';
import * as productController from '../controllers/productController.js';

const router = express.Router();

router.post('/initialize-database', productController.initializeDatabase);
router.get('/transactions', productController.listTransactions);
router.get('/statistics', productController.getStatistics);
router.get('/bar-chart', productController.getBarChartData);
router.get('/pie-chart', productController.getPieChartData);
router.get('/combined-data', productController.getCombinedData);

export default router;