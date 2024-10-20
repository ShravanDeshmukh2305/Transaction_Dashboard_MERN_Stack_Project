// import React, { useState, useEffect } from 'react'
// import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts'
// import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

// const API_URL = 'http://localhost:5000/api'

// const fetchData = async (endpoint, params = {}) => {
//   const queryString = new URLSearchParams(params).toString()
//   const response = await fetch(`${API_URL}/${endpoint}?${queryString}`)
//   if (!response.ok) throw new Error('Network response was not ok')
//   return response.json()
// }

// const Navbar = ({ activeTab, setActiveTab, selectedMonth, setSelectedMonth }) => {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <div className="text-2xl font-bold">Dashboard</div>
//       <div className="space-x-4">
//         <button 
//           className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-700' : ''}`}
//           onClick={() => setActiveTab('transactions')}
//         >
//           Transactions
//         </button>
//         <button 
//           className={`px-4 py-2 rounded ${activeTab === 'stats' ? 'bg-blue-700' : ''}`}
//           onClick={() => setActiveTab('stats')}
//         >
//           Stats
//         </button>
//       </div>
//       <div className="relative">
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="appearance-none bg-white text-blue-600 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//         >
//           {months.map(month => (
//             <option key={month} value={month}>{month}</option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
//           <ChevronDown size={20} />
//         </div>
//       </div>
//     </nav>
//   )
// }

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md">
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// )

// const StatsView = ({ selectedMonth }) => {
//   const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalUnsoldItems: 0 })
//   const [barChartData, setBarChartData] = useState([])
//   const [pieChartData, setPieChartData] = useState([])

//   useEffect(() => {
//     const fetchStats = async () => {
//       const statsData = await fetchData('statistics', { month: selectedMonth })
//       setStats(statsData)

//       const barData = await fetchData('bar-chart', { month: selectedMonth })
//       setBarChartData(barData)

//       const pieData = await fetchData('pie-chart', { month: selectedMonth })
//       setPieChartData(Object.entries(pieData).map(([name, value]) => ({ name, value })))
//     }
//     fetchStats()
//   }, [selectedMonth])

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Stats for {selectedMonth}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StatCard title="Total Sale" value={`₹${stats.totalSale.toFixed(2)}`} />
//         <StatCard title="Total Sold Items" value={stats.totalSoldItems} />
//         <StatCard title="Total Unsold Items" value={stats.totalUnsoldItems} />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Products per Price Range</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barChartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="range" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#3B82F6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Category Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieChartData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {pieChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   )
// }

// const TransactionsView = ({ selectedMonth }) => {
//   const [transactions, setTransactions] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       const data = await fetchData('transactions', { 
//         month: selectedMonth, 
//         search: searchTerm,
//         page: currentPage,
//         perPage: 10
//       })
//       setTransactions(data.transactions)
//       setTotalPages(data.totalPages)
//     }
//     fetchTransactions()
//   }, [selectedMonth, searchTerm, currentPage])

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Transactions for {selectedMonth}</h2>
//       <div className="mb-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search transactions"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md pr-10"
//           />
//           <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="py-2 px-4 text-left">#</th>
//               <th className="py-2 px-4 text-left">Title</th>
//               <th className="py-2 px-4 text-left">Price</th>
//               <th className="py-2 px-4 text-left">Description</th>
//               <th className="py-2 px-4 text-left">Category</th>
//               <th className="py-2 px-4 text-left">Sold</th>
//               <th className="py-2 px-4 text-left">Date</th>
//               <th className="py-2 px-4 text-left">Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction) => (
//               <tr key={transaction.id} className="border-b hover:bg-gray-100">
//                 <td className="py-2 px-4">{transaction.id}</td>
//                 <td className="py-2 px-4">{transaction.title}</td>
//                 <td className="py-2 px-4">₹{transaction.price.toFixed(2)}</td>
//                 <td className="py-2 px-4">{transaction.description}</td>
//                 <td className="py-2 px-4">{transaction.category}</td>
//                 <td className="py-2 px-4">{transaction.sold ? 'Yes' : 'No'}</td>
//                 <td className="py-2 px-4">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
//                 <td className="py-2 px-4">
//                   <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-between items-center">
//         <span>Page {currentPage} of {totalPages}</span>
//         <div className="space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('transactions')
//   const [selectedMonth, setSelectedMonth] = useState('March')

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar 
//         activeTab={activeTab} 
//         setActiveTab={setActiveTab}
//         selectedMonth={selectedMonth}
//         setSelectedMonth={setSelectedMonth}
//       />
//       {activeTab === 'transactions' ? (
//         <TransactionsView selectedMonth={selectedMonth} />
//       ) : (
//         <StatsView selectedMonth={selectedMonth} />
//       )}
//       <footer className="bg-white p-4 text-center text-gray-600">
//         Created by Shravan Deshmukh
//       </footer>
//     </div>
//   )
// }










