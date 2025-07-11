// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Login } from './Layout/Login';
import { Register } from './Layout/register';
import { Home } from './pages/home';
import { Flat } from './pages/flat';
import FlatUserForm from './pages/FlatUser';
import VisitorPage from './pages/visitor';
import { Complaint } from './pages/complaint';
import NoticePage from './pages/notice';
import MaintenancePage from './pages/Maintaince';
import SocietyPage from './pages/society';
import AmenityPage from './pages/amenity';
import TransactionPage from './pages/transaction';
import ParkingPage from './pages/parking';
import Layout from './Components/layout';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes (with Sidebar + Header) */}
        <Route element={<Layout/>}>
          <Route path="/userDetails" element={<Home />} />
          <Route path="/flatDetails" element={<Flat />} />
          <Route path="/flatUser" element={<FlatUserForm />} />
          <Route path="/visitor" element={<VisitorPage />} />
          <Route path="/complaint" element={<Complaint />} />
          <Route path="/notice" element={<NoticePage />} />
          <Route path="/maintenance" element={<MaintenancePage />} />
          <Route path="/society" element={<SocietyPage />} />
          <Route path="/amenity" element={<AmenityPage />} />
          <Route path="/transaction" element={<TransactionPage />} />
          <Route path="/parking" element={<ParkingPage />} />
          <Route path="/flatUser" element={<FlatUserForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
