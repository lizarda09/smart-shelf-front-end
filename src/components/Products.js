import React, {useCallback, useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const Products = ({ products, getProductsList }) => {
    const { request } = useHttp();
    //const [ discount, setDiscount ] = useState(null);
    const { token } = useContext(AuthContext);

    const deleteProduct = async event => {
        try {
            const idProduct = event.target.dataset.product;
            const product = await request(`/api/product/${idProduct}`, 'DELETE', null, {
             Authorization: `Bearer ${ token }`
            });
            getProductsList();
            console.log(product);
        } catch (e){
            console.log(e);
        }
    };

    const checkDiscount = async event => {
        try {
            const idProduct = event.target.dataset.product;
            const product = await request(`/api/product/${idProduct}/checkDiscount`, 'GET', null, {
                Authorization: `Bearer ${ token }`
            });
            getProductsList();
            alert(product.message);
        } catch (e){
            console.log(e);
        }
    };

    if (!products.length) {
        return <h3 className="center">Продуктов пока нет</h3>
    }

    return (
        <table className="striped">
            <thead>
            <tr>
                <th>Наименование</th>
                <th>Количество</th>
                <th>Цена</th>
                <th>Скидка</th>
                <th>Дата производства</th>
                <th>Срок хранения</th>
                <th></th>
                <th></th>
                <th></th>
            </tr>
            </thead>
            <tbody>
            { products.map( product => {
                return (
                        <tr key={product._id}>
                            <td>{product.name}</td>
                            <td>{product.count}</td>
                            <td>{product.price} гривен</td>
                            <td>{product.discount}</td>
                            <td>{product.dateOfManufacture}</td>
                            <td>{product.shelfLife}</td>
                            <td><button data-product={product._id} className="btn" onClick={deleteProduct}>Удалить</button></td>
                            <td><button data-product={product._id} className="btn">Обновить</button></td>
                            <td><button data-product={product._id} className="btn" onClick={checkDiscount}>Проверить скидку</button></td>
                        </tr>
                )
            })}
            </tbody>
        </table>
    )
}