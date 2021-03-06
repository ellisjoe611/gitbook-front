import React, { Component } from 'react';

const API_URL = 'http://127.0.0.1:8080';
const API_HEADERS = {
    'Content-Type': 'application/json'}



class MyRepositoryWritePage extends Component {
  constructor(){
    super(...arguments);
    this.state={
      gitName:'',
      description:'',
      check: '',
      visible:{
          public : true,
          private : false 
      }
    }
  }

  handleChange=(e)=>{
    this.setState({
      [e.target.name]: e.target.value
    });
  }


  handleRadio=(event)=>{
    let obj = {}
    obj[event.target.value] = event.target.checked 
    this.setState({visible: obj});
  }

  handleSubmit=()=>{
          const authUserNo= sessionStorage.getItem("authUserNo");
          console.log(authUserNo)
          let newRepo = {
            no: null,
            userNo:authUserNo,
            groupNo:null,
            gitName: this.state.gitName,
            description: this.state.description,
            visible: (this.state.visible['public'])? "public" : "private"
        };
        
          fetch(`${API_URL}/gitbook/Repository/${sessionStorage.getItem("authUserId")}/add`, {
            method: 'post',
            headers: API_HEADERS,
            body: JSON.stringify(newRepo)
        })
        .catch( err => console.error( err ));  
  }
  
  render() {
    return (
      <div className="RepositoryWritePage" >
        <h2 style={{ fontFamily: " 'Abhaya Libre' serif" }}>New Repository</h2>
        <hr></hr>
        <form action="/gitbook/my/repository/detail" method="POST">
          <h4 style={{ fontFamily: " 'Abhaya Libre' serif" }}>Repository name</h4>
          <input type="hidden" name="userNo" required value={sessionStorage.getItem("authUserNo")}/>
          <input 
                    placeholder="파일명을 적어주세요.." 
                    type="text" 
                    onChange={this.handleChange.bind(this)}
                    name="gitName"
                    value={this.state.gitName}
                    className="form-control" style={{width:"40%",display:"inline",paddingRight:"40px"}} />
         {  (this.state.gitName.trim() != '') ? 
            (
            this.props.repositorylist&&this.props.repositorylist.some((list)=> list.gitName.trim() == this.state.gitName.trim() )?
            <i className="fas fa-exclamation-triangle" style={{ marginLeft: "-25px", color: "red" }} />:
            <i className="fas fa-check" style={{ marginLeft: "-25px", color: "green" ,display:"inline-block"}} />) :  <i className="fas fa-exclamation-triangle" style={{ marginLeft: "-25px", color: "red" }} />
         }
         
         
            
          <br></br>
          <br></br>
          <h4 style={{ fontFamily: " 'Abhaya Libre' serif" }}>Description</h4>
          <textarea
                    className="form-control no-border" 
                    rows="3" 
                    onChange={this.handleChange.bind(this)}
                    name="description"
                    placeholder="상세 설명을 적어주세요.."/>
          <hr></hr>
          <input 
                    type="radio" 
                    name="visible" 
                    value="public" 
                    checked={this.state.visible['public']}
                    onChange={this.handleRadio.bind(this)} />
          <label >공개</label>
          <br></br>
          <input 
                    type="radio" 
                    name="visible" 
                    value="private"
                    checked={this.state.visible['private']}
                    onChange={this.handleRadio.bind(this)}/>
          <label >비공개</label>
          <hr></hr>
          
         { (this.state.gitName.trim() != '') ? 
            ( 
         
         
         this.props.repositorylist&&this.props.repositorylist.some((list)=> list.gitName.trim() == this.state.gitName.trim()  )?
          <button 
                    type="submit" 
                    className="kafe-btn kafe-btn-mint-small" 
                    disabled="true"
                    style={{ float: "right ", margin: "10px", width: "70px" ,backgroundColor:"red" }}
                    onClick={this.handleSubmit.bind(this)}>생성 불가</button>:
           <button 
                    type="submit" 
                    className="kafe-btn kafe-btn-mint-small" 
                   
                    style={{ float: "right ", margin: "10px", width: "60px" }}
                    onClick={this.handleSubmit.bind(this)}>생성</button>
            ):  <button 
            type="submit" 
            className="kafe-btn kafe-btn-mint-small" 
            disabled="true"
            style={{ float: "right ", margin: "10px", width: "70px" ,backgroundColor:"red" }}
            onClick={this.handleSubmit.bind(this)}>생성 불가</button>

         }
        </form>
      </div>
    );}
    componentDidMount(){
      
        console.log("왜안나오냐"+this.props.repositorylist)

    }

}

export default MyRepositoryWritePage;
