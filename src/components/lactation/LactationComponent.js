import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Checkbox, DatePicker, Typography, Row, Switch } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { PostServiceComponent } from '../service/ServiceComponent';
import '../board/antdCustomize.less';
import './LactationComponent.css';

const { Text } = Typography;

const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form} >
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
};

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    isCheck,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);

    const toggleEdit = () => {
      setEditing(!editing);
      form.setFieldsValue({
        [dataIndex]: record[dataIndex],
      });
    };
    
    const save = async () => {
      try {
        const values = await form.validateFields();

        // console.log(values);
        // console.log(record);
        toggleEdit();
        handleSave({ ...record, ...values });
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    const change = (e) => {
      try{
        record[dataIndex] = (record[dataIndex] == '1' ? '0' : '1');
        handleSave({ ...record});
      } catch (errInfo) {
        console.log('Save failed:', errInfo);
      }
    };

    let childNode = children;

    if (editable) {
      childNode = editing ? (
        <Form.Item
          style={{
            margin: 0,
          }}
          name={dataIndex}
          // rules={[
          //   {
          //     required: true,
          //     message: `${title} is required.`,
          //   },
          // ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save}/>
        </Form.Item>
      ) : isCheck ? <Checkbox checked={children[1] == 1 ? true : false} onChange={change}/> : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    
    return <td {...restProps}>{childNode}</td>;
  };


  
function LactationComponent(props) {
  const [dataSource, setDataSource] = useState([]);
  const [count, setCount] = useState(2);
  // const [checked, setChecked] = useState(false);
  // const [weight,setWeight] = useState(0);
  // const [height,setHeight] = useState(0);
  // const [temperature,setTemperature] = useState(0);
  const [Isbath,setIsbath] = useState(false);
  // const [remark,setRemark] = useState('');
  const [inputs, setInputs] = useState({
    Weight: 0,
    Height: 0,
    Temperature: 0,
    Remark: '',
  })

  const {Weight,Height,Temperature,Remark} = inputs;
  const onChange = e => {
    setInputs({
        ...inputs,
        [e.target.name]: e.target.value
    });
  };
  const onChangeCheck = e => {
    setIsbath(e);
  }
  const handleDelete = (key) => {
    // const dataSource = [...dataSource];
    // this.setState({
    //   dataSource: dataSource.filter((item) => item.key !== key),
    // });
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const LactationSaveCallBack = (result) => {
    console.log(result);
    if(!result[0].Status){
      alert('저장되었습니다.');
    }
    else{
      alert(result[0].Message);
    }
  }
  
  const LactationAddInfoSaveCallBack = (result) =>{
    // if(!result[0].Status){
    //   alert('저장되었습니다.');
    // }
    // else{
    //   alert(result[0].Message);
    // }
  }
  const LactationAddInfoQueryCallBack = (result) => {
    console.log(result);
    setInputs({
      ...inputs,
      Weight: result[0].Weight,
      Height: result[0].Height,
      Temperature: result[0].Temperature,
      Remark: result[0].Remark

    });
    switch (result[0].Isbath)
    {
      case '1' :
        return setIsbath(true);
      case '0' :
        return setIsbath(false);
    }


  }
  const LactationSave = (event) => {
    // const newData = {
    //   key: count,
    //   name: `Edward King ${count}`,
    //   age: '32',
    //   address: `London, Park Lane no. ${count}`,
    // };
    // //setDataSource([...dataSource, newData]);
    // setDataSource(dataSource.concat(newData));
    // setCount(count + 1);
    event.preventDefault();

    var lactations = new FormData();

    lactations.append('Lactations',JSON.stringify(dataSource));
    lactations.append('UserSeq',window.localStorage.getItem('UserSeq'));

    PostServiceComponent('http://49.168.71.214:8000/LactationSave.php',lactations,LactationSaveCallBack);

    var lactationaddinfo = new FormData();

    lactationaddinfo.append('LactationDate',dataSource[0].LactationDate);
    lactationaddinfo.append('Weight',Weight);
    lactationaddinfo.append('Height',Height);
    lactationaddinfo.append('Temperature',Temperature);
    lactationaddinfo.append('Isbath',Isbath ? '1' : '0');
    lactationaddinfo.append('Remark',Remark);
    lactationaddinfo.append('UserSeq',window.localStorage.getItem('UserSeq'));

    PostServiceComponent('http://49.168.71.214:8000/LactationAddInfoSave.php',lactationaddinfo,LactationAddInfoSaveCallBack);
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const DateSaveCallBack = (response) => {
        
    for(let i=0; i<response.length; i++)
    {
      // response[i]['RowNum'] = i + 1;
      response[i]['key'] = response[i]['LactationSeq'];
      response[i]['LactationHour'] = response[i]['LactationHour'] + '시';
    }

    setDataSource(response);
    console.log(dataSource);

  }
  const onChangeDatePicker = (e) =>{
    var LactationDate = new FormData();

    LactationDate.append('LactationDate',e.format('YYYYMMDD'));
    LactationDate.append('UserSeq',localStorage.getItem('UserSeq'));

    PostServiceComponent('http://49.168.71.214:8000/LactationDateQuery.php',LactationDate,DateSaveCallBack);

    var LactationAddInfo = new FormData();

    LactationAddInfo.append('LactationDate',e.format('YYYYMMDD'));

    PostServiceComponent('http://49.168.71.214:8000/LactationAddInfoQuery.php',LactationAddInfo,LactationAddInfoQueryCallBack);
  }

  const columns = [
    // {
    //   dataIndex: 'RowNum',
    //   fixed: 'left',
    //   width: '4%',
    //   editable: true,
    //   align: 'center'
    // },
    {
      title: '시간',
      dataIndex: 'LactationHourType',
      align: 'center',
      colSpan:2,
      render: (value, row, index) => {
        
        const obj = {
          children: value,
          props: {},
        };

        if (index === 0) {
          obj.props.rowSpan = 12;
        }
        if (index === 1) {
          obj.props.rowSpan = 0;
        }
        if (index === 2) {
          obj.props.rowSpan = 0;
        }
        if (index === 3) {
          obj.props.rowSpan = 0;
        }
        if (index === 4) {
          obj.props.rowSpan = 0;
        }
        if (index === 5) {
          obj.props.rowSpan = 0;
        }
        if (index === 6) {
          obj.props.rowSpan = 0;
        }
        if (index === 7) {
          obj.props.rowSpan = 0;
        }
        if (index === 8) {
          obj.props.rowSpan = 0;
        }
        if (index === 9) {
          obj.props.rowSpan = 0;
        }
        if (index === 10) {
          obj.props.rowSpan = 0;
        }
        if (index === 11) {
          obj.props.rowSpan = 0;
        }

        if (index === 12) {
          obj.props.rowSpan = 12;
        }
        if (index === 13) {
          obj.props.rowSpan = 0;
        }
        if (index === 14) {
          obj.props.rowSpan = 0;
        }
        if (index === 15) {
          obj.props.rowSpan = 0;
        }
        if (index === 16) {
          obj.props.rowSpan = 0;
        }
        if (index === 17) {
          obj.props.rowSpan = 0;
        }
        if (index === 18) {
          obj.props.rowSpan = 0;
        }
        if (index === 19) {
          obj.props.rowSpan = 0;
        }
        if (index === 20) {
          obj.props.rowSpan = 0;
        }
        if (index === 21) {
          obj.props.rowSpan = 0;
        }
        if (index === 22) {
          obj.props.rowSpan = 0;
        }
        if (index === 23) {
          obj.props.rowSpan = 0;
        }

        return obj;
      },
    },
    {
      title: '시(Hour)',
      dataIndex: 'LactationHour',
      align: 'center',
      colSpan:0
    },
    {
      title: '모유',
      editable: true,
      children: [
                  {
                    title: '분', //모유(분)
                    dataIndex: 'BreastMilkMinute',
                    editable: true,
                    align: 'center'
                  },
                  {
                    title: 'ml', //모유(ml)
                    dataIndex: 'BreastMilkML',
                    editable: true,
                    align: 'center'
                  },
                ]
    },
    {
      title: '분유',
      editable: true,
      children: [
                  {
                    title: '분', //분유(분)
                    dataIndex: 'PowderedMilkMinute',
                    editable: true,
                    align: 'center'
                  },
                  {
                    title: 'ml', //분유(ml)
                    dataIndex: 'PowderedMilkML',
                    editable: true,
                    align: 'center'
                  },
                ]
    },
    {
      title: '유축',
      editable: true,
      children: [
                  {
                    title: '분', //유축(분)
                    dataIndex: 'BreastPumpMinute',
                    editable: true,
                    align: 'center'
                  },
                  {
                    title: 'ml', //유축(ml)
                    dataIndex: 'BreastPumpML',
                    editable: true,
                    align: 'center'
                  },
                ]
    },
    {
      title: '소변',
      dataIndex: 'IsPee',
      align: 'center',
      editable: true,
      isCheck: true
    },
    {
      title: '대변',
      dataIndex: 'IsPoop',
      align: 'center',
      editable: true,
      isCheck: true
    },
    {
      title: '기타',
      dataIndex: 'etc',
      editable: true,
      align: 'center'
    },
    // {
    //   title: 'operation',
    //   dataIndex: 'operation',
    //   render: (_, record) =>
    //     dataSource.length >= 1 ? (
    //       <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
    //         <a>Delete</a>
    //       </Popconfirm>
    //     ) : null,
    // },
  ];


  
  // const columnsArr = columns.map((col) => {
  //   if (!col.editable) {
  //     // console.log(col);
  //     return col;
  //   }

  //   // if(col.children){
  //   //   console.log(col.children[0].editable);
  //   //   return {
  //   //     ...col,
  //   //     onCell: (record) => ({
  //   //       record,
  //   //       editable: col.children[0].editable,
  //   //       dataIndex: col.dataIndex,
  //   //       title: col.title,
  //   //       handleSave: handleSave,
  //   //       isCheck:col.isCheck
  //   //     })
  //   //   }
  //   // }

  //   return {
  //     ...col,
  //     onCell: (record) => ({
  //       record,
  //       editable: col.editable,
  //       dataIndex: col.dataIndex,
  //       title: col.title,
  //       handleSave: handleSave,
  //       isCheck:col.isCheck
  //     }),
  //   };


  // });

  const mapColumns = col => {
    if (!col.editable) {
      return col;
    }
    const newCol = {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        isCheck:col.isCheck
      })
    };
    if (col.children) {
      newCol.children = col.children.map(mapColumns);
    }
    return newCol;
  };

  const columnsArr = columns.map(mapColumns);

  function onFinish(values) {

    // var formData = new FormData();
    // formData.append('UserName',values.name);
    // formData.append('Password',values.password);
    // PostServiceComponent('http://49.168.71.214:8000/SignInGet.php',formData,SignInGetCallBack);

  }

  return (
  <div className='lactation'>
    <div className='lactationQuery'>
      <DatePicker onChange={onChangeDatePicker}/>
      <Button onClick={LactationSave} type="primary">
        저장
      </Button>
    </div>
    <div className='lactationDate'>
      {/* <div className='minbeom'><MenuUnfoldOutlined /></div> */}
      <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={columnsArr}
      pagination={false}
      scroll={{ x: 2000, y: 2000 }}
      style={{ textAlign: 'center'}}
      
      summary={pageData => {  
        
        let TotalBreastMilkML = 0;
        let TotalPowderedMilkML = 0;
        let TotalBreastPumpML = 0;

        pageData.forEach(({ BreastMilkML, PowderedMilkML, BreastPumpML }) => {
          TotalBreastMilkML += BreastMilkML;
          TotalPowderedMilkML += PowderedMilkML;
          TotalBreastPumpML += BreastPumpML;
        });

        return (
          <>
            <Table.Summary.Row>
              <Table.Summary.Cell colSpan={2}>Total</Table.Summary.Cell> 
              <Table.Summary.Cell colSpan={2}>
                <Text type="danger" style={{ textAlign: 'center'}}>{TotalBreastMilkML}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2}>
                <Text type="danger" style={{ textAlign: 'center'}}>{TotalPowderedMilkML}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell colSpan={2}>
                <Text type="danger" style={{ align: 'center'}} >{TotalBreastPumpML}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
      
      />
    </div>
    <div className='addinfo'>
      <div className='addinfo-left'>
        <Form>
          <Form.Item className='description' label="발달사항">
            <Input.TextArea name='Remark' onChange={onChange} value={Remark}/>
          </Form.Item>
        </Form>
      </div>
      <div className='addinfo-right'>
        <Form className='addinfo-form'
              initialValues={{remember:true}}
              onFinish={onFinish}
              // xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}
        >
          <Row>
            <Form.Item  className='weight'
                        rules={
                          [{
                              required: true,
                              message: 'Please Input your Username'
                          }]
                        }
                        label="몸무게(kg)">
              <Input name='Weight' onChange={onChange} placeholder={'몸무게(kg)'} value={Weight}/>
            </Form.Item>
            <Form.Item  className='height'
                        rules={
                          [{
                              required: true,
                              messaeg: "please input your Password"
                          }]
                        }
                        label="키(cm)">
              <Input name='Height' onChange={onChange} placeholder={"키(cm)"} value={Height}/>
            </Form.Item>
          </Row>
          <Row>
            <Form.Item  className='temperature'
                        rules={
                          [{
                              required: true,
                              message: 'Please Input your Username'
                          }]
                        }
                        label="체온(℃)">
              <Input name='Temperature' onChange={onChange} placeholder={'체온(℃)'} value={Temperature}/>
            </Form.Item>
            <Form.Item  className='isbath'
                        rules={
                          [{
                              required: true,
                              messaeg: "please input your Password"
                          }]
                        }
                        label="목욕">
              <Switch name='Isbath' checked={Isbath ? true : false}  onChange={onChangeCheck} />
            </Form.Item>
          </Row>
        </Form>
      </div>

    </div>
    
  </div>
  );
}

export default LactationComponent;