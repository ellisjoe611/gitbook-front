import React, { Component } from 'react';
import './UploadPage.css'
import { Link } from "react-router-dom";




class UploadPageItem extends Component {
    constructor() {
      super(...arguments);
      this.state = {
        contents: this.props.timelineInfo.contents,
        tag: '',
        tagList: [],
        tagid: 0,
        visible: this.props.timelineInfo.visible,
        imgList: [],
        sendtagList: [],
        filelist:this.props.filelist
    }
  
    }
    handleChangeFile = (e) => {
      const formData = new FormData();
      formData.append("file", e.target.files[0])
      fetch(`${global.API_URL}/gitbook/timeline/${sessionStorage.getItem("authUserId")}/fileupload`, {
        method: 'post',
        headers: {
        },
        body: formData
      })
        .then(response => response.json())
        .then(json => {
  
          this.setState({
            imgList: this.state.imgList.concat(json.data)
          });
        })
        .catch(err => console.error(err));
      e.target.value = ''
  
  
    }
  
    handleChange(e) {
      this.setState({
        [e.target.name]: e.target.value
      })
    }
    handleKeyPress(e) {
      if (e.key === 'Enter') {
        if (this.state.tag != '')
          this.setState({
            tagList: this.state.tagList.concat({ tag: this.state.tag, tagid: this.state.tagid + 1 }),
            tagid: this.state.tagid + 1,
            tag: ''
          })
      }
    }
    clickHandlerDelete(e) {
      this.setState({
        imgList: this.state.imgList.filter((list) => list != e.target.id),
  
      })
  
    }
    clickTagDelete(e) {
      this.setState({
        tagList: this.state.tagList.filter((list) => list.tagid != e.target.id)
  
      })
    }
    clickVisible() {
      this.setState({
        visible: (this.state.visible === "public") ? "private" : "public"
      })
    }
    handleSubmit() {
      const authUserNo = sessionStorage.getItem("authUserNo");
      const formData = new FormData();
      let sendtagList = [];
      this.state.tagList.map((list) => { sendtagList = sendtagList.concat(list.tag) })
      formData.append("userNo", authUserNo);
      formData.append("contents", this.state.contents);
      formData.append("visible", this.state.visible);
      formData.append("tagList", sendtagList)
      formData.append("imgList", this.state.imgList)
  
      fetch(`${global.API_URL}/gitbook/timeline/${sessionStorage.getItem("authUserId")}/update/${this.props.timelineInfo.no}`, {
        method: 'post',
        headers: {
  
        },
        body: formData
      })
        .catch(err => console.error(err));
    }

    onClose(){
        this.props.close.close();
    }

    render() {
      return (
        <div>
                <div className="col-lg-8 col-lg-offset-2" style={{ background: "#929292", marginTop: "1px"}}>  {/** 두번째 섹션 */}
                  <div className="UploadPage" >
                    <div className="box" style={{ boxShadow: "1px 1px 4px 2px #FFFFFF", padding: "10px", minWidth: "250px",maxHeight:"600px",overflow:"auto" }}>
                    <strong> <span onClick={this.onClose.bind(this)} id="x">×</span></strong>
                      <div className="form1" action="/"  >
                        <div >
                          {this.state.imgList && this.state.imgList.map((list) =>
                            <div className="div2" style={{ float: "left", widthMin: "20%", widthMax: "160px", margin: "0px 1.6%", display: "inline-block" }}>
                              <i className="fas fa-backspace fa-2x" id={list} onClick={this.clickHandlerDelete.bind(this)} onClick={this.clickHandlerDelete.bind(this)} />
                              <div className="imageFileDiv">
                                {<img style={{ width: "100%", height: "100%", borderRadius: '10px', display: "block" }} key={list} src={list}></img>}
                              </div>
                            </div>)}
                          {
                            (this.state.imgList.length < 10) ?
                              <div style={{ float: "left", widthMin: "20%", widthMax: "160px", margin: "0px 1.6%", display: "inline-block" }}>
                                <div className="imageFileDiv" >
                                  <label className="iconlabel"><input type="file" name={this.state.imgFile} style={{ display: "none" }} onChange={this.handleChangeFile} /> <i className="fa fa-camera text-muted fa-4x" id="custom" /></label>
                                </div>
                              </div> : ''}
                        </div>
                        <textarea className="form-control no-border"
                          id="uploadDescription"
                          rows="3"
                          placeholder="내용을 입력해주세요..."
                          name="contents"
                          value={this.state.contents}
                          onChange={this.handleChange.bind(this)}
                          style={{ minHeight: "300px", minWidth: "100%", resize: "none", fontFamily: ' "Lucida Grande","Lucida Sans Unicode",Verdana,sans-serif', fontSize: "1.3em" }} />
                        {(this.state.tagList && this.state.tagList.length < 5) ?
                          <input className="input1"
                            placeholder="태그를 입력해주세요..."
                            name="tag"
                            maxLength="20"
                            value={this.state.tag}
                            onChange={this.handleChange.bind(this)}
                            onKeyPress={this.handleKeyPress.bind(this)}
                            style={{ width: "100%", border: "0px" }} /> : ''
                        }
                        {this.state.tagList && this.state.tagList.map((list) =>
                          <p key={list.tagid}
                            id={list.tagid}
                            onClick={this.clickTagDelete.bind(this)}
                            className="tagword" >{list.tag}</p>
                        )}
                        <div>
                          {
                            (this.state.contents !== '') ?
                               <a href="">
                                <button onClick={this.handleSubmit.bind(this)} style={{ color: "#0FC19E", float: "right", margin: "5px" }}
                                  className="kafe-btn kafe-btn-mint-small pull-right btn-sm">Update</button></a> :
                              ''}
                          {(this.state.visible === "public") ?
                            <i style={{ color: "#0FC19E" }} onClick={this.clickVisible.bind(this)} id="vislblelock" className="fas fa-lock-open fa-2x" /> :
                            <i style={{ color: "red" }} onClick={this.clickVisible.bind(this)} id="vislblelock" className="fas fa-lock fa-2x" />
                          }
                        </div>
                      </div>
                      <div className="box-footer clearfix">
                      </div>
                    </div>
                  </div>
                </div>{/** 두번째 섹션 */} 
        </div>
      );
    }
    componentDidMount() {
        fetch(`${global.API_URL}/gitbook/timeline/${this.props.matchid}/info/${this.props.timelineInfo.userNo}/${this.props.timelineInfo.no}`, {
            method: 'get',
            headers: global.API_HEADERS
          })
            .then(response => response.json())
            .then(json => {
              this.setState({
               imgList:json.data.url,
              });
              json.data.tag.map((list)=>
                this.setState({

                    tagList: this.state.tagList.concat({ tag: list, tagid: this.state.tagid + 1 }),
                    tagid: this.state.tagid + 1,

                })
              )
              
            })
            .catch(err => console.error(err));



    }
  }
  export default UploadPageItem;