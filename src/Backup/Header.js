import React, { Fragment, Component } from 'react';
import './Calendar.css'

class Header extends Component {
    render() {
        // console.log(this.props)
        return (
            <Fragment>
                <div className="RCA-header-container">
                    <h2 className="RCA-header-calendarYM RCA-header-middle">
                        {this.props.calendarYM}
                    </h2>
                    <h3 className="RCA-header-today RCA-header-middle">
                        {this.props.today}
                    </h3>
                    <ul className="RCA-header-buttons RCA-header-middle">
                        <li>
                            <i className="move-button left-img icon" onClick={()=>{this.props.moveMonth(-1)}}>
 
                            </i>
                        </li>
                        <li>
                            이동
                        </li>
                        <li>
                        <i className="move-button right-img icon" onClick={()=>{this.props.moveMonth(1)}}>
 
                        </i>
                        </li>
                    </ul>
                </div>
            </Fragment>
        )
    }
}

export default Header;