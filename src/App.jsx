import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './page/Home/Home'
import NavBar from './Util/Navbar'
import TourListPage1 from './page/ProductPage/TourListPage'
import ProductDetails from './page/ProductDetails/ProductDetails'
import Cart from './page/Cart/Cart'
import Order from './page/Order/Order'
import PackagePrinting from './page/package/PackageDetails'
import PrintingPage from './page/PrintingPage/Printing'
import CustomOrder from './page/CustomOrder/CustomOrder'
import Chat from './page/chat/chat'
import Login from './page/auth/Login/Login'
import DashboardHome from './page/dashbord/Home/DashboardHome'
import InsertPrinter from './page/dashbord/Addtion/printer/InsertPrinter'
import InsertProduct from './page/dashbord/Addtion/product/InsertProduct'
import AdminChat from './page/dashbord/Admin/admin'
import OrderDetails from './page/dashbord/Order/OrderDetails'
import PackgeDashboead from './page/dashbord/Package/PackgeDashboead'
import Footer from './Util/Footer'
import { Outlet } from 'react-router-dom'
import PackageDetails from './page/dashbord/PackageDetails/PackageDetails'
import './App.css'
import AllProduct from './page/dashbord/AllProduct/AllProduct'
import AllPrinter from './page/dashbord/AllPrinter/AllPrinter'
import Tsamks from './Util/Loading'
const MainLayout = () => (
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex-grow">
      <Outlet /> 
    </div>
    <Footer />
  </div>
)

const AdminLayout = () => (
  
  <div className="flex flex-col min-h-screen">
    <NavBar />
    <div className="flex-grow">
      <Outlet />
    </div>
 
  </div>
)

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Website Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="product" element={<TourListPage1 />} />
          <Route path="printing" element={<PrintingPage />} />
          <Route path="cart" element={<Cart />} />
          <Route path="product/:id" element={<ProductDetails />} />
          <Route path="order" element={<Order />} />
          <Route path="package/:id" element={<PackagePrinting />} />
          <Route path="customprinting" element={<CustomOrder />} />
          <Route path="chat" element={<Chat />} />
        </Route>

        {/* Admin Layout */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Login />} />
          <Route path="home" element={<DashboardHome />} />
          <Route path="printer" element={<InsertPrinter />} />
          <Route path="product" element={<InsertProduct />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="order/:id" element={<OrderDetails />} />
          <Route path="package" element={<PackgeDashboead />} />
          <Route path="package/:id" element={<PackageDetails />} />
          <Route path="showproduct" element={<AllProduct />} />
          <Route path="showprinter" element={<AllPrinter />} />
 
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
