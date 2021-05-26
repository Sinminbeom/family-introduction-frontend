import './CalendarComponent.css';

import React, { Fragment, Component } from 'react';
import { Navbar, Nav, Button,Form, FormControl, NavDropdown, Modal} from 'react-bootstrap';
import moment from 'moment';
import "moment/locale/ko";
import  {Calendar,momentLocalizer}  from 'react-big-calendar';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import  DatePicker  from  "react-datepicker" ;



const localizer = momentLocalizer(moment);

class CalendarComponent extends Component{
  constructor(props){
    super(props);
    this.state ={
      calendarYM : moment(),
      today : moment(),
      selected : moment().format("YYYY-MM-DD"),
      showModal: false,
      title: '',
      start: new Date(), 
      end: new Date(), 
      event: []
    };
    
    this.moveMonth = this.moveMonth.bind(this);
    this.closeModal = this.closeModal.bind(this);
    // this.onChange = this.onChange.bind(this);
    

  }

  componentDidMount = () =>{
    try {
      fetch('http://49.168.71.214:8000/CalendarQuery.php',{ 
        method: 'POST',
        headers:{
        }
    }).then(res => res.json())
    .then(response => {
                          
                          for(let i = 0; i<response.length; i++)
                          {
                            response[i]['start'] =  new Date(response[i]['start'].toString());
                            response[i]['end'] =  new Date(response[i]['end'].toString());
                          }
                          
                          this.setState( {event: response} );   
                          console.log(this.state.event);
                      }
    );
    } catch (err) {
      return console.error('err',err);
    }
  }

  static defaultProps = {
    clickFn : ()=>{}
  }

  moveMonth = (month) => {
    this.setState({
        calendarYM : this.state.calendarYM.add(month,'M')
    })
  }

  changeSelected = (clickedDate) =>{
        
    if(moment(clickedDate).isSame(this.state.selected,'day')){
        this.props.clickFn(clickedDate);
        return;
    }

    this.setState({
        selected : clickedDate
    })

    this.props.clickFn(clickedDate)
    
    if(moment(clickedDate).isBefore(this.state.calendarYM,'month')){
        this.moveMonth(-1)
    }else if(moment(clickedDate).isAfter(this.state.calendarYM,'month')){
        this.moveMonth(1)
    }
  }



  onSubmit = () =>{
    var formData = new FormData();

    var start = moment(this.state.start).format('YYYY/MM/DD/HH:mm:ss');
    var end = moment(this.state.end).format('YYYY/MM/DD/HH:mm:ss');

    formData.append('title',this.state.title);
    formData.append('start',start);
    formData.append('end',end);

    try {
      fetch('http://49.168.71.214:8000/CalendarSave.php',{ 
        method: 'POST',
        headers:{ 
          // 'Content-Type': 'application/json',
          // 'Accept': 'application/json'
        },
        body: formData
    }).then(res => res.json())
    .then(response => { this.componentDidMount(); this.setState({showModal : false });});
    } catch (err) {
      return console.error('err',err);
    }
  }

  onTitleChange = (e) =>{
    this.setState({title : e.target.value });
  }

  onStartChange = (date) =>{
    this.setState({start : date });
  }

  onEndChange = (date) =>{
    this.setState({end : date });
  }

  openModal = () =>{
    this.setState({showModal : true });
  }

  closeModal = () =>{
    this.setState({showModal : false });
  }

  render(){
  
    return(
      <Fragment>
        <div className="minbeom">
          <Calendar localizer={localizer} events={this.state.event} />
        </div>
        <Button variant="primary" onClick={this.openModal}>이벤트 등록</Button>
        <Modal
                show={this.state.showModal}
                onHide={this.closeModal}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>이벤트 등록</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                  <Form>
                    <Form.Row>
                      <Form.Label>이벤트날짜</Form.Label>
                    </Form.Row>
                    <Form.Row>
                      <DatePicker selected={this.state.start} showTimeSelect dateFormat="Pp" onChange={this.onStartChange} selectsStart startDate={this.state.start} endDate={this.state.end} />
                      {' ~ '}
                      <DatePicker selected={this.state.end} showTimeSelect dateFormat="Pp" onChange={this.onEndChange} selectsEnd startDate={this.state.start} endDate={this.state.end} minDate={this.state.start}/>
                    </Form.Row>
                    <Form.Row>
                      <Form.Label>이벤트</Form.Label>
                      <Form.Control type="text" placeholder="설명" onChange={this.onTitleChange}/>
                    </Form.Row>
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>저장</Button>
                </Modal.Footer>
            </Modal>
      </Fragment>
    );
  }
}

export default CalendarComponent;
