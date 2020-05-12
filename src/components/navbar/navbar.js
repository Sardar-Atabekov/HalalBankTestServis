import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import neobisLogo from "./../../assets/logo/neobisLogo.svg";
import Swal from "sweetalert2";

const NavBar = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const confirmMessage = () => {
    Swal.fire({
      title: "Вы уверены?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#32b482",
      cancelButtonColor: "#d33",
      cancelButtonText: "Нет",
      confirmButtonText: "Да, выйти",
    }).then((result) => {
      if (result.value) {
        localStorage.removeItem("neobisHUBDate");
        window.location.href = "/";
      }
    });
  };

  return (
    // <div className="navBlock">
    <nav className="navigationComponent text-left">
      <Link to={"/departments/"}>
        <img src={neobisLogo} className="neobis_logo" alt="neobisLogo" />
      </Link>
      <Link to={"/departments/"} className="categories">
        POS Терминалы
      </Link>
      <Link to={"/transactions/"} className="categories">
        Транзакция
      </Link>
      <Link to={"/reports/"} className="categories">
        Отчеты
      </Link>
      <Link to={"/users/"} className="categories">
        Пользователи
      </Link>

      {/* <Link to={"/tables/"} className="categories">
        Комнаты
      </Link>
      <Link to={"/reservations/"} className="categories">
        Бронирование
      </Link> */}
      <div className="categories" onClick={confirmMessage}>
        Выйти
      </div>
    </nav>
    // </div>
  );
};

export default NavBar;