// import React, { useState, useEffect } from 'react'
// import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts'
// import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

// const API_URL = 'http://localhost:5000/api'

// const fetchData = async (endpoint, params = {}) => {
//   try {
//     const queryString = new URLSearchParams(params).toString()
//     const response = await fetch(`${API_URL}/${endpoint}?${queryString}`)
//     if (!response.ok) throw new Error('Network response was not ok')
//     return response.json()
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     return null
//   }
// }

// const Navbar = ({ activeTab, setActiveTab, selectedMonth, setSelectedMonth }) => {
//   const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

//   return (
//     <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
//       <div className="text-2xl font-bold">Dashboard</div>
//       <div className="space-x-4">
//         <button 
//           className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-700' : ''}`}
//           onClick={() => setActiveTab('transactions')}
//         >
//           Transactions
//         </button>
//         <button 
//           className={`px-4 py-2 rounded ${activeTab === 'stats' ? 'bg-blue-700' : ''}`}
//           onClick={() => setActiveTab('stats')}
//         >
//           Stats
//         </button>
//       </div>
//       <div className="relative">
//         <select
//           value={selectedMonth}
//           onChange={(e) => setSelectedMonth(e.target.value)}
//           className="appearance-none bg-white text-blue-600 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
//         >
//           {months.map(month => (
//             <option key={month} value={month}>{month}</option>
//           ))}
//         </select>
//         <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
//           <ChevronDown size={20} />
//         </div>
//       </div>
//     </nav>
//   )
// }

// const StatCard = ({ title, value }) => (
//   <div className="bg-white p-6 rounded-lg shadow-md">
//     <h3 className="text-xl font-semibold mb-2">{title}</h3>
//     <p className="text-3xl font-bold">{value}</p>
//   </div>
// )

// const StatsView = ({ selectedMonth }) => {
//   const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalUnsoldItems: 0 })
//   const [barChartData, setBarChartData] = useState([])
//   const [pieChartData, setPieChartData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchStats = async () => {
//       setLoading(true)
//       setError(null)

//       try {
//         const statsData = await fetchData('statistics', { month: selectedMonth })
//         if (statsData) setStats(statsData)

//         const barData = await fetchData('bar-chart', { month: selectedMonth })
//         if (barData) setBarChartData(barData)

//         const pieData = await fetchData('pie-chart', { month: selectedMonth })
//         if (pieData) setPieChartData(Object.entries(pieData).map(([name, value]) => ({ name, value })))
//       } catch (err) {
//         setError('Failed to fetch stats data. Please try again later.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStats()
//   }, [selectedMonth])

//   if (loading) return <div className="p-6 text-center">Loading stats...</div>
//   if (error) return <div className="p-6 text-center text-red-500">{error}</div>

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Stats for {selectedMonth}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StatCard title="Total Sale" value={`₹${stats.totalSale.toFixed(2)}`} />
//         <StatCard title="Total Sold Items" value={stats.totalSoldItems} />
//         <StatCard title="Total Unsold Items" value={stats.totalUnsoldItems} />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Products per Price Range</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barChartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="range" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#3B82F6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Category Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieChartData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {pieChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   )
// }

// const TransactionsView = ({ selectedMonth }) => {
//   const [transactions, setTransactions] = useState([])
//   const [searchTerm, setSearchTerm] = useState('')
//   const [currentPage, setCurrentPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchTransactions = async () => {
//       setLoading(true)
//       setError(null)

//       try {
//         const data = await fetchData('transactions', { 
//           month: selectedMonth, 
//           search: searchTerm,
//           page: currentPage,
//           perPage: 10
//         })
//         if (data) {
//           setTransactions(data.transactions)
//           setTotalPages(data.totalPages)
//         }
//       } catch (err) {
//         setError('Failed to fetch transactions. Please try again later.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchTransactions()
//   }, [selectedMonth, searchTerm, currentPage])

