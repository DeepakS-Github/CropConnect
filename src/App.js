import './App.css'
import CropPredictor from './components/CropPredictor'
import SoilNutrients from './components/SoilNutrients'
import HomePage from './components/HomePage'
import InsecticidePredictor from './components/InsecticidePredictor'
import ItemBoard from './components/ItemBoard'
import ItemTable from './components/ItemTable'

import{
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import FarmerDashboard from './components/FarmerDashboard'
import Navbar from './components/Navbar'
import SellerSignUpPage from './components/SellerSignUpPage'
import UserSignUpPage from './components/UserSignUpPage'
import CropGrowingSteps from './components/CropGrowingSteps'
import Footer from './components/Footer'
import Weather from './components/Weather'


export default function App() {
  return (
      
    <Router>
        <Navbar/>
      <Routes>
        <Route exact path="/" element={<HomePage/>} />
        <Route exact path="/croppredictor" element={<CropPredictor/>} />
        <Route exact path="/itemtable/:category" element={<ItemTable/>} />
        <Route exact path="/insecticidepredictor" element={<InsecticidePredictor/>} />
        <Route exact path="/cropgrowingsteps" element={<CropGrowingSteps/>} />
        <Route exact path="/itemboard/:itemData" element={<ItemBoard/>} />
        <Route exact path="/farmerdashboard" element={<FarmerDashboard/>} />
        <Route exact path="/sellersignup" element={<SellerSignUpPage/>} />
        <Route exact path="/usersignup" element={<UserSignUpPage/>} />
        <Route exact path="/infoweather" element={<Weather/>} />
        <Route exact path="/soilnutrientpredictor" element={<SoilNutrients/>} />
      </Routes>
      <Footer/>
    </Router>
  )
}
