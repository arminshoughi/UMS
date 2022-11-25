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
import CourseChoose from "./pages/CoursesChoose";
import Login from "./components/Login";
import AllCourses from "./pages/AllCourses";
import MasterCourse from "./pages/masterCourse";
import Welcome from "./pages/Welcome";
import Callender from "./pages/Home";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Callender />} />
          <Route path="/login" />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/welcomemaster" element={<Welcome />} />

          <Route path="/masterLogin" element={<Login />} />
          <Route path="/units" element={<Units />} />
          <Route path="/collages" element={<Collages />} />
          <Route path="/profile" />
          <Route path="/Amount" element={<Amount />} />
          <Route path="/GetCourse" element={<GetCourses />} />
          <Route path="/CourseChoose" element={<CourseChoose />} />
          <Route path="/masterCourse" element={<MasterCourse />} />
          <Route path="/AllCourses" element={<AllCourses />} />
          <Route path="/master" element={<Courses />} />
          <Route path="/Course" element={<Courses />} />
          <Route path="/Products" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
