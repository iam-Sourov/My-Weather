import React from 'react';
import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Root = () => {
    return (
        <div className={`min-h-screen bg-[url('https://myradar.com/static/background-a089d87ba11e1a4c45a8efa960b86092.jpg')] bg-cover bg-center`} >
            <Navbar></Navbar>
            <Outlet></Outlet>
        </div >
    );
};

export default Root;