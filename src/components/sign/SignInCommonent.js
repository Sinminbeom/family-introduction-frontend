import {Button, Form, Input} from "antd";
import {LockOutlined, MailOutlined, UserOutlined} from "@ant-design/icons";
import {Link, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import { PostServiceComponent } from '../service/ServiceComponent';

const SignInCommonent = () => {

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
        if(result[0].State == 0){
            setIsSuccess(true);
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
        <>
            <Form form={form} name={"normal_login"}
                  className={"login-form"}
                  initialValues={{remember:true}}
                  onFinish={onFinish}
                  xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}
            >
                <Form.Item
                    name={"name"}
                    rules={
                        [{
                            required: true,
                            message: 'Please Input your Username'
                        }]
                    }>
                    <Input prefix={<UserOutlined className={"site-form-item-icon"} />} placeholder={'이름(아이디)'}/>
                </Form.Item>
                <Form.Item
                    name={"password"}
                    rules={
                        [{
                            required: true,
                            messaeg: "please input your Password"
                        }]
                    }>
                    <Input
                        prefix={<LockOutlined className={"site-form-item-icon"}/>}
                        type={"password"}
                        placeholder={"비밀번호"}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type={"primary"} htmlType={"submit"} className={"login-form-button"}>
                        로그인
                    </Button>
                    Or <Link to={"/signup"}>회원가입</Link>
                </Form.Item>
            </Form>
            <Route>
                {isSuccess?<Redirect to="/board" />:''}
            </Route>
        </>
    )
}

export default SignInCommonent;