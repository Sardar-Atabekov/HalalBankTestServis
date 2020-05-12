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
import "./users.css";

const Users = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsersData] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    getData("user/").then((res) => {
      console.log(res);
      setUsersData(res);
      setLoading(true);
    });
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
            <Title>Пользователи</Title>
            <Table striped className={"mb-5 table-3 tables"}>
              <thead>
                <tr>
                  <th className={"thead-item"}>Ф.И.О</th>
                  <th className={"thead-item"}>Телефон номер</th>
                  <th className={"thead-item"}>Telegram</th>
                  <th colSpan={2} className={"thead-item"}>
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className={"tbody"}>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td data-th="Ф.И.О" className={"tbody-item"}>
                      {user.name} {user.surname}
                    </td>
                    <td data-th="Телефон номер" className={"tbody-item"}>
                      {user.phone}
                    </td>
                    <td data-th="Telegram" className={"tbody-item"}>
                      <a
                        href={user.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={user.phone}
                      >
                        {user.phone}
                      </a>
                    </td>
                    <td className={"tbody-item item-more"}>
                      <Link to={`/user/${user.id}/`}>Подробное</Link>
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
