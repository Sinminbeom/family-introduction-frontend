import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, BrowserRouter as Router, Route,Switch, Link, Redirect } from 'react-router-dom'; //
import ListBoardComponent from './components/board/ListBoardComponent';
import ReadBoardComponent from './components/board/ReadBoardComponent';
import BoardDetailComponent from './components/board/BoardDetailComponent';
import LactationComponent from './components/lactation/LactationComponent';
// import HeaderComponent from './components/header/HeaderComponent';
// import CalendarComponent from './components/calendar/CalendarComponent';
// import AccountBookComponent from './components/account/AccountBookComponent';
import SignUpComponent from './components/sign/SignUpComponent';
import SignInComponent from './components/sign/SignInComponent';
import PrivateRouteComponent from './components/route/PrivateRouteComponent';
import PublicRouteComponent from './components/route/PublicRouteComponent';
import ListFilesComponent from './components/listfiles/ListFilesComponent';

import { Button, Affix, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';

class App extends Component{
    constructor(props){
        super(props);
        this.state = {
            top: 0,
            visible: false,
        }
    }
    showDrawer = () => {
        this.setState({visible: true});
    }
    onClose = () =>{
        this.setState({visible: false});
    }
    render(){
        return( 
        <>
            <Router>
                <div className="app-main">
                    {/* <div className="app-main-header">
                        <HeaderComponent/> 
                    </div> */}
                    <Affix style={{fontSize : '6px'}}>
                        <Button shape="circle" icon={<MenuOutlined />} onClick={this.showDrawer} style={{fontSize : '6px'}}>
                        </Button>
                    </Affix>
                    <Drawer title="메뉴" placement="left" onClose={this.onClose} visible={this.state.visible}>
                        <p><Link to='/board' onClick={() => window.location.href="/minbeom/board"}>육아일기</Link></p>
                        <p><Link to='/lactation' onClick={() => window.location.href="/minbeom/lactation"}>수유일지</Link></p>
                        <p><Link to='/listfiles' onClick={() => window.location.href="/minbeom/listfiles"}>용하 사진첩</Link></p>
                    </Drawer>
                    {/* <div className='minbeom12'>
                        <Button type="primary">fefe</Button>
                    </div> */}
                    <div className="app-main-contents">
                        <BrowserRouter basename='/minbeom/'> {/*basename='/minbeom/' 1. 배포할때 이것을 빼면 라우팅 작동안함 2. npm start일 경우 이것을 빼지 않으면 작동안함(minbeom폴더에 있는 index.html 실행)*/}
                            <Switch>
                                {/* <Route path = "/" exact component = {SignInComponent}></Route>
                                <Route path = "/board" component = {ListBoardComponent}></Route>
                                <Route path = "/board-read" component = {ReadBoardComponent}></Route>
                                <Route path = "/board-detail" component = {BoardDetailComponent}></Route>
                                <Route path = "/lactation" component = {LactationComponent}></Route>
                                <Route path = "/calendar" component = {CalendarComponent}></Route>
                                <Route path = "/accountbook" component = {AccountBookComponent}></Route>
                                <Route path = "/signup" component = {SignUpComponent}></Route>
                                <Route path = "/signin" component = {SignInComponent}></Route> */}

                                <PublicRouteComponent  path = "/" exact component = {SignInComponent}/>
                                <PrivateRouteComponent path = "/board" component = {ListBoardComponent}/>
                                <PrivateRouteComponent path = "/board-read" component = {ReadBoardComponent}/>
                                <PrivateRouteComponent path = "/board-detail" component = {BoardDetailComponent}/>
                                <PrivateRouteComponent path = "/lactation" component = {LactationComponent}/>
                                <PrivateRouteComponent path = "/signup" component = {SignUpComponent}/>
                                <PrivateRouteComponent path = "/signin" component = {SignInComponent}/>
                                <PrivateRouteComponent path = "/listfiles" component = {ListFilesComponent}/>
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


