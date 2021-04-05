import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Products} from "../components/Products";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";

export const ProductsPage = () => {
    const { request, loading } = useHttp();
    const [ products, setProducts ] = useState([]);
    const { token } = useContext(AuthContext);

    const getProductsList = useCallback(async () => {
        try {
            const productList = await request('/api/product', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setProducts(productList);
        } catch (e){
            console.log(e);
        }
    }, [token, request]);

    useEffect(() => {
        getProductsList()
    }, [getProductsList]);

    if (loading) {
        return <Loader />
    }

       return (
           <>
               { !loading && products && <Products products={products}/>}
               <NavLink to="/addProduct"><button className="btn">Добавить продукт</button></NavLink>
           </>
       )
}