import "./App.css";
import Navbar from "./components/Navbar";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Units from "./pages/Unit";
import Collages from "./pages/Colleges";
import Product from "./pages/Product";
import Amount from "./pages/Amount";
import Courses from "./pages/Courses";
import GetCourses from "./pages/GetCources";
import Test from "./pages/test";
import CourseChoose from "./pages/CoursesChoose";
import Login from "./components/Login";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" />
          <Route path="/login" />
          <Route path="/masterLogin" element={<Login />} />

          <Route path="/units" element={<Units />} />
          <Route path="/collages" element={<Collages />} />
          <Route path="/profile" />
          <Route path="/Amount" element={<Amount />} />
          <Route path="/GetCourse" element={<GetCourses />} />
          <Route path="/CourseChoose" element={<CourseChoose />} />
          <Route path="/master" element={<Courses />} />

          <Route path="/Course" element={<Courses />} />
          <Route path="/Products" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
