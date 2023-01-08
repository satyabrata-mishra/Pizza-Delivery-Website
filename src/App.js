import './App.css';
import UserRegistration from './Pages/UserRegistration';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserLogin from './Pages/UserLogin';
import EmailVerified from './Pages/EmailVerified';
import AllPizzas from './Pages/AllPizzas';
import MyCart from './Pages/MyCart';
import MyOrders from './Pages/MyOrders';
import Customize from './Pages/Customize';
import AdminPage from './Pages/AdminPage';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserRegistration />} />
        <Route path="/login" element={<UserLogin />} />
        <Route path="/emailverified" element={<EmailVerified />} />
        <Route path="/custompizzas" element={<Customize />} />
        <Route path="/mycart" element={<MyCart />} />
        <Route path="/myorders" element={<MyOrders />} />
        <Route path="/allpizzas" element={<AllPizzas />} />
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
