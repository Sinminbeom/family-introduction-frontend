import React, { Component,Fragment } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import ReactHtmlParser from 'react-html-parser';
import './ReadBoardComponent.css';

class ReadBoardComponent extends Component {
    constructor(props) {
        super(props);

        
        this.state = {
            title: '',
            contents: '',
        }

        
    }

    componentDidMount(){
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');

        fetch('http://192.168.68.128/BoardGet.php?' + new URLSearchParams({ boardseq: boardseq })
        ).then(res => res.json()).then((response) => {
            this.setState({ title: response[0].boardtitle});
            this.setState({ contents: response[0].boardcontent});
        });
    }

    onUpdateClick = (event) =>{
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');
        this.props.history.push('/board-detail?boardseq='+boardseq);
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
                        <Button onClick={this.onListClick}>목록</Button>
                    </div>
                </div>
                
            </Fragment>
        );
    }
}

export default ReadBoardComponent;