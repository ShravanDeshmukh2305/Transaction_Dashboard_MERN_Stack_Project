import axios from 'axios';
import moment from 'moment';
import Product from '../models/Product.js';

const API_URL = 'https://s3.amazonaws.com/roxiler.com/product_transaction.json';

export const initializeDatabase = async () => {
  const response = await axios.get(API_URL);
  const products = response.data;
  await Product.deleteMany({});
  await Product.insertMany(products);
};

export const listTransactions = async (month, year, search, page, perPage) => {
  const query = {};
  
  // Handle date filtering
  if (month && year) {
    const startDate = moment().utc().year(year).month(month).startOf('month').toDate();
    const endDate = moment().utc().year(year).month(month).endOf('month').toDate();
    query.dateOfSale = { $gte: startDate, $lte: endDate };
  }

  // Handle search filtering
  if (search) {
    query.$or = [
      { title: { $regex: search, $options: 'i' } },
      { description: { $regex: search, $options: 'i' } },
      { price: parseFloat(search) || 0 }
    ];
  }

  // Paginate results
  const total = await Product.countDocuments(query);
  const transactions = await Product.find(query)
    .skip((page - 1) * perPage)
    .limit(perPage);

  return {
    transactions,
    total,
    page: parseInt(page),
    perPage: parseInt(perPage),
    totalPages: Math.ceil(total / perPage)
  };
};


export const getStatistics = async (month, year) => {
  const query = month && year ? {
    dateOfSale: {
      $gte: moment().utc().year(year).month(month).startOf("month").toDate(),
      $lte: moment().utc().year(year).month(month).endOf("month").toDate(),
    },
  } : {};

  console.log("Query used for date range:", query); // Debugging line

  // Calculate total sales amount
  const totalSales = await Product.aggregate([
    { $match: { ...query, sold: true } },
    { $group: { _id: null, totalSalesAmount: { $sum: "$price" } } },
    { $project: { _id: 0, totalSalesAmount: 1 } },
  ]);

  console.log("Total sales query result:", totalSales); // Debugging line

  // Calculate total sold items count
  const totalSoldItems = await Product.countDocuments({
    ...query,
    sold: true,
  });

  console.log("Total sold items count:", totalSoldItems); // Debugging line

  // Calculate total unsold items count
  const totalUnsoldItems = await Product.countDocuments({
    ...query,
    sold: false,
  });

  console.log("Total unsold items count:", totalUnsoldItems); // Debugging line

  // Calculate average sales price
  const averageSales = await Product.aggregate([
    { $match: { ...query, sold: true } },
    { $group: { _id: null, averagePrice: { $avg: "$price" } } },
    { $project: { _id: 0, averagePrice: 1 } },
  ]);

  console.log("Average sales query result:", averageSales); // Debugging line

  return {
    totalSalesAmount: totalSales.length > 0 ? totalSales[0].totalSalesAmount : 0,
    totalSoldItems,
    totalUnsoldItems,
    averagePrice: averageSales.length > 0 ? averageSales[0].averagePrice : 0,
  };
};





export const getBarChartData = async (month, year) => {
  const query = month && year ? {
    dateOfSale: {
      $gte: moment().utc().year(year).month(month).startOf('month').toDate(),
      $lte: moment().utc().year(year).month(month).endOf('month').toDate()
    }
  } : {};

  const ranges = [
    { min: 0, max: 100 },
    { min: 101, max: 200 },
    { min: 201, max: 300 },
    { min: 301, max: 400 },
    { min: 401, max: 500 },
    { min: 501, max: 600 },
    { min: 601, max: 700 },
    { min: 701, max: 800 },
    { min: 801, max: 900 },
    { min: 901, max: Infinity }
  ];

  const barChartData = await Promise.all(
    ranges.map(async ({ min, max }) => {
      const count = await Product.countDocuments({
        ...query,
        price: { $gte: min, $lt: max === Infinity ? max : max + 1 }
      });
      return { range: `${min} - ${max === Infinity ? 'above' : max}`, count };
    })
  );

  return barChartData;
};

export const getPieChartData = async (month, year) => {
  const query = month && year ? {
    dateOfSale: {
      $gte: moment().utc().year(year).month(month).startOf('month').toDate(),
      $lte: moment().utc().year(year).month(month).endOf('month').toDate()
    }
  } : {};

  const pieChartData = await Product.aggregate([
    { $match: query },
    { $group: { _id: '$category', count: { $sum: 1 } } },
    { $project: { category: '$_id', count: 1, _id: 0 } }
  ]);

  return pieChartData;
};

export const getCombinedData = async (month, year) => {
  const [transactions, statistics, barChartData, pieChartData] = await Promise.all([
    listTransactions(month, year, '', 1, 10),
    getStatistics(month, year),
    getBarChartData(month, year),
    getPieChartData(month, year)
  ]);

  return {
    transactions,
    statistics,
    barChartData,
    pieChartData
  };
};
