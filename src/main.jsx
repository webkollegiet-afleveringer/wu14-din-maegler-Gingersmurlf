import App from './App.jsx'
import Contact from './components/Contact.jsx';
import NotFound from './components/Notfound.jsx';
import Homes from './components/Homes.jsx';
import HomeDetails from './components/HomeDetails.jsx';
import Agents from './components/Agents.jsx';
import AgentDetails from './components/AgentDetails.jsx';
import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import Favorites from './components/Favorites.jsx';
import Main from './html/Main.jsx';

import "./scss/style.scss";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Main />} />
        <Route path="boliger" element={<Homes />} />
        <Route path="bolig/:id" element={<HomeDetails />} />
        <Route path="maeglere" element={<Agents />} />
        <Route path="maegler/:id" element={<AgentDetails />} />
        <Route path="favoritter" element={<Favorites />} />
        <Route path="contact" element={<Contact />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="hov" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>,
);
