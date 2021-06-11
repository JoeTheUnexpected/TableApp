/* eslint-disable import/no-anonymous-default-export */
import React from 'react';

export default props => (
    props.sortType === 'asc' ? <small>▼</small> : <small>▲</small>
)