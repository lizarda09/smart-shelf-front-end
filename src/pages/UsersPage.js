import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";
import {Users} from "../components/Users";

export const UsersPage = () => {
    const { request, loading } = useHttp();
    const [ usersArr, setUsersArr ] = useState([]);
    const { token } = useContext(AuthContext);


    const getUsersList = useCallback(async () => {
        try {
            const userList = await request('/api/user', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setUsersArr(userList.users);
            console.log(usersArr)
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
            <h3 className="center">Пользователи</h3>
            { !loading && usersArr && <Users users={usersArr} />}
        </>
    )
}