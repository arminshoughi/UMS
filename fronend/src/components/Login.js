import React, { useId } from "react";
import { HiOutlineUserCircle, HiUser } from "react-icons/hi";
import "./Navbar.css";
import { useTranslation } from "react-i18next";
import { UNIT } from "../constants/unit";
import { FormLabeledListbox, FormListbox } from "./Form";
import {
  Listbox,
  ListboxInput,
  ListboxButton,
  ListboxPopover,
  ListboxList,
  ListboxOption,
} from "@reach/listbox";
import "@reach/listbox/styles.css";

const Login = () => {
  const { t } = useTranslation();

  const submitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const data = new FormData(form);
    console.log(data);
  };
  let labelId = `taco-label--${useId()}`;
  let [value, setValue] = React.useState("pollo");
  return (
    <div className="Login ">
      <div className=" align-center p-4 w-[30%]  ml-[35%]  ">
        <div className="!bg-red-800 ">
          <div className="card ">
            <HiOutlineUserCircle className="w-40 h-40 ml-[32%]" />
            <div className="card-body">
              <h1>Login</h1>
              <form onSubmit={submitForm}>
                <div className="form-group mt-5">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    name="username"
                    className="form-control"
                    id="username"
                  />
                </div>
                <div className="form-group mt-4">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    id="password"
                  />
                </div>

                <button
                  type="submit"
                  className="btn mt-5 btn-primary rounded-full "
                >
                  Login
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
