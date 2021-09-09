import React, { Component, Fragment } from 'react';
import Editor from './EditorComponent';
import './BoardDetailComponent.css';
import { Button, Input } from 'antd';
import { PostServiceComponent } from '../service/ServiceComponent';

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
        this.BoardSaveCallBack = this.BoardSaveCallBack.bind(this);

    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const BoardSeq = params.get('boardseq');

        if (BoardSeq != null)
        {
            fetch('http://49.168.71.214:8000/BoardGet.php?' + new URLSearchParams({ BoardSeq: BoardSeq })
            ).then(res => res.json()).then((response) => {
                this.setState({ title: response[0].BoardTitle});
                this.setState({ contents: response[0].BoardContent});
                this.setState({ seq: BoardSeq});
            });
        }
 

    }

    changeTitleHandler = (event) => {
        this.setState({title: event.target.value});
    }
    //게시판 내용에 사진이 들어가면 $을 문자로 입력하기 위해 amp;가 추가되는것을 제거
    changeContentsHandler = (value) => {
        this.setState({contents: value.replace('$amp;','$')});
    }

    cancel() {
        this.props.history.push('/board');
    }

    BoardSaveCallBack() {
        this.props.history.push('/board');
    }

    createBoard = (event) => {
        event.preventDefault();

        var board = new FormData();

        if(!this.state.title){
            return alert('제목을 입력해주세요.');
        }
      
        if(!this.state.contents){
            return alert('내용을 입력해주세요.'); 
        }

        board.append('BoardSeq',this.state.seq);
        board.append('BoardTitle',this.state.title);
        board.append('BoardContent',this.state.contents);

        PostServiceComponent('http://49.168.71.214:8000/BoardSave.php',board,this.BoardSaveCallBack);

    }
    
    render() {
        return (
            <>
                <label> Title </label>
                <Input type="text" placeholder="title" name="title" className="form-control" 
                    value={this.state.title} onChange={this.changeTitleHandler}/>

                <Editor value={this.state.contents} onChange={this.changeContentsHandler} />
                <div style={{marginTop:"70px"}}>
                <Button className="btn btn-success" onClick={this.createBoard}>저장</Button>
                <Button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>취소</Button>
                </div>
                
            </>
        );
    }
}

export default BoardDetailComponent;