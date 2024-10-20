// // import React, { useState, useEffect } from 'react'
// // import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
// // import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
// // import axios from 'axios'


// // const api = axios.create({
// //   baseURL: 'http://localhost:5000/api', // Replace with your actual API base URL
// // })


// // const fetchTransactions = async (month, search, page, perPage) => {
// //   try {
// //     const response = await api.get('/transactions', {
// //       params: { month, search, page, perPage }
// //     })
// //     return response.data
// //   } catch (error) {
// //     console.error('Error fetching transactions:', error)
// //     return { transactions: [], total: 0, page: 1, perPage: 10, totalPages: 1 }
// //   }
// // }

// // const fetchStatistics = async (month) => {
// //   try {
// //     const response = await api.get('/statistics', { params: { month } })
// //     return response.data
// //   } catch (error) {
// //     console.error('Error fetching statistics:', error)
// //     return { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 }
// //   }
// // }

// // const fetchBarChartData = async (month) => {
// //   try {
// //     const response = await api.get('/bar-chart', { params: { month } })
// //     return response.data
// //   } catch (error) {
// //     console.error('Error fetching bar chart data:', error)
// //     return []
// //   }
// // }

// // // Reusable components
// // const SearchInput = ({ value, onChange }) => (
// //   <input
// //     type="text"
// //     placeholder="Search transaction"
// //     className="p-2 rounded-lg border border-gray-300"
// //     value={value}
// //     onChange={(e) => onChange(e.target.value)}
// //   />
// // )

// // const MonthSelector = ({ value, onChange }) => {
// //   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
// //   return (
// //     <div className="relative">
// //       <select
// //         className="appearance-none bg-yellow-400 p-2 pr-8 rounded-lg"
// //         value={value}
// //         onChange={(e) => onChange(e.target.value)}
// //       >
// //         {months.map((m) => (
// //           <option key={m} value={m}>{m}</option>
// //         ))}
// //       </select>
// //       <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
// //     </div>
// //   )
// // }


// // const TransactionTable = ({ transactions }) => (
// //   <div className="overflow-x-auto">
// //     <table className="w-full table-auto">
// //       <thead>
// //         <tr className="bg-yellow-400 text-center">
// //           <th className="p-3">ID</th>
// //           <th className="p-3">Title</th>
// //           <th className="p-3">Description</th>
// //           <th className="p-3">Price</th>
// //           <th className="p-3">Category</th>
// //           <th className="p-3">Sold</th>
// //           <th className="p-3">Image</th>
// //         </tr>
// //       </thead>
// //       <tbody>
// //         {transactions.length > 0 ? (
// //           transactions.map((transaction) => (
// //             <tr key={transaction.id} className="border-b text-left hover:bg-gray-50">
// //               <td className="p-3">{transaction.id}</td>
// //               <td className="p-3">{transaction.title}</td>
// //               <td className="p-3">{transaction.description}</td>
// //               <td className="p-3">${transaction.price}</td>
// //               <td className="p-3">{transaction.category}</td>
// //               <td className="p-3">{transaction.sold ? 'Yes' : 'No'}</td>
// //               <td className="p-3">
// //                 <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded-lg" />
// //               </td>
// //             </tr>
// //           ))
// //         ) : (
// //           <tr>
// //             <td colSpan="7" className="p-3 text-center text-gray-500">No transactions available</td>
// //           </tr>
// //         )}
// //       </tbody>
// //     </table>

// //     <div className="mt-4 text-center">
// //     </div>
// //   </div>
// // );


// // const Pagination = ({ page, totalPages, onPageChange }) => (
// //   <div className="flex justify-between items-center mt-4">
   
// //     <span>Page {page} of {totalPages}</span>

    
// //     <div className="flex space-x-2">
// //       <button
// //         onClick={() => onPageChange(page > 1 ? page - 1 : 1)}
// //         disabled={page === 1}
// //         className="bg-blue-500 text-white p-2 rounded-l-lg disabled:bg-gray-300 flex items-center"
// //       >
// //         <ChevronLeft className="mr-2" />
// //         Prev
// //       </button>

// //       <button
// //         onClick={() => onPageChange(page < totalPages ? page + 1 : totalPages)}
// //         disabled={page === totalPages}
// //         className="bg-blue-500 text-white p-2 rounded-r-lg disabled:bg-gray-300 flex items-center"
// //       >
// //         Next
// //         <ChevronRight className="ml-2" />
// //       </button>
// //     </div>

    
// //     <span className="text-gray-600">Per Page 10</span>
// //   </div>
// // );


