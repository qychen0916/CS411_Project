import { Routes, Route } from "react-router-dom";
import axios from 'axios';

import MainLayout from "./components/MainLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Albums from "./pages/Albums"

// instead of accessing our api like this: axios.get('http://localhost:5000/users')
// this allows us to do this: axios.get('/users')
axios.defaults.baseURL = 'http://localhost:5000';

// handles routes (i.e. pages in our app)
const App = () => {
  return (
    <Routes>
      {/* MainLayout is applied to everything inside of it */}
      <Route element={<MainLayout/>}>
        <Route index element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/albums" element={<Albums />} />
      </Route>
    </Routes>
  );
}

export default App;
