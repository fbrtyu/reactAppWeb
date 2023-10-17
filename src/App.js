import React from 'react';
import './App.css';
import root from './index.js';
import setProfile from './Profile.js';

function getCookie(name) {
  let match = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${name}=`));

  return match ? match.split('=')[1] : undefined;
}

function App() {
  var gc = getCookie("jwt");
  if (gc != undefined) {
    setProfile();
  } else {
    return (
      <div className="App">
        <p onClick={SetLogin}>Вход</p>
        <p onClick={SetReg}>Регистрация</p>
      </div>
    );
  }
}

export function SetMainPage() {
  root.render(<App />)
}

export function SetReg() {
  root.render(<Reg />)
}

export function SetLogin() {
  root.render(<Login />)
}

function Login() {
  return (
    <form className="box" action="/" method="post" id="mainform">
      <h1 id="l">Вход</h1>
      <p className="pf" onClick={SetReg}>Регистрация</p>
      <p className="pf" onClick={SetMainPage}>Главная</p>
      <input className="bf" type="text" name="login" placeholder="Логин" id="login" />
      <input className="bf" type="password" name="password" placeholder="Пароль" id="password" />
      <input type="button" className="btn" name="do_login" value="Войти" onClick={loginFunc} />
    </form>
  );
}

function loginFunc() {
  let login = document.getElementById("login").value;
  let password = document.getElementById("password").value;

  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/signin";

  const params = "login=" + login + "&password=" + password;

  request.open("POST", url, false);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {
    if (request.readyState === 4 && request.status === 200) {
      document.cookie = "jwt=" + request.getResponseHeader("Authorization") + ";max-age=3600";
      console.log(request.getResponseHeader("Authorization"));
      setProfile();
    }
  });

  request.send(params);
}

function Reg() {
  return (
    <form className="box" action="/" method="post" id="mainform">
      <h1>Регистрация</h1>
      <p className="pf" onClick={SetLogin}>Вход</p>
      <p className="pf" onClick={SetMainPage}>Главная</p>
      <input type="text" name="login" placeholder="Логин" id="login" />
      <input type="password" name="password1" placeholder="Пароль" id="password1" />
      <input type="password" name="password2" placeholder="Пароль повтор" id="password2" />
      <input type="button" className="btn" name="do_reg" value="Зарегистрироваться" onClick={regFunc} />
    </form>
  );
}

function regFunc() {
  let login = document.getElementById("login").value;
  let password1 = document.getElementById("password1").value;
  let password2 = document.getElementById("password2").value;

  const request = new XMLHttpRequest();

  const url = "http://localhost:8080/signup";

  const params = "login=" + login + "&password1=" + password1 + "&password2=" + password2;

  request.open("POST", url, false);

  request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

  request.addEventListener("readystatechange", () => {
    console.log(request.responseText);
    if (request.readyState === 4 && request.status === 200) {
      document.cookie = "jwt=" + request.getResponseHeader("Authorization") + ";max-age=3600";
      setProfile();
    }
  });

  request.send(params);
}

export default App;