// // const StatisticsBox = ({ statistics, month }) => (
// //   <div className="bg-white p-4 rounded-lg shadow">
// //     <h2 className="text-xl font-semibold mb-4">Statistics - {month}</h2>
// //     <div className="bg-yellow-200 p-4 rounded-lg">
// //       <p><strong>Total sales:</strong> ${statistics.totalSalesAmount}</p>
// //       <p><strong>Total sold items:</strong> {statistics.totalSoldItems}</p>
// //       <p><strong>Total unsold items:</strong> {statistics.totalUnsoldItems}</p>
// //     </div>
// //   </div>
// // );


// // const BarChartBox = ({ data, month }) => (
// //   <div className="bg-white p-4 rounded-lg shadow">
// //     <h2 className="text-xl font-semibold mb-4">Bar Chart Stats - {month}</h2>
// //     <ResponsiveContainer width="100%" height={300}>
// //       <BarChart data={data}>
// //         <CartesianGrid strokeDasharray="3 3" />
// //         <XAxis dataKey="range" />
// //         <YAxis />
// //         <Tooltip />
// //         <Bar dataKey="count" fill="#8884d8" />
// //       </BarChart>
// //     </ResponsiveContainer>
// //   </div>
// // )

// // export default function TransactionDashboard() {
// //   const [month, setMonth] = useState('March')
// //   const [search, setSearch] = useState('')
// //   const [page, setPage] = useState(1)
// //   const [perPage] = useState(10)
// //   const [transactions, setTransactions] = useState([])
// //   const [totalPages, setTotalPages] = useState(1)
// //   const [statistics, setStatistics] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 })
// //   const [barChartData, setBarChartData] = useState([])

// //   useEffect(() => {
// //     fetchData()
// //   }, [month, search, page])

// //   const fetchData = async () => {
// //     const transactionData = await fetchTransactions(month, search, page, perPage)
// //     setTransactions(transactionData.transactions)
// //     setTotalPages(transactionData.totalPages)

// //     const statsData = await fetchStatistics(month)
// //     setStatistics(statsData)

// //     const chartData = await fetchBarChartData(month)
// //     setBarChartData(chartData)
// //   }

// //   return (
// //     <div className="container mx-auto p-4 bg-gray-100 min-h-screen">
// //       <h1 className="text-3xl font-bold text-center mb-8">Transaction Dashboard</h1>

// //       <div className="flex justify-between mb-4">
// //         <SearchInput value={search} onChange={setSearch} />
// //         <MonthSelector value={month} onChange={setMonth} />
// //       </div>

// //       <div className="bg-white p-4 rounded-lg shadow mb-8">
// //         <h2 className="text-xl font-semibold mb-4">Transactions</h2>
// //         <TransactionTable transactions={transactions} />
// //         <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
// //       </div>

// //       <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
// //         <StatisticsBox statistics={statistics} month={month} />
// //         <BarChartBox data={barChartData} month={month} />
// //       </div>
// //     </div>
// //   )
// // }




import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import axios from 'axios'


const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with your actual API base URL
})


const fetchTransactions = async (month, year, search, page, perPage) => {
  try {
    const response = await api.get('/transactions', {
      params: { month, year, search, page, perPage }
    })
    return response.data
  } catch (error) {
    console.error('Error fetching transactions:', error)
    return { transactions: [], total: 0, page: 1, perPage: 10, totalPages: 1 }
  }
}

const fetchStatistics = async (month, year) => {
  try {
    const response = await api.get('/statistics', { params: { month, year } })
    return response.data
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return { totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 }
  }
}

const fetchBarChartData = async (month, year) => {
  try {
    const response = await api.get('/bar-chart', { params: { month, year } })
    return response.data
  } catch (error) {
    console.error('Error fetching bar chart data:', error)
    return []
  }
}

// Reusable components
const SearchInput = ({ value, onChange }) => (
  <input
    type="text"
    placeholder="Search transaction"
    className="p-2 rounded-lg border border-gray-300"
    value={value}
    onChange={(e) => onChange(e.target.value)}
  />
)

const MonthSelector = ({ value, onChange }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  
  return (
    <div className="relative">
      <select
        className="appearance-none bg-yellow-400 p-2 pr-8 rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {months.map((m) => (
          <option key={m} value={m}>{m}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

const YearSelector = ({ value, onChange }) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i); // Last 10 years

  return (
    <div className="relative ml-4">
      <select
        className="appearance-none bg-yellow-400 p-2 pr-8 rounded-lg"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" />
    </div>
  )
}

