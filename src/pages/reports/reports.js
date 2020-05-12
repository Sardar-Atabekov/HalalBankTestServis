import React, { useState, useEffect } from "react";
import Loading from "./../../components/loading/loading";
import { deleteAlert } from "./../../functions/alert";
import NavBar from "./../../components/navbar/navbar";
import Header from "./../../components/header/header";
import Footer from "./../../components/footer/footer";
import { getData } from "../../functions/requests";
import Total from "./../../components/total/total";
import Title from "./../../components/title/title";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const Departments = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    getDepartments();
  }, []);

  const getDepartments = () => {
    if (localStorage.getItem("transaction")) {
      let transaction = JSON.parse(localStorage.getItem("transaction"));
      setDepartments(transaction);
      setLoading(true);
    }
  };

  const data = {
    totalSum: 1000000,
    totalSumMonth: 500000,
    totalSumWeek: 250000,
    totalSumToday: 0,
  };

  return (
    <div className="wrapper">
      <NavBar />
      <div className="main-container">
        <Header />
        {loading ? (
          <div className="content">
            <Title>Общая</Title>
            <Total data={data} />
            <Title>Сом</Title>
            <Total data={data} />
            <Title>KZT</Title>
            <Total data={data} currency="KZT" />
            <Title>EUR</Title>
            <Total data={data} currency="EUR" />
            <Title>USD</Title>
            <Total data={data} currency="USD" />
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
