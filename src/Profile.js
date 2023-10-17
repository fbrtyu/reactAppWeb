import React from 'react';
import './App.css';
import root from './index.js';

function exit() {
    document.cookie = "jwt=" + " " + ";max-age=0";
    window.location.reload();
}

function Profile() {
    return (
        <div className="Profile">
            <p>Ваш профиль</p>
            <p>Поиск людей</p>
            <p>Друзья</p>
            <p>Чаты</p>
            <p onClick={exit} >Выйти</p>
        </div>
    );
}

function getCookie2(name) {
    let match = document.cookie
        .split('; ')
        .find(row => row.startsWith(`${name}=`));

    return match ? match.split('=')[1] : undefined;
}

export default function setProfile() {
    var gc = getCookie2("jwt");
    const request = new XMLHttpRequest();

    const url = "http://localhost:8080/profile";

    const params = "accessToken=" + gc;

    request.open("POST", url, false);

    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.addEventListener("readystatechange", () => {
        if (request.readyState === 4 && request.status === 200 && request.responseText === "True") {
            console.log(request.responseText);
            root.render(<Profile />);
        }
    });

    request.send(params);
}