import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, BrowserRouter as Router, Route,Switch } from 'react-router-dom'; //
import ListBoardComponent from './components/board/ListBoardComponent';
import ReadBoardComponent from './components/board/ReadBoardComponent';
import BoardDetailComponent from './components/board/BoardDetailComponent';
import LactationComponent from './components/lactation/LactationComponent';
// import HeaderComponent from './components/header/HeaderComponent';
// import CalendarComponent from './components/calendar/CalendarComponent';
// import AccountBookComponent from './components/account/AccountBookComponent';
import SignUpComponent from './components/sign/SignUpComponent';
import SignInComponent from './components/sign/SignInComponent';

import { List, Avatar, Space,Button } from 'antd';

class App extends Component{
    constructor(props){
        super(props);
    
    }

    render(){
        return( 
        <>
            <Router>
                <div className="app-main">
                    {/* <div className="app-main-header">
                        <HeaderComponent/> 
                    </div> */}
                    <div className="app-main-contents">
                        <BrowserRouter> {/*basename='/minbeom/' 1. 배포할때 이것을 빼면 라우팅 작동안함 2. npm start일 경우 이것을 빼지 않으면 작동안함(minbeom폴더에 있는 index.html 실행)*/}
                            <Switch>
                                <Route path = "/" exact component = {SignInComponent}></Route>
                                <Route path = "/board" component = {ListBoardComponent}></Route>
                                <Route path = "/board-read" component = {ReadBoardComponent}></Route>
                                <Route path = "/board-detail" component = {BoardDetailComponent}></Route>
                                <Route path = "/lactation" component = {LactationComponent}></Route>
                                {/* <Route path = "/calendar" component = {CalendarComponent}></Route>
                                <Route path = "/accountbook" component = {AccountBookComponent}></Route> */}
                                <Route path = "/signup" component = {SignUpComponent}></Route>
                                <Route path = "/signin" component = {SignInComponent}></Route>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </Router>
        </>
        );
    }
}

export default App;


