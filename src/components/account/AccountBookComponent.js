import React, { Component, Fragment } from 'react';
import { Button, Table } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';

class AccountBookComponent extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            accountbook: []
        }

       

    }

    render() {
        return (
            <Fragment>
                {/* <Table className="accountbook-table">
                    <thead>
                        <tr>
                            <th>일자</th>
                            <th>구분</th>
                            <th>세부내용</th>
                            <th>금액</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.accountbook.map(
                                accountbook => 
                                <tr key = {accountbook.Date} id={accountbook.Date} onClick={this.onClick}>
                                    <td > {accountbook.Date}  </td>
                                    <td> {accountbook.Type} </td>
                                    <td> {accountbook.DetailContents} </td>
                                    <td> {accountbook.Price} </td>
                                </tr>
                            )
                        }
                    </tbody>
                    </Table>
                <Form.Row>
                    <Col>
                        <Form.Control type="text" placeholder="Normal text" />
                    </Col>
                    <Col>
                        <Form.Control type="text" placeholder="Normal text" />
                    </Col>
                    <Col>
                        <Button>목록</Button>
                    </Col>
                </Form.Row> */}
            </Fragment>
        );
    }
}

export default AccountBookComponent;