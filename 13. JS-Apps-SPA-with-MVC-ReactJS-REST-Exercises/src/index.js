import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { IndexRoute, Router, Route, browserHistory } from 'react-router';
import Catalog from './components/catalog/CatalogPage';
import About from './components/about/AboutPage';
import Register from './components/register/RegisterPage';
import Login from './components/login/LoginPage';
import Home from './components/home/HomePage';
import Create from './components/create/CreatePage';
import Edit from './components/edit/EditPage';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={Home}/>
            <Route path="catalog" component={Catalog}/>
            <Route path="about" component={About}/>
            <Route path="register" component={Register}/>
            <Route path="login" component={Login}/>
            <Route path="create" component={Create}/>
            <Route path="edit/:teamId" component={Edit}/>
        </Route>
    </Router>,
    document.getElementById('root'));

