import React from "react";
// import Error from "../components/Error";
// import Loading from "../components/Error";
import Card from "react-credit-cards";

import "react-credit-cards/es/styles-compiled.css";
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
  formatFormData,
} from "./util";

export default class Amount extends React.Component {
  state = {
    number: "",
    name: "cvv2",
    expiry: "",
    issuer: "",
    focused: "",
    formData: null,
  };

  handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      this.setState({ issuer });
    }
  };

  handleInputFocus = ({ target }) => {
    this.setState({
      focused: target.name,
    });
  };

  handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    }

    this.setState({ [target.name]: target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const formData = [...e.target.elements]
      .filter((d) => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    this.setState({ formData });
    this.form.reset();
  };

  render() {
    const { name, number, expiry, focused, issuer } = this.state;

    return (
      <div key="Payment">
        <div className="App-payment mt-9">
          <Card
            number={number}
            name={name}
            expiry={expiry}
            focused={focused}
            callback={this.handleCallback}
          />
          <form ref={(c) => (this.form = c)} onSubmit={this.handleSubmit}>
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
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
                  />
                </div>
                <div className="form-group mt-2 !w-96 !mx-96">
                  <input
                    type="number"
                    name="name"
                    className="form-control "
                    placeholder="cvv2"
                    required
                    onChange={this.handleInputChange}
                    onFocus={this.handleInputFocus}
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
                      onChange={this.handleInputChange}
                      onFocus={this.handleInputFocus}
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
                    <span>تومان 10000 </span>
                  </p>

                  <hr />
                  <p className="ml-8">
                    <b>تومان 20000 </b>
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
}
