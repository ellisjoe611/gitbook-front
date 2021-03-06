import React, { Component } from "react";
import {Link} from "react-router-dom";
import Calendar from './Calendar';

const API_URL = 'http://127.0.0.1:8080';
const API_HEADERS = {
    'Content-Type': 'application/json'
}

const API_URL = 'http://127.0.0.1:8080';
const API_HEADERS = {
    'Content-Type': 'application/json'
}


class Navigation extends Component {

  constructor() {
    super(...arguments);
   
    this.state = {
        
          userinfo:''
        
    }

} 

onClickHandler() {
  this.props.callmount.mount()
}
  
  render() {
        return(
            <div className="col-lg-3">
            <aside id="leftsidebar" className="sidebar">		  
             <ul className="list">
              <li>
                <div className="user-info">
                  <div className="image">
                    <a href="photo_profile_two.html">
                    <img src={this.state.userData.image} className="img-responsive img-circle" alt="User"></img>
                    <span className="online-status online"></span>
                    </a>
                  </div>
                <div className="detail">

        <h4 style={{fontFamily: " 'Varela Round', sans-serif"}}><strong>{this.state.userinfo && this.state.userinfo.nickname}</strong></h4>
                    <small  style={{fontFamily: " 'Varela Round', sans-serif"}}>{this.state.userinfo && this.state.userinfo.name}</small>  
                    <small>({this.state.userinfo && this.state.userinfo.id})</small> 
                    <hr></hr>
                    <p style={{fontFamily: " 'Varela Round', sans-serif",margin:"10px"}}>{this.state.userinfo && this.state.userinfo.profileContents} </p>                       

                </div>
                <div className="row">
                 <div className="col-12"></div>                                
                </div>
               </div>
              </li>
              <li>
               <Link to={`/gitbook/my/${this.state.userinfo && this.state.userinfo.id}`}><small className="text-muted">my Timeline <em className="fa fa-angle-right pull-right"></em></small><br/></Link>
               <Link to={`/gitbook/my/${this.state.userinfo && this.state.userinfo.id}/repository`}><small  onClick={this.onClickHandler.bind(this)} className="text-muted">my Repository <em className="fa fa-angle-right pull-right"></em></small><br/></Link>           
               
               
               { (sessionStorage.getItem("authUserId") === this.state.userinfo.id)?
               <Link to="/gitbook/my/schedule"><small className="text-muted">my Schedule <em className="fa fa-angle-right pull-right"></em></small><br/></Link>
                : ''
              }
               { (sessionStorage.getItem("authUserId") === this.state.userinfo.id)?
              <Link to="/gitbook/my/commit"><small className="text-muted">my Commit <em className="fa fa-angle-right pull-right"></em></small><br/></Link>
                : ''
              }
               <br></br>
              </li> 
             </ul>
            </aside>
            <div className="col-lg-12"> 
              <Calendar></Calendar>
            </div>				
           </div>
        );
    }

    componentDidMount() {
     
      fetch(`${API_URL}/gitbook/user/friend`, {
        method: 'post',
        headers: API_HEADERS,
        body: this.props.id
     })
      .then( response => response.json())
      .then( json => {
 
        this.setState({
           userinfo: json.data
           
        });
    })
    .catch( err => console.error( err ));  

    
      
  }
}
    componentDidMount() {
      fetch(`${API_URL}/gitbook/user/auth`, {
          method: 'get',
          headers: API_HEADERS
      })
      .then( response => response.json())
      .then( json => {
          console.log(json);
          this.setState({
              authUser: json.data
          });
      })
      .catch( err => console.error( err ));        
  }
}
export default Navigation;