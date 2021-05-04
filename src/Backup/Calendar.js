import './Calendar.css'
import React, { Component, Fragment } from 'react';
import moment from 'moment'
import { Modal, Button, Form } from 'react-bootstrap';

class DateHeader extends Component {
 
    dateToArray = (dates) => {
      if(Array.isArray(dates)){
        return dates
      }else if(typeof dates === "string"){
        return dates.split(',')
      }else{
        return ["일", "월", "화", "수", "목", "금", "토"]
      }
    }
   
    mapArrayToDate = (dateArray) => {
      try{
        if(dateArray.length !== 7){
          console.log(new Error("dates props must be had 7 date"))
          dateArray = ["일", "월", "화", "수", "목", "금", "토"]
        }
        
        return dateArray.map((date, index) => {
          const className = ()=>{
            let className = "RCA-calendar-date-component";
            if(index === 0){
              return className + " date-sun"
            }else if(index === 6){
              return className + " date-sat"
            }else{
              return className + " date-weekday"
            }
          }
          return (
            <div className={className()} key={"RCA-header-"+date}>
              {date}
            </div>
          )
        })
      }catch{
        throw new Error ("date must be string or component")
      }
    }
   
    render() {
      return (
        <div className="RCA-calendar-date-header">
          {this.mapArrayToDate(this.dateToArray(this.props.dates))}
        </div>
      )
    }
}

class Week extends Component {
    constructor(props){
        super(props);
        this.state ={
            showModal: false,
            description: '',
            date:'',
            result:[]
        };

        this.closeModal = this.closeModal.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        try {
          fetch('http://192.168.68.128/connect1.php',{ 
            method: 'POST',
            headers:{
            }
        }).then(res => res.json())
        .then(response => {this.setState( {result: response} );   console.log(this.state.result[0]['Date'])});
        } catch (err) {
          return console.error('err',err);
        }
    }

    closeModal(){
        this.setState({
          showModal: false
        });
    }

    onChange(e){
        this.setState({ description: e.target.value });
    }



    callBack(response){

      this.setState( {result: response} );

      console.log( response[0]['Date']);
      console.log(this.state.result[0]['Date']);
      
    }

    onSubmit(){
        var formData = new FormData();
        formData.append('date',this.state.date);
        formData.append('description',this.state.description);

        try {
          fetch('http://192.168.68.128/connect.php',{ 
            method: 'POST',
            headers:{
              // 'Content-Type': 'application/json',
              // 'Accept': 'application/json'
            },
            body: formData,
        }).then(res => res.json())
        .then(response => { console.log(response); });
        } catch (err) {
          return console.error('err',err);
        }
    }
    

    Days = (firstDayFormat,weekIndex) => { //2021.1.3
      const _days = [];
   
      for (let i = 0; i < 7; i++) { //0 1 2 3 4 5 6
   
        const Day = moment(firstDayFormat).add('d', i); 
        _days.push({
          yearMonthDayFormat: Day.format("YYYY-MM-DD"),
          getDay: Day.format('D'),
          isHolyDay: false,
          weekIndex
        });
      }
   
      return _days;
    }
   
    mapDaysToComponents = (Days, calendarMonthYear, selectedDayFormat, fn = () => { }) => {

      const thisMonth = moment(calendarMonthYear);

      return Days.map((dayInfo, i) => {
   
        let className = "date-weekday-label";
        
        if (!thisMonth.isSame(dayInfo.yearMonthDayFormat,'month')) {
          className = "date-notThisMonth";
        } else if (i === 0) {
          className = "date-sun";
        } else if (i === 6) {
          className = "date-sat"
        }

        if(moment(dayInfo.yearMonthDayFormat).isSame(selectedDayFormat,'day')){
            className = "selected"
        }
        
        return (
        <Fragment key={i}>
            {this.state.result === null?'':<div className={"RCA-calendar-day " + className} onClick={()=>{fn(dayInfo.yearMonthDayFormat); 
                                                                    this.setState({ showModal: true });
                                                                    this.setState({ date: dayInfo.yearMonthDayFormat}); }} key={`RCA-${dayInfo.weekIndex}-${i}-day`} >
                <label className="RCA-calendar-day-label" >
                    {dayInfo.getDay}
                </label>
                <label className={className}>
                  {/* {dayInfo.yearMonthDayFormat === this.state.result[0]['Date']  ? this.state.result[0]['Description'] : 'min'} */}
                </label>
                {/* <label className={className}>mimimimimi</label> */}
                {/* <label className="RCA-calendar-day">{dayInfo.getDay}</label> */}
                
            </div>}
            <Modal
                show={this.state.showModal}
                onHide={this.closeModal}
                backdrop="static"
                keyboard={false}>
                <Modal.Header closeButton>
                <Modal.Title>{selectedDayFormat}</Modal.Title>
                    </Modal.Header>
                <Modal.Body>
                    <Form.Control type="email" placeholder="설명" onChange={this.onChange}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={this.onSubmit}>저장</Button>
                </Modal.Footer>
            </Modal>
        </Fragment>
        )
      })
    }
  
    
    render() {
      return (
        <div className="RCA-calendar-week" key={this.props.weekIndex}>
            {this.mapDaysToComponents(this.Days(this.props.firstDayOfThisWeekformat,this.props.weekIndex),
            this.props.ymOfThisCalendar,
            this.props.selected,
            this.props.fn
            )}

        </div>
      )
    }
}

export default class Calendar extends Component {
    constructor(props){
        super(props);
        this.state ={
          calendarYM : moment(),
          today : moment(),
          selected : moment().format("YYYY-MM-DD")
        };
        
      }

    Weeks = (monthYear,selected,clickFn) => {
      const firstDayOfMonth = moment(monthYear).startOf('month'); //01.01
      const firstDateOfMonth = firstDayOfMonth.get('d'); //5

      const firstDayOfWeek = firstDayOfMonth.clone().add('d', -firstDateOfMonth); //2020.12.27
      // const lastDayOfThisCalendar = dayOfThisCalendar.clone().add('d', 6 * 7);


      const _Weeks = [];
   
      for (let i = 0; i < 6; i++) {
        _Weeks.push((
          <Week key={`RCA-calendar-week-${i}`} 
                weekIndex={i}
                ymOfThisCalendar={firstDayOfMonth.format("YYYY-MM")}
                firstDayOfThisWeekformat={firstDayOfWeek.clone().add('d', i * 7).format("YYYY-MM-DD")}
                selected={selected}
                fn={clickFn}
                showModal={this.state.showModal}
          />
        ))
      }
      return _Weeks
    }
   
    render() {
      return (
        <Fragment>
        <div className="RCA-calendar-container">
          <DateHeader dates={"Sun, Mon, Tue, Wed, Thu, Fri, Sat"} />
          {this.Weeks(this.props.YM, this.props.selected, this.props.changeSelected)}
        </div>
      </Fragment>
      )
    }
  }
   


