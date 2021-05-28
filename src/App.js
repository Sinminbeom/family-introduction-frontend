import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ListBoardComponent from './components/board/ListBoardComponent';
import ReadBoardComponent from './components/board/ReadBoardComponent';
import BoardDetailComponent from './components/board/BoardDetailComponent';
import HeaderComponent from './components/header/HeaderComponent';
import CalendarComponent from './components/calendar/CalendarComponent';
import AccountBookComponent from './components/account/AccountBookComponent';

class App extends Component{
    constructor(props){
        super(props);
    
    }
    render(){
        return( 
            <Router>
                <div className="app-main">
                    <div className="app-main-header">
                        <HeaderComponent/>
                    </div>
                    <div className="app-main-contents">
                        <BrowserRouter basename='/minbeom/'>
                            <Switch>
                                <Route path = "/" exact component = {ListBoardComponent}></Route>
                                <Route path = "/board" component = {ListBoardComponent}></Route>
                                <Route path = "/board-detail" component = {BoardDetailComponent}></Route>
                                <Route path = "/board-read" component = {ReadBoardComponent}></Route>
                                <Route path = "/calendar" component = {CalendarComponent}></Route>
                                <Route path = "/accountbook" component = {AccountBookComponent}></Route>
                            </Switch>
                        </BrowserRouter>
                    </div>
                </div>
            </Router>
        );
    }
}

export default App;