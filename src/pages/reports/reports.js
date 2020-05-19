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

  let reports = JSON.parse(localStorage.getItem("reports"));

  const dataSUM = {
    totalSum: reports.kgs,
    totalSumMonth: reports.kgs,
    totalSumWeek: reports.kgs,
    totalSumToday: reports.kgs,
  };
  const dataKZT = {
    totalSum: reports.kz,
    totalSumMonth: reports.kz,
    totalSumWeek: reports.kz,
    totalSumToday: reports.kz,
  };
  const dataEUR = {
    totalSum: reports.eur,
    totalSumMonth: reports.eur,
    totalSumWeek: reports.eur,
    totalSumToday: reports.eur,
  };

  const dataUSD = {
    totalSum: reports.usd,
    totalSumMonth: reports.usd,
    totalSumWeek: reports.usd,
    totalSumToday: reports.usd,
  };

  const data = {
    totalSum: Math.round(
      reports.usd * 77 + reports.eur * 83.2 + reports.kz * 0.18 + reports.kgs
    ),
    totalSumMonth: Math.round(
      reports.usd * 77 + reports.eur * 83.2 + reports.kz * 0.18 + reports.kgs
    ),
    totalSumWeek: Math.round(
      reports.usd * 77 + reports.eur * 83.2 + reports.kz * 0.18 + reports.kgs
    ),
    totalSumToday: Math.round(
      reports.usd * 77 + reports.eur * 83.2 + reports.kz * 0.18 + reports.kgs
    ),
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
            <Total data={dataSUM} />
            <Title>KZT</Title>
            <Total data={dataKZT} currency="KZT" />
            <Title>EUR</Title>
            <Total data={dataEUR} currency="EUR" />
            <Title>USD</Title>
            <Total data={dataUSD} currency="USD" />
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
