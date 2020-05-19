import React, { useState, useEffect } from "react";
import { congestionStatus, userRole } from "./../../constants/status";
import { getData } from "../../functions/requests";
import { deleteAlert } from "./../../functions/alert";
import Loading from "./../../components/loading/loading";
import NavBar from "./../../components/navbar/navbar";
import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";
import Title from "./../../components/title/title";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setTansactionData] = useState([]);
  // const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    if (localStorage.getItem("transaction")) {
      let transaction = JSON.parse(localStorage.getItem("transaction"));

      setTansactionData(transaction);
      setLoading(true);
    }
  };

  const endPayments = () => {
    let transaction = JSON.parse(localStorage.getItem("transaction"));
    let reports = JSON.parse(localStorage.getItem("reports"));
    transaction = transaction.map((item) => {
      if (!item.completed) {
        item.completed = true;
        if (item.Curr == "KGS") {
          reports.kgs = reports.kgs + item.Amnt;
        } else if (item.Curr == "USD") {
          reports.usd = reports.usd + item.Amnt;
        } else if (item.Curr == "KZT") {
          reports.kz = reports.kz + item.Amnt;
        } else if (item.Curr == "EUR") {
          reports.eur = reports.eur + item.Amnt;
        }
      }

      return item;
    });
    localStorage.setItem("transaction", JSON.stringify(transaction));
    localStorage.setItem("reports", JSON.stringify(reports));
    setTansactionData(transaction);
  };
  const deleteMessage = (id, name) => {
    deleteAlert(
      `Вы уверены что хотите удалить пользователя ${name}?`,
      "ПользователЬ удалена",
      `user/update_destroy/${id}/`,
      getUsers
    );
  };
  return (
    <div className="wrapper">
      <NavBar />
      <div className="main-container">
        <Header />
        {loading ? (
          <div className="content">
            <div className="d-flex justify-content-between">
              <Title>Транзакции</Title>
              <div className="d-flex align-content-center">
                <button className="add mt-5" onClick={endPayments}>
                  Завершить платежи
                </button>
              </div>
              <div className="d-flex align-content-center">
                <Link className="add mt-5" to={`/add-transaction/`}>
                  Добавить вручную
                </Link>
              </div>
              <div className="d-flex align-content-center">
                {/* <Link className="add mt-5" to={`/add-user/`}>
                  Импортировать
                </Link> */}
                <label htmlFor="upload-photo" className="add mt-5 mb-1">
                  Импортировать...
                </label>
                <input
                  type="file"
                  name="photo"
                  className="add"
                  id="upload-photo"
                />
                {/* <input name="Импортировать" type="file" /> */}
              </div>
            </div>
            <Table striped className={"mb-5 table-3 tables"}>
              <thead>
                <tr>
                  <th className={"thead-item"}>Код устройства</th>
                  <th className={"thead-item"}>Время</th>
                  {/* <th className={"thead-item"}>Вид валюты </th> */}
                  <th className={"thead-item"}>Деньги</th>
                  <th className={"thead-item"}>Номер карта клиента</th>
                  <th className={"thead-item"}>Статус</th>
                  {/* <th className={"thead-item"}>Статус</th> */}
                  <th colSpan={2} className={"thead-item"}>
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className={"tbody"}>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-th="Ф.И.О" className={"tbody-item"}>
                      {user.DeviceCode}
                    </td>
                    <td data-th="Департамент" className={"tbody-item"}>
                      {user.OperDateTime}
                    </td>
                    {/* <td data-th="Телефон номер" className={"tbody-item"}>
                      {user.Curr}
                    </td> */}
                    <td data-th="Telegram" className={"tbody-item"}>
                      {user.Amnt} {user.Curr}
                    </td>
                    <td data-th="Роль" className={"tbody-item"}>
                      {user.Card_Number}
                    </td>
                    <td data-th="Роль" className={"tbody-item"}>
                      {user.completed ? "Завершен" : "Не завершен"}
                    </td>
                    {/* <td data-th="Занятость" className={"tbody-item"}>
                      {congestionStatus[user.congestion]}
                    </td> */}
                    <td className={"tbody-item item-more"}>
                      <Link to={`/transaction/${user.id}/`}>Подробное</Link>
                    </td>

                    <td
                      onClick={() => deleteMessage(user.id, user.name)}
                      className={"tbody-item item-delete"}
                    >
                      Удалить
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        ) : (
          <Loading />
        )}
        <Footer />
      </div>
    </div>
  );
};
export default Users;
