import React from 'react';

export const Products = ({ products }) => {
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
            </tr>
            </thead>
            <tbody>
            { products.map( product => {
                return (
                    <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>{product.count}</td>
                        <td>{product.price}</td>
                    </tr>
                )
            })}
            </tbody>
        </table>
    )
}