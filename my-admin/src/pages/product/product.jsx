import React from 'react';
import { Button } from 'antd';
import 'antd/dist/antd.css'
import "./index.css"
import 'animate.css/animate.css'

class product extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            Open:false,
            Index:[],
            upload:[],
            upload_list:[]
        }
    }
    Open(){
        this.setState({
            Open:!this.state.Open
        })
    }
    setIndex(index){
        const item = this.state.upload_list[index]
        if(this.state.Index[index] === index){
            this.state.Index[index] = -1
            const inx = this.state.upload.findIndex(i => i.id === item.id )
            this.state.upload.splice(inx,1)
        }else{
            this.state.Index[index] = index
            this.state.upload.push(item)
        }
        this.setState({
            upload:this.state.upload,
            Index:this.state.Index
        })
    }
    upload(){

    }
    componentWillMount() {
        this.getproduct()
    }

    async getproduct(){
        const data = await React.$http({url:"/album"})
        this.state.upload_list = data.album_list
        this.setState({
            upload_list:this.state.upload_list
        })
    }
    submit(){
        console.log(this.state.upload);
    }

    render() {
        const {upload_list,Index} = this.state
        return(
            <>
                <Button type="primary" onClick={() => this.Open()}>
                    Modal
                </Button>
                <div className="Modal_Mask" style={{display:(this.state.Open ? 'block' : 'none')}}>
                    <div className="Model_content">
                        <div className="header">
                            <Button type="primary" htmlType="file" onClick={() => this.upload()}>
                                本地上传
                            </Button>
                        </div>
                        <div className="main">
                            {
                                upload_list.map((item,index) => {
                                    return (
                                        <div onClick={() => this.setIndex(index)}
                                             key={index}
                                             style={{border:(Index[index] === index) ? '1px solid red' : ''}}
                                             className="item_pic">
                                            <img src={item.url} alt=""/>
                                        </div>
                                    )
                                })
                            }
                        </div>
                        <div className="footer">
                            <div className="footer_content">
                                <Button type="primary" htmlType="file" onClick={() => this.Open()}>
                                    取消
                                </Button>
                                <Button type="primary" htmlType="file" onClick={() => this.submit()}>
                                    确认
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default product