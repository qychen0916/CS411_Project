import { Routes, Route } from "react-router-dom";
import axios from 'axios';

import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";

// instead of accessing our api like this: axios.get('http://localhost:5000/users')
// this allows us to do this: axios.get('/users')
axios.defaults.baseURL = 'http://localhost:5000';

const App = () => {
  return (
    <Routes>
      <Route element={<MainLayout/>}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Route>
    </Routes>
  );
}

export default App;
