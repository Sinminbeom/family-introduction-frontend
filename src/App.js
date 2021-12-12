import './App.css';
import React, { Component } from 'react';
import {BrowserRouter, Route,Switch, Link, Redirect } from 'react-router-dom'; //
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

import { Button, Affix, Drawer, Layout, Menu } from 'antd';
import { MenuOutlined,  UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Header, Content, Footer, Sider } = Layout;

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

    render() {
        return (
        <BrowserRouter basename='/minbeom/'> {/*basename='/minbeom/' 1. 배포할때 이것을 빼면 라우팅 작동안함 2. npm start일 경우 이것을 빼지 않으면 작동안함(minbeom폴더에 있는 index.html 실행)*/}
            <Layout>
                <Sider breakpoint="lg" collapsedWidth="0" onBreakpoint={(broken) => { console.log(broken); }} onCollapse={(collapsed, type) => { console.log(collapsed, type); }} >
                    <div className="logo" />
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={["3"]}>
                        <Menu.Item key="1" icon={<UserOutlined />}>
                            <Link to='/board'>육아일기</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                            <Link to='/lactation'>수유일지</Link>
                        </Menu.Item>
                        <Menu.Item key="3" icon={<UploadOutlined />}>
                            <Link to='/listfiles'>용하 사진첩</Link>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content className='main-content' style={{margin: "24px 16px 0"}} >            
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
                    </Content>
                </Layout>
            </Layout>
        </BrowserRouter>
        );
    }
 
}

export default App;


