import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";

export const UsersPage = () => {
    const { request, loading } = useHttp();
    const [ users, setUsers ] = useState([]);
    const { token } = useContext(AuthContext);


    const getUsersList = useCallback(async () => {
        try {
            const userList = await request('/api/user', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setUsers(userList);
            console.log(users)
        } catch (e){
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getUsersList()
    }, [getUsersList]);

    if (loading) {
        return <Loader />
    }

    return (
        <>
            <NavLink to="/addUser"><button className="btn">Добавить нового пользователя</button></NavLink>
        </>
    )
}