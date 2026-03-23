import App from './App.jsx'
import NotFound from './components/Notfound.jsx';

import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>,
);
