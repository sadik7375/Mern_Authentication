import {  Routes, Route, useNavigate } from 'react-router-dom';
import './index.css'
import Profile from './components/Profile';
import Password from './components/Password';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Username from './components/Username';
import Reset from './components/Reset';
// import { AuthorizeUser, ProtectRoute } from './middleware/auth'

function App() {


  return (
    <>
    
      <Routes>
        <Route path="/profile" element={<Profile></Profile>} />
        <Route path="/password" element={<Password></Password>} />
        <Route path="/register" element={<Register></Register>} />
        <Route path="/recovery" element={<Recovery></Recovery>} />
        <Route path="/" element={<Username></Username>} />
        <Route path="/reset" element={<Reset></Reset>} />
       
    
      </Routes>
    </>
  )
}

export default App
