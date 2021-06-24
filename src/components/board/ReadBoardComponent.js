import React, { Component,Fragment } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import './ReadBoardComponent.css';
import Commment from './Comment';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            title: '',
            contents: '',
            seq:0
        }

        
    }

    componentDidMount(){
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');

        fetch('http://49.168.71.214:8000/BoardGet.php?' + new URLSearchParams({ boardseq: boardseq })
        ).then(res => res.json()).then((response) => {
            this.setState({ seq: boardseq});
            this.setState({ title: response[0].boardtitle});
            this.setState({ contents: response[0].boardcontent});
            console.log(this.state.contents);
        });
    }

    onUpdateClick = (event) =>{
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');
        this.props.history.push('/board-detail?boardseq='+boardseq);
    }

    deleteBoard = (event) => {
        event.preventDefault();

        var board = new FormData();
        board.append('boardseq',this.state.seq);

        try {
            fetch('http://49.168.71.214:8000/BoardDelete.php',{ 
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

    onListClick = (event) =>{
            this.props.history.push('/board');
    }

    render() {
        return (
            <Fragment>
                <div className='ReadBoard'>
                    <div className='ReadHeader'>
                        <Form.Label>{this.state.title}</Form.Label>
                    </div>
                    <div>{ReactHtmlParser(this.state.contents)}</div>
                    <div>
                        <Button onClick={this.onUpdateClick}>수정</Button>
                        <Button onClick={this.deleteBoard} style={{marginLeft:"10px"}}>삭제</Button>
                        <Button onClick={this.onListClick} style={{marginLeft:"10px"}}>목록</Button>
                    </div>
                    <div>
                        <Comment postId={videoId} commentList={Comments} refreshFunction={refreshFunction} />
                    </div>
                </div>
                
            </Fragment>
        );
    }
}

export default ReadBoardComponent;