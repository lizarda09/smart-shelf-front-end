import React, {useContext, useState} from 'react';
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";

export const AddProduct = () => {
    const [form, setForm] = useState({
        name: '', price: '', phone: '', discount: '', dateOfManufacture: '', shelfLife: ''
    });
    const { token } = useContext(AuthContext);
    const { loading, error, request, clearError } = useHttp();

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
    };

    const addProductHandler = async () => {
        try {
            const data = await request('/api/product/add', 'POST', {...form}, {
                Authorization: `Bearer ${ token }`
            });
            console.log(data);
        } catch (e) {}
    };

    return (
        <div className="row">
            <div className="col s8 offset-s2">
                <h3 className="center">Введите данные о новом продукте</h3>
                <div className="card  light-green lighten-3">
                    <div className="card-content">
                        <div>
                            <div className="input-field">
                                <input id="name" onChange={changeHandler} name="name" type="text" />
                                <label htmlFor="name">Name</label>
                            </div>
                            <div className="input-field">
                                <input id="price" onChange={changeHandler} name="price" type="text" />
                                <label htmlFor="price">Price</label>
                            </div>
                            <div className="input-field">
                                <input id="count" onChange={changeHandler} name="count" type="text" />
                                <label htmlFor="count">Count</label>
                            </div>
                            <div className="input-field">
                                <input id="discount" onChange={changeHandler} name="discount" type="text" />
                                <label htmlFor="discount">Discount</label>
                            </div>
                            <div className="input-field">
                                <input id="dateOfManufacture" onChange={changeHandler} name="dateOfManufacture" type="text" />
                                <label htmlFor="dateOfManufacture">Date of manufacture</label>
                            </div>
                            <div className="input-field">
                                <input id="shelfLife" onChange={changeHandler} name="shelfLife" type="text" />
                                <label htmlFor="shelfLife">Shelf life</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn  light-green darken-3" onClick={addProductHandler} >Добавить</button>
                    </div>
                </div>
            </div>
        </div>
    )
}