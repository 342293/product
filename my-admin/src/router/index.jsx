import React,{Component} from 'react'
import {HashRouter as Router,Route} from 'react-router-dom'
import product from "../pages/product/product";

const router = () => {
    return (
        <Router>
            <Route path="/" component={ product }></Route>
        </Router>
    )
}

export default router