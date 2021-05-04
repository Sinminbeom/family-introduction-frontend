import React, { Component } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import Editor from './EditorComponent';


class BoardDetailComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            contents: '',
        }

       
        this.changeTitleHandler = this.changeTitleHandler.bind(this);
        this.changeContentsHandler = this.changeContentsHandler.bind(this);
        this.createBoard = this.createBoard.bind(this);

    }

    componentDidMount() {
        const search = this.props.location.search;
        const params = new URLSearchParams(search);
        const boardseq = params.get('boardseq');

        fetch('http://192.168.68.128/BoardGet.php?' + new URLSearchParams({ boardseq: boardseq })
        ).then(res => res.json()).then((response) => {
            this.setState({ title: response[0].boardtitle});
            this.setState({ contents: response[0].boardcontent});
        });

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

        try {
            fetch('http://192.168.68.128/BoardSave.php',{ 
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
            <div>
                <h3 className="text-center">새글을 작성해주세요</h3>
                <div className = "card-body">
                    <form>
                        <div className = "form-group">
                            <Form.Label> Title </Form.Label>
                            <Form.Control type="text" placeholder="title" name="title" className="form-control" 
                            value={this.state.title} onChange={this.changeTitleHandler}/>
                        </div>
                        <Editor value={this.state.contents} onChange={this.changeContentsHandler} />
                        <div>&nbsp;</div><div>&nbsp;</div>
                        <Button className="btn btn-success" onClick={this.createBoard}>Save</Button>
                        <Button className="btn btn-danger" onClick={this.cancel.bind(this)} style={{marginLeft:"10px"}}>Cancel</Button>
                    </form>
                </div>

            </div>
        );
    }
}

export default BoardDetailComponent;