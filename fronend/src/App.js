import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Login from "./components/Login";
import Units from "./pages/Unit";
import Collages from "./pages/Colleges";
import Product from "./pages/Product";
import Amount from "./pages/Amount";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/login" />

          <Route path="/units" element={<Units />} />
          <Route path="/collages" element={<Collages />} />
          <Route path="/profile" />
          <Route path="/Amount" element={<Amount />} />

          <Route path="/Products" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
