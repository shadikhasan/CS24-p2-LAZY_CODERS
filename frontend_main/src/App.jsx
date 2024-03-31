import { useState } from 'react'
import Create from './components/Create';
import Login from './components/Login';
import Profile from './components/Profile';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import ResetPassword from './components/ResetPassword';
import Home from './dashboard/Home';
import UseDetails from './dashboard/UserDetails';
import ResetPasswordComponent from './components/ResetPasswordComponent';

function App() {
    const [redirectToProfile, setRedirectToProfile] = useState(false);
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/auth/create' element={<Create/>}></Route>
                <Route path='/auth/login' element={<Login/>}></Route>
                <Route path='/profile' index element={<Profile/>}></Route>
                <Route path='/auth/reset-password' index element={<ResetPassword/>}></Route>
                <Route path='/dashboard' index element={<Home/>}></Route>
                <Route path='/users' index element={<Home/>}></Route>
                <Route path="/users/:id" element={<UseDetails />} />
                <Route path="/auth/reset-password/:id/:token" element={<ResetPasswordComponent/>} />
                <Route path='/*' element={<Profile />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App