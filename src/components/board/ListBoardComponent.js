import React, { Component } from 'react';
import ReactDOM from 'react-dom';
// import 'antd/dist/antd.css';
// import './index.css';
import { List, Avatar, Space,Button,Switch } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import './antdCustomize.less';
import { GetServiceComponent } from '../service/ServiceComponent';

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

class ListBoardComponent extends Component{
    constructor(props){
        super(props);
        this.state = { 
            boards: [],
            boardseq: '',
        }
    }
    CallBack = (result) => {
      this.setState({ boards: result});

      var aboards = this.state.boards;

      for(let i = 0; i < aboards.length; i++)
      {
        var a,
        urls = [],
        str = aboards[i]['boardcontent'],      
        rex = /<img[^>]+src="?([^\s]+)" [^\s]+">/g;

        while ( a = rex.exec( str ) ) {
          urls.push( a[1] );
        }
    
        aboards[i]['thumbnail'] = urls[0];

        var desc = '작성일 : ' + aboards[i]['createdtime'] + '  작성자 : ' + aboards[i]['UserName'];
        aboards[i]['description'] = desc;
        
        
        var str = aboards[i]['boardcontent'];
        var target = str.replace(/<[^>]+>/g, '');

        aboards[i]['boardcontent'] = target.substring(0,100) + '.....';
      }
      this.setState({ boards: aboards});
      console.log(this.state.boards);

    }

    componentDidMount() {
      GetServiceComponent('http://49.168.71.214:8000/BoardList.php',this.CallBack);

    }
    onclick(){
      console.log('fdfdfd');
    }
    
    render(){
        return(
          <>
            <List
            itemLayout="vertical"
            size="large"
            pagination={{
              onChange: page => {
                console.log(page);
              },
              pageSize: 4,
            }}
            dataSource={this.state.boards}
            footer={
              <div>
                <b>사랑해♡</b> 달콩아
              </div>
            }
            renderItem={item => (
              <List.Item
                key={item.boardtitle}
                actions={[
                  <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
                  <IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
                  <IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
                ]}
                extra={
                  <img
                    width={272}
                    height={168}
                    src={item.thumbnail}
                  />
                
                }
                onClick={this.onclick}
              >
                <List.Item.Meta
                  avatar={<Avatar src={item.Image} />}
                  title={<a href={'./board-read?boardseq='+item.boardseq}>{item.boardtitle}</a>}
                  description={item.description}
                />
                {item.boardcontent}
              </List.Item>
            )}
          />
          
          </>
        );
    }
}

export default ListBoardComponent;