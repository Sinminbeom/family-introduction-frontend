import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form, Checkbox } from 'antd';
import { PostServiceComponent } from '../service/ServiceComponent';
import '../board/antdCustomize.less';
const EditableContext = React.createContext(null);

const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
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
          rules={[
            {
              required: true,
              message: `${title} is required.`,
            },
          ]}
        >
          <Input ref={inputRef} onPressEnter={save} onBlur={save} />
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
  const [dataSource, setDataSource] = useState(
  [        
    {
      key:'1',
      RowNum: '1',
      TimeType: '오전',
      LactationHour : '2시',
      BreastMilkMinute: '10',//모유
      BreastMilkML: '120',
      PowderedMilkMinute: '20',//분유
      PowderedMilkML:'150',
      BreastPumpMinute:'30', //유축
      BreastPumpML:'180',
      IsPee:'1',
      IsPoop:'0',
      etc:'달콩이는 귀여움'
    },
    {
      key:'2',
      RowNum: '2',
      TimeType: '오전',
      LactationHour : '2시',
      BreastMilkMinute: '10',//모유
      BreastMilkML: '120',
      PowderedMilkMinute: '20',//분유
      PowderedMilkML:'150',
      BreastPumpMinute:'30', //유축
      BreastPumpML:'180',
      IsPee:'0',
      IsPoop:'1',
      etc:'홍수빈 똥싸게 생김'
    }
  ]);
  const [count, setCount] = useState(2);
  
  
  const handleDelete = (key) => {
    // const dataSource = [...dataSource];
    // this.setState({
    //   dataSource: dataSource.filter((item) => item.key !== key),
    // });
    setDataSource(dataSource.filter((item) => item.key !== key));
  };

  const handleAdd = () => {
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: '32',
      address: `London, Park Lane no. ${count}`,
    };
    //setDataSource([...dataSource, newData]);
    setDataSource(dataSource.concat(newData));
    setCount(count + 1);

  };
  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  };

  const onChange = () => {
    // const newData = [...dataSource];
    // const index = newData.findIndex((item) => row.key === item.key);
    // console.log(form.validateFields());
    console.log(record);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const columns = [
    {
      dataIndex: 'RowNum',
      fixed: 'left',
      align: 'center'
    },
    {
      title: '시간',
      dataIndex: 'TimeType',
      editable: true,
      align: 'center',
      colSpan:2
    },
    {
      title: '시(Hour)',
      dataIndex: 'LactationHour',
      editable: true,
      align: 'center',
      colSpan:0
    },
    {
      title: '모유',
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
    {
      title: 'operation',
      dataIndex: 'operation',
      render: (_, record) =>
        dataSource.length >= 1 ? (
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.key)}>
            <a>Delete</a>
          </Popconfirm>
        ) : null,
    },
  ];

  const columnsArr = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        isCheck:col.isCheck
      }),
    };
  });

  return (
    <div>
    <Button
      onClick={handleAdd}
      type="primary"
      style={{
        marginBottom: 16,
      }}
    >
      Add a row
    </Button>
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={columnsArr}
      pagination={false}
      scroll={{ x: 2000, y: 200 }}
    />
  </div>
  );
}

export default LactationComponent;