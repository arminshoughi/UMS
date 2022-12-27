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
import Master from "./pages/adminMaster";
import Majors from "./pages/Majors";

import Product from "./pages/Product";
import Amount from "./pages/Amount";
import Courses from "./pages/Courses";
import GetCourses from "./pages/GetCources";
import CourseChoose from "./pages/CoursesChoose";
import AllCourses from "./pages/AllCourses";
import MasterCourse from "./pages/masterCourse";
import Welcome from "./pages/Welcome";
import Home from "./pages/Home";
import CourseStudent from "./pages/CoursesStudent";
import WelcomeMaster from "./pages/WelcomMaster";
import Student from "./pages/AdminStudent";

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" />
          <Route path="/welcomeStudent" element={<Welcome />} />
          <Route path="/welcomemaster" element={<WelcomeMaster />} />
          <Route path="/masterLogin" />
          <Route path="/units" element={<Units />} />
          <Route path="/AdminCollages" element={<Collages />} />
          <Route path="/AdminMaster" element={<Master />} />
          <Route path="/AdminMajors" element={<Majors />} />
          <Route path="/AdminStudent" element={<Student />} />

          <Route path="/profile" />
          <Route path="/AmountStudent" element={<Amount />} />
          <Route path="/GetCourse" element={<GetCourses />} />
          <Route path="/CourseChooseStudent" element={<CourseChoose />} />
          <Route path="/masterCourse" element={<MasterCourse />} />
          <Route path="/AllCoursesStudent" element={<AllCourses />} />
          <Route path="/master" element={<Courses />} />
          <Route path="/CourseStudent" element={<CourseStudent />} />
          <Route path="/ProductsStudent" element={<Product />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
