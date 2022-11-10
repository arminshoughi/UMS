import React, { useEffect, useState } from "react";
import { HiOutlineUserCircle } from "react-icons/hi";
import "./Navbar.css";
import "@reach/listbox/styles.css";
import axios from "axios";
import { useLocation } from "react-router-dom";

const Login = () => {
  const [status, setStatus] = useState();
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
            Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjc2NTYxNjQ4LCJqdGkiOiIzNzkzNWM1MmQ4Mzg0NjQ2OTdlNmE0NWYwNGEwYzI4NyIsInVzZXJfaWQiOjN9.EJuZ4h5fwzNcl5A0swmhqUprfTvzHT1Ctv_BnJYLokg`,

            "X-CSRFToken":
              "mv5bfbYlTG38dX0YQWAT4iCJEl1kFoBLexah2DkqWzMatZ0bEqIstNIH0gRfXc2g",
          },
        }
      )
      .then((result) => {
        setStatus(result.status.toString());
      })
      .catch((error) => {
        alert("نام کاربری و یا رمز عبور اشتباه است لطفا مجدد تلاش کنید.");
      });
  };
  const location = useLocation();

  console.log("status", userName);
  console.log(location.pathname, "nargess");

  useEffect(() => {
    if (status === "200" && location.pathname === "/login") {
      window.open("/", "_self");
    } else {
      if (status === "200" && location.pathname === "/masterlogin") {
        window.open("/master", "_self");
      }
    }
  }, [status]);
  return (
    <div className="Login ">
      <div className=" align-center p-4 w-[30%]  ml-[35%]  ">
        <div className="!bg-red-800 ">
          <div className="card ">
            <HiOutlineUserCircle className="w-40 h-40 ml-[32%]" />
            <div className="card-body">
              <h1 className="text-3xl text-center">ورود</h1>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
