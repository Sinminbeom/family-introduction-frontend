import {Button, Form, Input, Upload, message} from "antd";
import {LockOutlined, MailOutlined, UserOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {Link, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import { ServiceComponent } from '../service/ServiceComponent';

const SignUpCommonent = () => {

    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess,setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        if(isValid){
            form.setFields([{
                name: "email",
                errors: [error],
            }]);
        }
    }, [isValid,error]);

    const CallBack = (result) => {
        if(result[0].STATE == 0){
            alert("회원가입이 완료되었습니다.");
            setIsSuccess(true);
        }
        else{
            alert(result[0].MESSAGE);
            setError(result[0].MESSAGE);
            setIsValid(true);
        }
    }

    function onFinish(values) {
        setIsValid(false);
        setError("");

        var formData = new FormData();

        formData.append('UserName',values.name);
        formData.append('Email',values.email);
        formData.append('Password',values.password);
        
        ServiceComponent('http://49.168.71.214:8000/SignUpSave.php',formData,CallBack);
        
    }
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }
    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          setLoading(true);
          return;
        }
        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, imageUrl =>
            this.setState({
              imageUrl,
              loading: false,
            }),
          );
        }
    };

    return(
        <>
            <Form form={form} name={"normal_login"}
                  className={"login-form"}
                  initialValues={{remember:true}}
                  onFinish={onFinish}
                  xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}
            >
                {/* <Form.Item>
                    <Upload
                        name="avatar"
                        listType="picture-card"
                        className="avatar-uploader"
                        showUploadList={false}
                        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                        beforeUpload={beforeUpload}
                        onChange={this.handleChange}
                    >
                        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    </Upload>
                </Form.Item> */}
                <Form.Item
                    name={"name"}
                    rules={
                        [{
                            required: true,
                            message: 'Please Input your Username'
                        }]
                    }>
                    <Input prefix={<UserOutlined className={"site-form-item-icon"}/>} placeholder={"이름(아이디)"}/>
                </Form.Item>
                <Form.Item
                    name={"email"}
                    rules={
                        [{
                            type: "email",
                            required: true,
                            message: 'Please Input your Email'
                        }]
                    }>
                    <Input prefix={<MailOutlined className={"site-form-item-icon"}/>} placeholder={"이메일"}/>
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
                        가입완료
                    </Button>
                     Or <Link to={"/signin"}>로그인</Link>
                </Form.Item>
            </Form>
            <Route>
                {isSuccess?<Redirect to="/signin" />:''}
            </Route>
        </>
    )
}

export default SignUpCommonent;