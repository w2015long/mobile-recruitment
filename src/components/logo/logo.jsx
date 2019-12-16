import React from 'react';
import logo from 'assets/images/logo/logo.png'
import './logo.less'

export default function Logo() {
    return (
        <div className="container">
            <img className='logo-img' src={logo} alt="logo"/>
        </div>
    )

};