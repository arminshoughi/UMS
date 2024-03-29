import React, { useState } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { toFarsiNumber } from "../constants/unit";
import { useGetCourse } from "../hook/getCource";
import { formatCreditCardNumber, formatExpirationDate } from "./util";

function Amount() {
  const [state, setState] = useState({
    number: "",
    name: "cvv2",
    expiry: "",
    issuer: "",
    focused: "",
    formData: null,
  });

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setState({ issuer });
    }
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setState({ [target.name]: target.value });
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    }
  };

  const { name, number, expiry, focused, issuer } = state;
  const { data } = useGetCourse();
  const sumPrice = data
    .map((i) => i.course)
    .map((i) => i.price)
    .reduce((partialSum, a) => partialSum + a, 0);
  const access = localStorage.getItem("flag");

  return access === "true" ? (
    <div key="Payment">
      <div className="App-payment mt-9">
        <Card
          number={number}
          name={name}
          expiry={expiry}
          focused={focused}
          callback={handleCallback}
        />
        <form>
          <div className="grid grid-cols-2">
            <div>
              <div className="form-group">
                <input
                  type="tel"
                  name="number"
                  className="form-control mt-5 !w-96 !mx-96"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group mt-2 !w-96 !mx-96">
                <input
                  type="tel"
                  name="name"
                  className="form-control"
                  placeholder="cvv2"
                  required
                  onChange={handleInputChange}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control mt-2 !w-96 !mx-96"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="mt-10 ">
              <div class="bg-slate-100 p-1 border w-80 h-36">
                <p className="grid grid-cols-2 mt-2 text-right">
                  <div className="mr-10">شهریه ثابت :</div>{" "}
                  <span className="mr-10">
                    {toFarsiNumber((10000).toLocaleString())} تومان
                  </span>
                </p>
                <p className="grid grid-cols-2 text-right">
                  <div className="mr-10">شهریه متغیر :</div>{" "}
                  <span className="mr-10">
                    تومان {toFarsiNumber(sumPrice.toLocaleString())}{" "}
                  </span>
                </p>

                <hr />
                <p className="ml-8 text-right">
                  <b className="mr-10">
                    تومان {toFarsiNumber((sumPrice + 10000).toLocaleString())}{" "}
                  </b>
                  <span className="mr-16">: مجموع</span>
                </p>
              </div>
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions">
            <button className="btn text-white !bg-zinc-600 mt-3 w-20 btn-block ml-96">
              ثبت
            </button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  ) : (
    <div>{window.open("login", "_self")}</div>
  );
}
export default Amount;
