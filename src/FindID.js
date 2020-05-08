import React, { Component } from "react";
import './Fluffs/assets/css/demos/photo.css';
import './Fluffs/assets/css/demos/join.css';

class FindID extends Component {
    render() {
        return(      
          <section className="login">
            <div className="container">
              <div className="banner-content">
                <h1><i className="fa fa-smile"></i> GitBook </h1>
                <div className="row" style={{marginTop:"40px"}}>
                  <a className="find-id-head" style={{color:"#0fc19e"}} >아이디 찾기</a>
                  <a className="find-pwd-head" style={{color:"#fff"}}>비밀번호 찾기</a>
                </div>
                <hr className="find-act-hr"></hr>
                <form method="post" className="form-signin">                 
                  <div className="form-group-join">
                    <input name="username" type="text" className="form-control-join" placeholder="이름"/>
                  </div>
                  <div className="form-group-join">
                    <input name="phone" type="tel" className="form-control-join" placeholder="휴대폰번호"/>
                  </div>
                  <div className="form-group-join">
                    <input name="email" type="text" className="form-control-join-email" placeholder="이메일"/>
                    <button className="kafe-btn kafe-btn-mint form-group-join-btn">인증</button>
                  </div>
                  <br/>
                  <a className="btn btn-dark " href="photo_login.html" role="button" style={{marginTop:"10px"}}>GitBook계정이 생각나셨나요? 지금 로그인 하기</a><br/>               
                </form>
              </div>
            </div>
          </section>
        );
    }
}

export default FindID;