const TransactionTable = ({ transactions }) => (
  <div className="overflow-x-auto">
    <table className="w-full table-auto">
      <thead>
        <tr className="bg-yellow-400 text-center">
          <th className="p-3">ID</th>
          <th className="p-3">Title</th>
          <th className="p-3">Description</th>
          <th className="p-3">Price</th>
          <th className="p-3">Category</th>
          <th className="p-3">Sold</th>
          <th className="p-3">Image</th>
        </tr>
      </thead>
      <tbody>
        {transactions.length > 0 ? (
          transactions.map((transaction) => (
            <tr key={transaction.id} className="border-b text-left hover:bg-gray-50">
              <td className="p-3">{transaction.id}</td>
              <td className="p-3">{transaction.title}</td>
              <td className="p-3">{transaction.description}</td>
              <td className="p-3">${transaction.price}</td>
              <td className="p-3">{transaction.category}</td>
              <td className="p-3">{transaction.sold ? 'Yes' : 'No'}</td>
              <td className="p-3">
                <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded-lg" />
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" className="p-3 text-center text-gray-500">No transactions available</td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);

const Pagination = ({ page, totalPages, onPageChange }) => (
  <div className="flex justify-between items-center mt-4">
    <span>Page {page} of {totalPages}</span>
    <div className="flex space-x-2">
      <button
        onClick={() => onPageChange(page > 1 ? page - 1 : 1)}
        disabled={page === 1}
        className="bg-blue-500 text-white p-2 rounded-l-lg disabled:bg-gray-300 flex items-center"
      >
        <ChevronLeft className="mr-2" />
        Prev
      </button>

      <button
        onClick={() => onPageChange(page < totalPages ? page + 1 : totalPages)}
        disabled={page === totalPages}
        className="bg-blue-500 text-white p-2 rounded-r-lg disabled:bg-gray-300 flex items-center"
      >
        Next
        <ChevronRight className="ml-2" />
      </button>
    </div>
    <span className="text-gray-600">Per Page 10</span>
  </div>
);


const StatisticsCard = ({ title, value }) => (
  <div className="bg-yellow-100 p-4 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-xl font-bold text-gray-800 mt-2">{value}</p>
  </div>
);

const StatisticsBox = ({ statistics, month, year }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Statistics - {month} {year}</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatisticsCard 
        title="Total Sales" 
        value={`$${statistics?.totalSalesAmount || 0}`}  // Use totalSalesAmount from backend
      />
      <StatisticsCard 
        title="Total Sold Items" 
        value={statistics?.totalSoldItems ?? 0}  // Fallback to 0 if totalSoldItems is undefined
      />
      <StatisticsCard 
        title="Total Unsold Items" 
        value={statistics?.totalUnsoldItems ?? 0}  // Use totalUnsoldItems from backend
      />
    </div>
  </div>
);


const BarChartBox = ({ data, month, year }) => (
  <div className="bg-white p-4 rounded-lg shadow">
    <h2 className="text-xl font-semibold mb-4">Bar Chart Stats - {month} {year}</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="range" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
)


export default function TransactionDashboard() {
  const [month, setMonth] = useState('March');
  const [year, setYear] = useState(new Date().getFullYear()); // Set initial year to current year
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [transactions, setTransactions] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [statistics, setStatistics] = useState({ totalSaleAmount: 0, totalSoldItems: 0, totalNotSoldItems: 0 });
  const [barChartData, setBarChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [month, year, search, page]);

  const fetchData = async () => {
    const transactionData = await fetchTransactions(month, year, search, page, perPage);
    setTransactions(transactionData.transactions);
    setTotalPages(transactionData.totalPages);

    const statsData = await fetchStatistics(month, year);
    setStatistics(statsData);

    const chartData = await fetchBarChartData(month, year);
    setBarChartData(chartData);
  };

  return (
    
    <div>
      <p>Shravan Deshmukh</p>
      <h1 className="text-2xl font-bold mb-4">Transaction Dashboard</h1>
      
      <div className="flex justify-between mb-4">
  <SearchInput value={search} onChange={setSearch} />
  <div className="flex items-center ml-auto">
    <MonthSelector value={month} onChange={setMonth} />
    <YearSelector value={year} onChange={setYear} className="ml-4" />
  </div>
</div>


      {/* Transaction Table should be placed first */}
      <TransactionTable transactions={transactions} />
      
      {/* Pagination below Transaction Table */}
      <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />

      {/* Then Statistics Box */}
      <StatisticsBox statistics={statistics} month={month} year={year} />
      
      {/* Finally Bar Chart Box */}
      <BarChartBox data={barChartData} month={month} year={year} />

            {/* Batch Info */}
      <div className="bottom-4 left-4 text-gray-600 text-sm text-left">
        <h4 className='font-bold'>Developed by Shravan Deshmukh</h4>
        <h4>shravandeshmukh2305@gmail.com</h4> 
      </div>
    </div>
  );
}


