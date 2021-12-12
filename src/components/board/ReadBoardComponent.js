import React, { Component,Fragment } from 'react';

import ReactHtmlParser from 'react-html-parser';
import './ReadBoardComponent.css';
import Comment from './Comment';
import { PostServiceComponent, GetServiceComponent} from '../service/ServiceComponent';
import { List, Avatar, Space,Button,Switch } from 'antd';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        this.state = {
            title: '',
            contents: '',
            seq:0,
            comments: [],
        }
        this.CommentGetCallBack = this.CommentGetCallBack.bind(this);
        this.refreshFunction = this.refreshFunction.bind(this);
        this.BoardGetCallBack = this.BoardGetCallBack.bind(this);
        this.BoardDeleteCallBack = this.BoardDeleteCallBack.bind(this);
        setBoard();
    }

    CommentGetCallBack(result){
        this.setState({ comments: result});
        console.log(result);
    }

    BoardGetCallBack(result){
        this.setState({ title: result[0].BoardTitle});
        this.setState({ contents: result[0].BoardContent});
    }
    BoardDeleteCallBack(result){
        this.props.history.push('/board');
    }
    setBoard(){
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');
        this.setState({ seq: boardseq});

        GetServiceComponent('http://49.168.71.214:8000/BoardGet.php?' + new URLSearchParams({ boardseq: boardseq }),this.BoardGetCallBack);

        GetServiceComponent('http://49.168.71.214:8000/CommentQuery.php?' + new URLSearchParams({ boardseq: boardseq }),this.CommentGetCallBack);
        
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
        board.append('BoardSeq',this.state.seq);

        PostServiceComponent('http://49.168.71.214:8000/BoardDelete.php', board, this.BoardDeleteCallBack);
    }

    onListClick = (event) =>{
            this.props.history.push('/board');
    }

    refreshFunction(newComment) {
        //부모의 Comments state값을 업데이트하기위한 함수
        this.setState({ comments: this.state.Comments.concat(newComment)}); //자식들한테 값을 전달받아 Comments값 업데이트
        // setComments(Comments.concat(newComment)); 
    };

    render() {
        return (
            <Fragment>
                <div className='ReadBoard'>
                    <div className='ReadHeader'>
                        <span className="ant-form-text">{this.state.title}</span>
                    </div>
                    <div>{ReactHtmlParser(this.state.contents)}</div>
                    <div>
                        <Button onClick={this.onUpdateClick}>수정</Button>
                        <Button onClick={this.deleteBoard} style={{marginLeft:"10px"}}>삭제</Button>
                        <Button onClick={this.onListClick} style={{marginLeft:"10px"}}>목록</Button>
                    </div>
                    <div>
                        {/* <Comment postId={videoId} commentList={Comments} refreshFunction={refreshFunction} /> */}
                        <Comment  postSeq={this.state.seq} commentList={this.state.comments} refreshFunction={this.refreshFunction}/>
                    </div>
                </div>
                
            </Fragment>
        );
    }
}

export default ReadBoardComponent;