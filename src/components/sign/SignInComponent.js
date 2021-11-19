import {Button, Form, Input} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Route} from "react-router-dom";
import React, {Fragment, useEffect, useState} from "react";
import {Redirect} from "react-router";
import { PostServiceComponent } from '../service/ServiceComponent';
import './SignInComponent.css';

const SignInComponent = () => {

    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess,setIsSuccess] = useState(false);

    useEffect(() => {
        if(isValid){
            form.setFields([{
                name: "email",
                errors: [error],
            }]);
        }
    }, [isValid,error]);

    const SignInGetCallBack = (result) => {
        if(!result[0].Status){
            setIsSuccess(true);
            window.localStorage.setItem('UserSeq',result[0].Message);
        }
        else{
            alert(result[0].Message);
            setError(result[0].Message);
            setIsValid(true);
        }
      }

    function onFinish(values) {
        setIsValid(false);
        setError("");

        var formData = new FormData();
        formData.append('UserName',values.name);
        formData.append('Password',values.password);
        PostServiceComponent('http://49.168.71.214:8000/SignInGet.php',formData,SignInGetCallBack);

    }


    return(
        <div className='login'>
            <Form form={form} name={"normal_login"}
                  className={"login-form"}
                  initialValues={{remember:true}}
                  onFinish={onFinish}
                  xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}
            >
                <h2 className='loginheader'>Login</h2>
                <Form.Item
                    name={"name"}
                    className='idForm'
                    rules={
                        [{
                            required: true,
                            message: 'Please Input your Username'
                        }]
                    }>
                    <Input className="id" prefix={<UserOutlined className={"site-form-item-icon"} />} placeholder={'이름(아이디)'}/>
                </Form.Item>
                <Form.Item
                    name={"password"}
                    className='passForm'
                    rules={
                        [{
                            required: true,
                            messaeg: "please input your Password"
                        }]
                    }>
                    <Input
                        className="pw"
                        prefix={<LockOutlined className={"site-form-item-icon"}/>}
                        type={"password"}
                        placeholder={"비밀번호"}
                    />
                </Form.Item>
                <Button type={"primary"} htmlType={"submit"} className={"signbtn"}>
                    로그인
                </Button>
                <div className='bottomText'>
                    <Link to={"/signup"}>회원가입</Link>
                </div>
            </Form>
            <Route>
                {isSuccess?<Redirect to="/board" />:''}
            </Route>
        </div>
    )
}

export default SignInComponent;