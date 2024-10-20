import * as productService from '../services/productService.js';

export const initializeDatabase = async (req, res) => {
  try {
    await productService.initializeDatabase();
    res.status(200).json({ message: 'Database initialized successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const listTransactions = async (req, res) => {
  try {
    const { month, year, search, page = 1, perPage = 2 } = req.query;
    const transactions = await productService.listTransactions(month, year, search, page, perPage);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getStatistics = async (req, res) => {
  try {
    const { month, year } = req.query;
    const statistics = await productService.getStatistics(month, year);
    res.status(200).json(statistics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getBarChartData = async (req, res) => {
  try {
    const { month, year } = req.query;
    const barChartData = await productService.getBarChartData(month, year);
    res.status(200).json(barChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getPieChartData = async (req, res) => {
  try {
    const { month, year } = req.query;
    const pieChartData = await productService.getPieChartData(month, year);
    res.status(200).json(pieChartData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getCombinedData = async (req, res) => {
  try {
    const { month, year } = req.query;
    const combinedData = await productService.getCombinedData(month, year);
    res.status(200).json(combinedData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
