import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import Editor from './EditorComponent';
import './BoardDetailComponent.css';
import { Fragment } from 'react';


class BoardDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
            seq: 0
        }

       
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);

    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');
        if (boardseq != null)
        {
            fetch('http://49.168.71.214:8000/BoardGet.php?' + new URLSearchParams({ boardseq: boardseq })
            ).then(res => res.json()).then((response) => {
                this.setState({ title: response[0].boardtitle});
                this.setState({ contents: response[0].boardcontent});
                this.setState({ seq: boardseq});
            });
        }
 

    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }
    
    changeContentsHandler = (value) => {
        this.setState({contents: value});
    }
    
    createBoard = (event) => {
        event.preventDefault();

        var board = new FormData();
        board.append('boardtitle',this.state.title);
        board.append('boardcontent',this.state.contents);
        board.append('boardseq',this.state.seq);

        try {
            fetch('http://49.168.71.214:8000/BoardSave.php',{ 
              method: 'POST',
              headers:{

              },
              body: board
          }).then(res => res.json()).then(response => {
            this.props.history.push('/board');
            
        });
        } catch (err) {
            return console.error('err',err);

        }

    }
    
    cancel() {
        this.props.history.push('/board');
    }


    


    render() {
        return (
  
                <div className="board-detail-main">
                    <div className="board-detail-header">
                        <h3 className="text-center">새글을 작성해주세요</h3>
                    </div>
                    <div className = "board-detail">
                        <form className="board-detail-form">
                            <div className = "form-group1">
                                <Form.Label> Title </Form.Label>
                                <Form.Control type="text" placeholder="title" name="title" className="form-control" 
                                value={this.state.title} onChange={this.changeTitleHandler}/>
                            </div>
                            <div className = "form-group2">
                                <Editor value={this.state.contents} onChange={this.changeContentsHandler} />
                            </div>
                        </form>
                        <div className="board-detail-button">
                            <Button className="btn btn-success" onClick={this.createBoard}>저장</Button>
                            <Button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>취소</Button>
                        </div>
                    </div>
                </div>

        );
    }
}

export default BoardDetailComponent;