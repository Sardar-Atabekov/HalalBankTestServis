import React, { useState, useEffect } from "react";
import NavBar from "./../../components/navbar/navbar";
import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";
import Loading from "./../../components/loading/loading";
import { getData, postData } from "../../functions/requests";
import Alert from "./../../functions/alert";
import "./style.css";

const AddUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [terminals, setTerminals] = useState([]);
  useEffect(() => {
    let terminals = JSON.parse(localStorage.getItem("terminals"));
    setTerminals(terminals);
    getData("user/").then((res) => {
      console.log(res);
      setUsers(res);
    });

    setTimeout(() => setLoading(true), 500);
  }, []);

  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    console.log(formData);
    formData.forEach((value, key) => {
      data[key] = value;
    });

    console.log(data);
    let transaction = JSON.parse(localStorage.getItem("transaction"));
    data.id = transaction.length + 1;
    data.Amnt = +data.Amnt;
    data.Card_Number = +data.Card_Number;
    data.DeviceCode = +data.DeviceCode;
    transaction.push(data);
    localStorage.setItem("transaction", JSON.stringify(transaction));
    console.log(JSON.parse(localStorage.getItem("transaction")));
  };

  return (
    <div className="wrapper">
      <NavBar />
      <div className="main-container">
        <Header />
        {loading ? (
          <div className="content">
            <main className="addUserContent pt-3">
              <div className="formBlock">
                <div className="title-block">
                  <div className="form-title">
                    <h6 className="form-text">Данные транзакции</h6>
                  </div>
                </div>
                <form className="form" onSubmit={postUserData}>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="OperDateTime">Время</label>
                      <input
                        type="text"
                        name="OperDateTime"
                        className="form-control"
                        id="OperDateTime"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Amnt">Сумма</label>
                      <input
                        type="number"
                        name="Amnt"
                        className="form-control"
                        required
                        id="Amnt"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="Curr">Вид валюты</label>
                      <select
                        id="Curr"
                        className="select"
                        name="Curr"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Выберите валюту
                        </option>
                        <option value="KGS">KGS</option>
                        <option value="KZT">KZT</option>{" "}
                        <option value="EUR">EUR</option>{" "}
                        <option value="USD">USD</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="DeviceCode">Код устройства</label>
                      <select
                        id="DeviceCode"
                        className="select"
                        name="DeviceCode"
                        defaultValue=""
                      >
                        <option value="" disabled>
                          Выберите устройству
                        </option>
                        {terminals.map((user) => (
                          <option key={user.DeviceCode} value={user.DeviceCode}>
                            {user.DeviceCode}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="Card_Number">Номер клиента</label>
                      <input
                        type="number"
                        name="Card_Number"
                        required
                        className="form-control"
                        id="Card_Number"
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <input
                      type="submit"
                      className="btn btnSumbit"
                      value="Добавить"
                    />
                  </div>
                </form>
              </div>
            </main>
          </div>
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    </div>
  );
};
export default AddUser;
