import React, { useState, useEffect } from "react";
import { getData } from "../../functions/requests";
import { deleteAlert } from "./../../functions/alert";
import Loading from "./../../components/loading/loading";
import NavBar from "./../../components/navbar/navbar";
import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";
import Title from "./../../components/title/title";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";
import "./departments.css";

const Departments = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);
  const [terminals, setTerminals] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = () => {
    if (localStorage.getItem("transaction")) {
      let transaction = JSON.parse(localStorage.getItem("transaction"));
      setDepartments(transaction);
      let terminals = JSON.parse(localStorage.getItem("terminals"));
      setTerminals(terminals);
      setLoading(true);
    }
  };

  const deleteMessage = (id, name) => {
    deleteAlert(
      `Вы уверены что хотите удалить департамент ${name}?`,
      "Департамент удалена",
      `department/update_destroy/${id}/`,
      getDepartments
    );
  };
  return (
    <div className="wrapper">
      <NavBar />
      <div className="main-container">
        <Header />
        {loading ? (
          <div className="content">
            <Title>POS Терминалы</Title>
            <Table striped className={"mb-5 table-3 tables"}>
              <thead>
                <tr>
                  {/* <th className={"thead-item"}>Имя</th> */}
                  <th className={"thead-item"}>Код устройство</th>
                  <th className={"thead-item"}>Местоположение</th>
                  <th className={"thead-item"}>Счет аккаунта</th>
                  <th colSpan={2} className={"thead-item"}>
                    Действия
                  </th>
                </tr>
              </thead>
              <tbody className={"tbody"}>
                {terminals.map((department) => (
                  <tr key={department.DeviceCode}>
                    <td data-th="Тимлид департамента" className={"tbody-item"}>
                      {department.DeviceCode}
                    </td>
                    <td data-th="Количество членов" className={"tbody-item"}>
                      {department.location}
                    </td>
                    <td data-th="Количество ментеров" className={"tbody-item"}>
                      {department.account}
                    </td>
                    <td className={"tbody-item item-more"}>
                      <Link to={`/department/${department.id}`}>Подробное</Link>
                    </td>
                    <td
                      onClick={() =>
                        deleteMessage(department.id, department.name)
                      }
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
export default Departments;
