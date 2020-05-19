import React, { useState } from "react";
import { Button, FormGroup, Form, Input } from "reactstrap";
import { postDataNoToken } from "../../functions/requests";
import "./login-page.css";

const LoginPage = () => {
  const [error, setError] = useState(false);
  const postUserData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target),
      data = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    console.log(data);
    // postDataNoToken("user/login/", data)
    //   .then((response) => {
    //     console.log(response);
    //     if (response.token) {
    //       localStorage.setItem("neobisHUBDate", JSON.stringify(response));
    //       setTimeout(() => (window.location.href = `/departments`), 500);
    //     } else {
    //       setError(true);
    //     }
    //   })
    //   .catch(() => setError(true));

    let terminals = [
      {
        DeviceCode: 1,
        location: "Жибек жолу 231",
        account: 326343221245,
      },
      {
        DeviceCode: 2,
        location: "Торговый центр VEFA",
        account: 634431245,
      },
      {
        DeviceCode: 3,
        location: "Торговый центр ASIA MOLL",
        account: 953427322345,
      },
      {
        DeviceCode: 4,
        location: "Улица Ч.Айтматова 16",
        account: 23511248235,
      },
      {
        DeviceCode: 5,
        location: "Улица Ч.Айтматова 71",
        account: 135742245,
      },
    ];

    localStorage.setItem("terminals", JSON.stringify(terminals));
    let transaction = [
      {
        id: 1,
        OperDateTime: "2020-05-12",
        DeviceCode: 1,
        Curr: "USD",
        Amnt: 23434,
        Card_Number: 2234,
        completed: false,
      },
      {
        id: 2,
        OperDateTime: "2020-05-12",
        DeviceCode: 2,
        Curr: "KGS",
        Amnt: 73474,
        completed: false,

        Card_Number: 7334,
      },
      {
        id: 3,
        OperDateTime: "2020-05-12",
        DeviceCode: 3,
        Curr: "KGS",
        Amnt: 21344,
        completed: false,

        Card_Number: 523214,
      },
      {
        id: 4,
        OperDateTime: "2020-05-12",
        DeviceCode: 4,
        Curr: "KZT",
        Amnt: 83344,
        completed: false,
        Card_Number: 2342,
      },
      {
        id: 5,
        OperDateTime: "2020-05-12",
        completed: false,
        DeviceCode: 5,
        Curr: "EUR",
        Amnt: 2344,
        Card_Number: 1234,
      },
    ];
    localStorage.setItem("transaction", JSON.stringify(transaction));
    localStorage.setItem(
      "reports",
      JSON.stringify({
        kgs: 0,
        usd: 0,
        kz: 0,
        eur: 0,
      })
    );
    setTimeout(() => (window.location.href = `/transactions/`), 500);
  };

  return (
    <div className="loginWrapper">
      <div className="login">
        <h1>Neobis HUB</h1>
        <Form className="loginForm" onSubmit={postUserData}>
          <FormGroup>
            <Input
              className="loginInput"
              type="text"
              placeholder="Логин"
              name="email"
              required
            />
          </FormGroup>
          <FormGroup>
            <Input
              className="loginInput"
              type="password"
              placeholder="Пароль"
              name="password"
              required
            />
          </FormGroup>
          {error ? (
            <div className="errorMessage">Неправильный email или пароль</div>
          ) : null}
          <Button className="loginInput loginBtn button">Войти</Button>
        </Form>
      </div>
      {/* <Container>
          <div className="login-block ">
            <h1>Neobis HUB</h1>
            <Form className={"login-form p-5 "} onSubmit={postUserData}>
              <Input
                className="loginInput"
                type="text"
                placeholder="Логин"
                name="email"
                required
              />
              <br />
              <Input
                className="loginInput"
                type="password"
                placeholder="Пароль"
                name="password"
                required
              />
              <div className={"my-3 text-center"}>
                {error ? (
                  <p className={"text-danger"}>Неверный логин или пароль</p>
                ) : null}
              </div>
              <div className={"d-flex justify-content-center"}>
                <Button className={"form-button my-3"}>Войти</Button>
              </div>
            </Form>
          </div>
        </Container> */}
    </div>
  );
};
export default LoginPage;
