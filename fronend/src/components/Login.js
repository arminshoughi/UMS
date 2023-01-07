import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./Navbar.css";
import "@reach/listbox/styles.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [status, setStatus] = useState();
  const [, setA] = useState();
  const [userName, setUserName] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post(
        "//127.0.0.1:8000/api/share/auth/token/",
        {
          username: userName,
          password: password,
        },
        {
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",

            "X-CSRFToken":
              "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
          },
        }
      )
      .then((result) => {
        setStatus(result.status.toString());
        localStorage.setItem("access", result.data.access.toString());
        setA(result.data.access.toString());
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
    localStorage.setItem("flag", "true");
  };
  const location = useLocation();
  useEffect(() => {
    if (status === "200" && location.pathname === "/login") {
      window.open("/welcomeStudent", "_self");
    } else {
      if (status === "200" && location.pathname === "/masterlogin") {
        window.open("/welcomemaster", "_self");
      }
    }
  }, [status]);
  useEffect(() => {
    if (location.pathname === "/login") {
      localStorage.setItem("flag", "false");
    }
  }, [location.pathname]);
  return (
    <div className="Login  ">
      <div className=" align-center p-4 w-[30%]   ml-[35%]  ">
        <div className="!bg-red-800 ">
          <div className="card ">
            <HiOutlineUserCircle className="w-40 h-40 ml-[36%]" />
            <div className="card-body">
              <h1 className="text-3xl text-center">
                {location.pathname === "/login"
                  ? "ورود دانشجو "
                  : "ورود اساتید"}
              </h1>
              <form onSubmit={handleSubmit} dir="rtl">
                <div className="form-group mt-5">
                  <label htmlFor="username">نام کاربری</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                    onChange={(e) => setUserName(e.target.value)}
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password">رمز عبور</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button
                  type="submit"
                  className="btn mt-5 !bg-slate-800 text-white w-20 rounded-full float-left "
                >
                  ورود
                </button>
              </form>
              <button
                className="btn mt-5 !bg-slate-800  text-white w-36 ml-2 rounded-full float-left "
                onClick={() => window.open("/", "_self")}
              >
                رفتن به صفحه اصلی
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
