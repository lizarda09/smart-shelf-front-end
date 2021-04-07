import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Search} from "./Search";

export const Users = ({ users }) => {
    if (!users.length) {
        return <h3 className="center">Пользователей пока нет</h3>
    }

    return (
        <div>
            <Search />
            <table className="striped">
                <thead>
                <tr>
                    <th>Имя</th>
                    <th>Фамилия</th>
                    <th>Телефон</th>
                    <th>Почта</th>
                    <th>Должность</th>
                </tr>
                </thead>
                <tbody>
                { users.map( user => {
                    return (
                        <tr key={user._id}>
                            <td>{user.firstName}</td>
                            <td>{user.secondName}</td>
                            <td>{user.phone}</td>
                            <td>{user.email}</td>
                            <td>{user.position}</td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    )
}