//   if (loading) return <div className="p-6 text-center">Loading transactions...</div>
//   if (error) return <div className="p-6 text-center text-red-500">{error}</div>

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Transactions for {selectedMonth}</h2>
//       <div className="mb-4">
//         <div className="relative">
//           <input
//             type="text"
//             placeholder="Search transactions"
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="w-full px-4 py-2 border rounded-md pr-10"
//           />
//           <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full bg-white">
//           <thead className="bg-blue-500 text-white">
//             <tr>
//               <th className="py-2 px-4 text-left">#</th>
//               <th className="py-2 px-4 text-left">Title</th>
//               <th className="py-2 px-4 text-left">Price</th>
//               <th className="py-2 px-4 text-left">Description</th>
//               <th className="py-2 px-4 text-left">Category</th>
//               <th className="py-2 px-4 text-left">Sold</th>
//               <th className="py-2 px-4 text-left">Date</th>
//               <th className="py-2 px-4 text-left">Image</th>
//             </tr>
//           </thead>
//           <tbody>
//             {transactions.map((transaction) => (
//               <tr key={transaction.id} className="border-b hover:bg-gray-100">
//                 <td className="py-2 px-4">{transaction.id}</td>
//                 <td className="py-2 px-4">{transaction.title}</td>
//                 <td className="py-2 px-4">₹{transaction.price.toFixed(2)}</td>
//                 <td className="py-2 px-4">{transaction.description}</td>
//                 <td className="py-2 px-4">{transaction.category}</td>
//                 <td className="py-2 px-4">{transaction.sold ? 'Yes' : 'No'}</td>
//                 <td className="py-2 px-4">{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
//                 <td className="py-2 px-4">
//                   <img src={transaction.image} alt={transaction.title} className="w-16 h-16 object-cover rounded" />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <div className="mt-4 flex justify-between items-center">
//         <span>Page {currentPage} of {totalPages}</span>
//         <div className="space-x-2">
//           <button
//             onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <button
//             onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//             disabled={currentPage === totalPages}
//             className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
//           >
//             <ChevronRight size={20} />
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default function Dashboard() {
//   const [activeTab, setActiveTab] = useState('transactions')
//   const [selectedMonth, setSelectedMonth] = useState('March')

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <Navbar 
//         activeTab={activeTab} 
//         setActiveTab={setActiveTab}
//         selectedMonth={selectedMonth}
//         setSelectedMonth={setSelectedMonth}
//       />
//       {activeTab === 'transactions' ? (
//         <TransactionsView selectedMonth={selectedMonth} />
//       ) : (
//         <StatsView selectedMonth={selectedMonth} />
//       )}
//       <footer className="bg-white p-4 text-center text-gray-600">
//         Created by Shravan Deshmukh
//       </footer>
//     </div>
//   )
// }






import React, { useState, useEffect } from 'react'
import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Pie, PieChart, Cell } from 'recharts'
import { Search, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

const API_URL = 'http://localhost:5000/api'

// Function to fetch data from API
const fetchData = async (endpoint, params = {}) => {
  const queryString = new URLSearchParams(params).toString()
  const response = await fetch(`${API_URL}/${endpoint}?${queryString}`)
  if (!response.ok) throw new Error('Network response was not ok')
  return response.json()
}

// Navbar component
const Navbar = ({ activeTab, setActiveTab, selectedMonth, setSelectedMonth }) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <div className="text-2xl font-bold">Dashboard</div>
      <div className="space-x-4">
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'transactions' ? 'bg-blue-700' : ''}`}
          onClick={() => setActiveTab('transactions')}
        >
          Transactions
        </button>
        <button 
          className={`px-4 py-2 rounded ${activeTab === 'stats' ? 'bg-blue-700' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
      </div>
      <div className="relative">
        <select
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="appearance-none bg-white text-blue-600 px-4 py-2 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
        >
          {months.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-blue-600">
          <ChevronDown size={20} />
        </div>
      </div>
    </nav>
  )
}

