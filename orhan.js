/* versie orhan die werkt met andere API*/import React, { Component } from "react";

class Converter extends Component {
  state = {
    currencies: ["EUR", "MAD", "GHS", "USD", "AUD", "SGD", "PHP"],
    base: "",
    amount: "",
    convertTo: "",
    result: "",
    date: ""
  };

  handleSelect = e => {
    var curr = "";
    if ((e.target.name = "base"))
      this.setState(
        {
          base: e.target.value,
          result: null
        },
        this.calculate
      );
    if ((e.target.name = "convertTo"))
      this.setState(
        {
          convertTo: e.target.value,
          result: null
        },
        this.calculate
      );

    console.log(
      "[e.target.name]: e.target.value",
      e.target.name,
      e.target.value
    );
  };

  handleInput = e => {
    this.setState(
      {
        amount: e.target.value,
        result: null,
        date: null
      },
      this.calculate
    );
  };

  calculate = () => {
    const amount = this.state.amount;
    if (amount === isNaN) {
      return;
    } else {
      console.log("base : ", this.state.base);
      fetch(
        `http://data.fixer.io/api/latest?access_key=cc35b4b416c6170db125be81c819394d&format=1?base=${this.state.base}`
      )
        .then(res => res.json())
        .then(data => {
          const date = data.date;
          const result = (data.rates[this.state.convertTo] * amount).toFixed(4);
          this.setState({
            result,
            date
          });
        });
    }
  };

  handleSwap = e => {
    const base = this.state.base;
    const convertTo = this.state.convertTo;
    e.preventDefault();
    this.setState(
      {
        convertTo: base,
        base: convertTo,
        result: null
      },
      this.calculate
    );
  };
  render() {
    const { currencies, base, amount, convertTo, result, date } = this.state;
    return (
      <div className="container my-5">
        <div className="row">
          <div className="col-lg-6 mx-auto">
            <div className="card card-body">
              <h5>
                {amount} {base} is equevalent to
              </h5>
              <h2>
                {amount === ""
                  ? "0"
                  : result === null
                    ? "Calculating..."
                    : result}{" "}
                {convertTo}
              </h2>
              <p>As of {amount === "" ? "/ / /" : date === null ? "" : date}</p>
              <div className="row">
                <div className="col-lg-10">
                  <form className="form-inline mb-4">
                    <input
                      type="number"
                      value={amount}
                      onChange={this.handleInput}
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="base"
                      onChange={e => this.handleSelect(e)}
                      className="form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>

                  <form className="form-inline mb-4">
                    <input
                      disabled={true}
                      value={
                        amount === ""
                          ? "0"
                          : result === null
                            ? "Calculating..."
                            : result
                      }
                      className="form-control form-control-lg mx-3"
                    />
                    <select
                      name="convertTo"
                      onChange={e => this.handleSelect(e)}
                      className="form-control form-control-lg"
                    >
                      {currencies.map(currency => (
                        <option key={currency} value={currency}>
                          {currency}
                        </option>
                      ))}
                    </select>
                  </form>
                </div>

                <div className="col-lg-2 align-self-center">
                  <h1 onClick={this.handleSwap} className="swap">
                    &#8595;&#8593;
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Converter;
