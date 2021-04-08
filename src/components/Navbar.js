import React, {useContext} from 'react';
import {NavLink, useHistory} from "react-router-dom";
import {AuthContext} from "../context/AuthContext";

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);

    const logoutHandler = event => {
        event.preventDefault();
        auth.logout();
        history.push('/');
    };

    return (
        <nav>
            <div className="nav-wrapper teal lighten-2">
                <a href="#" className="brand-logo center black-text">Smart Shelf</a>
                <ul className="left hide-on-med-and-down">
                    <li><NavLink to="/product">Продукты</NavLink></li>
                    <li><NavLink to="/user">Пользователи</NavLink></li>
                    <li><NavLink to="/shelf">Полки</NavLink></li>
                    <li><NavLink to="/sale">Продажи</NavLink></li>
                    <li><a href="/" onClick={logoutHandler}>Выйти</a></li>
                </ul>
            </div>
        </nav>
    )
}