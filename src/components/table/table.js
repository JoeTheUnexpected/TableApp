import React from 'react';
import SortIcon from '../sortIcon/sortIcon.js';

// eslint-disable-next-line import/no-anonymous-default-export
export default props => (
    <table className="table mt-3">
        <thead>
            <tr>
                <th onClick={props.onSort.bind(null, 'id')}>id {props.sortField === 'id' ? <SortIcon sortType={props.sortType} /> : null}</th>
                <th onClick={props.onSort.bind(null, 'firstName')}>firstName {props.sortField === 'firstName' ? <SortIcon sortType={props.sortType} /> : null}</th>
                <th onClick={props.onSort.bind(null, 'lastName')}>lastName {props.sortField === 'lastName' ? <SortIcon sortType={props.sortType} /> : null}</th>
                <th onClick={props.onSort.bind(null, 'email')}>email {props.sortField === 'email' ? <SortIcon sortType={props.sortType} /> : null}</th>
                <th onClick={props.onSort.bind(null, 'phone')}>phone {props.sortField === 'phone' ? <SortIcon sortType={props.sortType} /> : null}</th>
            </tr>
        </thead>
        <tbody>
            {props.data.map(item => (
                <tr 
                    key={item.id + item.phone}
                    onClick={props.onSelectRow.bind(null, item)}
                >
                    <td>{item.id}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>{item.email}</td>
                    <td>{item.phone}</td>
                </tr>
            ))}
        </tbody>
    </table>
);