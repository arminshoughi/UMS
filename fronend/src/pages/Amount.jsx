import React, { useState } from "react";
import Card from "react-credit-cards";
import "react-credit-cards/es/styles-compiled.css";
import { useGetCourseTable } from "../hook/getCource";
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

  const handleInputFocus = ({ target }) => {
    setState({
      focused: target.name,
    });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
      setState({ [target.name]: target.value });
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    }
    console.log(target.name, "dsadsad");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setState({ formData });
  };

  const { name, number, expiry, focused, issuer } = state;
  const { data } = useGetCourseTable();
  const sumPrice = data
    .map((i) => i.course)
    .map((i) => i.price)
    .reduce((partialSum, a) => partialSum + a, 0);
  console.log(data, "Asdsad");
  return (
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
            <div className="mt-10">
              <div class="bg-gray-200 border w-80 h-36">
                <p className="grid grid-cols-2 mt-2">
                  <div className="ml-2">شهریه ثابت</div>{" "}
                  <span>10000 تومان</span>
                </p>
                <p className="grid grid-cols-2">
                  <div className="ml-2">شهریه متغیر</div>{" "}
                  <span>تومان {sumPrice} </span>
                </p>

                <hr />
                <p className="ml-8">
                  <b>تومان {sumPrice + 10000} </b>
                  <span className="mr-20">:مجموع</span>
                </p>
              </div>
            </div>
          </div>
          <input type="hidden" name="issuer" value={issuer} />
          <div className="form-actions">
            <button className="btn btn-primary btn-block ml-96">PAY</button>
          </div>
        </form>
      </div>
      <div></div>
    </div>
  );
}
export default Amount;
