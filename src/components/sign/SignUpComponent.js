import {Button, Form, Input, Upload, message} from "antd";
import {LockOutlined, MailOutlined, UserOutlined, LoadingOutlined, PlusOutlined} from "@ant-design/icons";
import {Link, Route} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router";
import { PostServiceComponent } from '../service/ServiceComponent';

const SignUpComponent = () => {

    const [form] = Form.useForm();
    const [isValid, setIsValid] = useState(false);
    const [error, setError] = useState("");
    const [isSuccess,setIsSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    
    useEffect(() => {
        if(isValid){
            form.setFields([{
                name: "name",
                errors: [error],
            }]);
        }
    }, [isValid,error]);

    const SignUpSaveCallBack = (result) => {
        console.log(result);
        if(!result[0].Status){
            alert("회원가입이 완료되었습니다.");
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
        formData.append('Email',values.email);
        formData.append('Password',values.password);
        
        PostServiceComponent('http://49.168.71.214:8000/SignUpSave.php',formData,SignUpSaveCallBack);
        
    }
    
    const getBase64 = (img, callback) => {
        const reader = new FileReader();
        console.log(reader.result);
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
          getBase64(info.file.originFileObj, imageUrl =>  {setLoading(false); setImageUrl(imageUrl);  });
        //   getBase64(info.file.originFileObj, imageUrl =>
        //     this.setState({
        //       imageUrl,
        //       loading: false,
        //     }),
        //   );
        }
        
    };
    function beforeUpload(file) {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    }

    const uploadButton = (
        <div>
          {loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );

    return(
        <>
            <Form form={form} name={"normal_login"}
                  className={"login-form"}
                  initialValues={{remember:true}}
                  onFinish={onFinish}
                  xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}
            >
                <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    action="http://49.168.71.214:8000/uploads/IMG_4378.jpg"
                    //action='https://interactive-examples.mdn.mozilla.net/media/cc0-images/grapefruit-slice-332-332.jpg'
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {imageUrl ? <img src={'http://49.168.71.214:8000/uploads/IMG_4378.jpg'} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                    {/* {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton} */}
                </Upload>
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

export default SignUpComponent;