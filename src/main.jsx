import App from './App.jsx'
import Contact from './components/Contact.jsx';
import NotFound from './components/Notfound.jsx';

import "./scss/style.scss";

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
);
