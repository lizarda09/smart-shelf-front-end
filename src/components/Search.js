import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const Search = () => {
    const [usersByPosition, setUsersByPosition] = useState([]);
    const { request } = useHttp();
    const { token } = useContext(AuthContext);

    const getUsersByPosition = async () => {
        try {
            const input = document.querySelector('input[name="search"]');
            const arr = await request(`/api/user/${input.value}`, 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setUsersByPosition(arr);
            console.log(arr);
        } catch (e){
            console.log(e);
        }
    };

    return (
        <div>
            <input name="search" placeholder="Поиск" type="text"/>
            <button className="btn">По Id</button>
            <button className="btn">По почте</button>
            <button className="btn" onClick={getUsersByPosition}>По должности</button>
        </div>
    )
};