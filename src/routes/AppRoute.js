import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/home/Home";
import Store from "../components/store/Store";
import ContactUs from "../components/ContactUs/ContactUs";
import CheckOut from "../components/CheckOut/CheckOut";
import About from "../components/About/About";
import Login from '../components/login';
import Register from "../components/register";
import Payment from "../components/Payment/Payment";
import PrivateRoute from "./PrivateRoute";
const AppRoute = () => {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/store"
                    element={
                        <PrivateRoute>
                            <Store />
                        </PrivateRoute>
                    } />
                    <Route
                    path="/contactUs"
                    element={
                        <PrivateRoute>
                            <ContactUs />
                        </PrivateRoute>
                    } />
                    <Route
                    path="/checkOut"
                    element={
                        <PrivateRoute>
                            <CheckOut/>
                        </PrivateRoute>
                    } />
                    <Route
                    path="/about"
                    element={
                        <PrivateRoute>
                            <About />
                        </PrivateRoute>
                    } />
                    <Route
                    path="/payment"
                    element={
                        <PrivateRoute>
                            <Payment />
                        </PrivateRoute>
                    } />
            </Routes>
        </>
    )
}
export default AppRoute;