// StatCard component
const StatCard = ({ title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p className="text-3xl font-bold">{value}</p>
  </div>
)

// StatsView component
// const StatsView = ({ selectedMonth }) => {
//   const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalUnsoldItems: 0 })
//   const [barChartData, setBarChartData] = useState([])
//   const [pieChartData, setPieChartData] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchStats = async () => {
//       setLoading(true)
//       setError(null)

//       try {
//         // Fetch statistics data
//         const statsData = await fetchData('statistics', { month: selectedMonth })
//         if (statsData) setStats(statsData)

//         // Fetch bar chart data
//         const barData = await fetchData('bar-chart', { month: selectedMonth })
//         if (barData) setBarChartData(barData)

//         // Fetch pie chart data
//         const pieData = await fetchData('pie-chart', { month: selectedMonth })
//         if (pieData) setPieChartData(Object.entries(pieData).map(([name, value]) => ({ name, value })))
//       } catch (err) {
//         setError('Failed to fetch stats data. Please try again later.')
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchStats()
//   }, [selectedMonth])

//   if (loading) return <div className="p-6 text-center">Loading stats...</div>
//   if (error) return <div className="p-6 text-center text-red-500">{error}</div>

//   return (
//     <div className="p-6">
//       <h2 className="text-2xl font-bold mb-6">Stats for {selectedMonth}</h2>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
//         <StatCard title="Total Sale" value={`₹${stats.totalSale.toFixed(2)}`} />
//         <StatCard title="Total Sold Items" value={stats.totalSoldItems} />
//         <StatCard title="Total Unsold Items" value={stats.totalUnsoldItems} />
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Products per Price Range</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <BarChart data={barChartData}>
//               <CartesianGrid strokeDasharray="3 3" />
//               <XAxis dataKey="range" />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey="count" fill="#3B82F6" />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>
//         <div className="bg-white p-6 rounded-lg shadow-md">
//           <h3 className="text-xl font-semibold mb-4">Category Distribution</h3>
//           <ResponsiveContainer width="100%" height={300}>
//             <PieChart>
//               <Pie
//                 data={pieChartData}
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={80}
//                 fill="#8884d8"
//                 dataKey="value"
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//               >
//                 {pieChartData.map((entry, index) => (
//                   <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 60%)`} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>
//     </div>
//   )
// }


const StatsView = ({ selectedMonth }) => {
    const [stats, setStats] = useState({ totalSale: 0, totalSoldItems: 0, totalUnsoldItems: 0 });
    const [barChartData, setBarChartData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
  
    // Fetch data when selectedMonth changes
    useEffect(() => {
      const fetchStats = async () => {
        setLoading(true);
        setError(null);
  
        try {
          // Fetch statistics data
          const statsData = await fetchData('statistics', { month: selectedMonth });
          if (statsData) setStats(statsData);
  
          // Fetch bar chart data
          const barData = await fetchData('bar-chart', { month: selectedMonth });
          if (barData) setBarChartData(barData);
  
          // Fetch pie chart data
          const pieData = await fetchData('pie-chart', { month: selectedMonth });
          if (pieData) {
            setPieChartData(Object.entries(pieData).map(([name, value]) => ({ name, value })));
          }
        } catch (err) {
          setError('Failed to fetch stats data. Please try again later.');
        } finally {
          setLoading(false);
        }
      };
  
      fetchStats();
    }, [selectedMonth]);
  
    // Loading and error handling
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    // No data available case
    if (!stats || !barChartData.length || !pieChartData.length) {
      return <div>No data available for {selectedMonth}</div>;
    }
  
    // Rendering the stats and charts
    return (
      <div>
        <h1>Stats for {selectedMonth}</h1>
        <div>
          <div>Total Sale: {stats.totalSale}</div>
          <div>Total Sold Items: {stats.totalSoldItems}</div>
          <div>Total Unsold Items: {stats.totalUnsoldItems}</div>
        </div>
  
        {/* Bar Chart */}
        <div>
          <h2>Bar Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barChartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="range" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
  
        {/* Pie Chart */}
        <div>
          <h2>Pie Chart</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieChartData}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={`hsl(${index * 60}, 70%, 50%)`} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };
  

// TransactionsView component
const TransactionsView = ({ selectedMonth }) => {
  const [transactions, setTransactions] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true)
      setError(null)

      try {
        // Fetch transaction data
        const data = await fetchData('transactions', { 
          month: selectedMonth, 
          search: searchTerm,
          page: currentPage,
          perPage: 10
        })
        if (data) {
          setTransactions(data.transactions)
          setTotalPages(data.totalPages)
        }
      } catch (err) {
        setError('Failed to fetch transactions. Please try again later.')
      } finally {
        setLoading(false)
      }
    }

    fetchTransactions()
  }, [selectedMonth, searchTerm, currentPage])

  if (loading) return <div className="p-6 text-center">Loading transactions...</div>
  if (error) return <div className="p-6 text-center text-red-500">{error}</div>

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Transactions for {selectedMonth}</h2>
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search transactions"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-md pr-10"
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="py-2 px-4 text-left">#</th>
              <th className="py-2 px-4 text-left">Title</th>
              <th className="py-2 px-4 text-left">Price</th>
              <th className="py-2 px-4 text-left">Description</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Sold</th>
              <th className="py-2 px-4 text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={transaction.id} className={index % 2 === 0 ? 'bg-gray-100' : ''}>
                <td className="py-2 px-4">{transaction.id}</td>
                <td className="py-2 px-4">{transaction.title}</td>
                <td className="py-2 px-4">₹{transaction.price}</td>
                <td className="py-2 px-4">{transaction.description}</td>
                <td className="py-2 px-4">{transaction.category}</td>
                <td className="py-2 px-4">{transaction.sold ? 'Yes' : 'No'}</td>
                <td className="py-2 px-4">{new Date(transaction.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          <ChevronLeft size={20} />
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  )
}

// Main Dashboard component
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('transactions')
  const [selectedMonth, setSelectedMonth] = useState('January')

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth} />
      {activeTab === 'transactions' ? (
        <TransactionsView selectedMonth={selectedMonth} />
      ) : (
        <StatsView selectedMonth={selectedMonth} />
      )}
    </div>
  )
}

export default Dashboard
