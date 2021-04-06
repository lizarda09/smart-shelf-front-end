import React, {useCallback, useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Products} from "../components/Products";
import {Loader} from "../components/Loader";
import {NavLink} from "react-router-dom";

export const ProductsPage = () => {
    const { request, loading } = useHttp();
    const [ productsArr, setProductsArr ] = useState([]);
    const { token } = useContext(AuthContext);


    const getProductsList = useCallback(async () => {
        try {
            const productList = await request('/api/product', 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            setProductsArr(productList.products);
            console.log(productsArr)
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
               { !loading && productsArr && <Products products={productsArr}/>}
               <NavLink to="/addProduct"><button className="btn">Добавить продукт</button></NavLink>
           </>
       )
}