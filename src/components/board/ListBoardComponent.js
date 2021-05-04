import React, { Component,Fragment } from 'react';
import { Navbar, Nav, Button,Form, FormControl, NavDropdown, Modal, Table} from 'react-bootstrap';
import './ListBoardComponent.css';

class ListBoardComponent extends Component {
    constructor(props) {
        super(props)
        
        this.state = { 
            boards: [],
            boardseq: '',
        }
		
		this.createBoard = this.createBoard.bind(this);
        this.onClick = this.onClick.bind(this);
    }

    componentDidMount() {
        try {
            fetch('http://192.168.68.128/BoardList.php',{ 
              method: 'POST',
              headers:{
              }
          }).then(res => res.json()).then((response) => {
            this.setState({ boards: response});
        });
        } catch (err) {
            return console.error('err',err);
        }

    }
	
	createBoard() {
        this.props.history.push('/board-detail/');
    }

    onClick = (event) =>{
        

        this.setState({boardseq:  event.currentTarget.getAttribute('id')}, () => { 
            this.props.history.push('/board-read?boardseq='+this.state.boardseq);
        });
        
        
        
    }

    render() {
        return (
        <Fragment>
            <div>
                <h2 className="text-center">육아일기</h2>
                
				<div className = "boardrow">
                    <Button className="btn btn-createboard" onClick={this.createBoard}> 글 작성</Button>
                </div>
                <div className ="boardrow">
                    <Table className="board-table">
                        <thead>
                            <tr>
                                <th>글 번호</th>
                                <th>타이틀 </th>
                                <th>작성일 </th>
                                <th>갱신일 </th>
                                <th>좋아요수</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.boards.map(
                                    board => 
                                    <tr key = {board.boardseq} id={board.boardseq} onClick={this.onClick}>
                                        <td > {board.boardseq}  </td>
                                        <td> {board.boardtitle} </td>
                                        <td> {board.createdtime} </td>
                                        <td> {board.updatedtime} </td>
                                        <td> {board.likes} </td>
                                        <td> {board.counts} </td>
                                    </tr>
                                )
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        </Fragment>
        );
    }
}

export default ListBoardComponent;