import React from 'react'
import { Link } from 'react-router-dom';
import './DefaultLayout.css'
import { Layout, Menu, Icon } from 'antd';
const { Header, Sider, Content } = Layout;


class DefaultLayout extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const { children, onClick, currentItem } = this.props;
    return (
      <Layout style={{ height: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          collapsed={true}
        >
          <div className="logo" />
          <Menu
            onClick={onClick}
            selectedKeys={[currentItem]}
            theme="dark"
            defaultSelectedKeys={['1']}
          >
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="home" />
                <span>Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/add">
                <Icon type="plus-circle" />
                <span>Add</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header id="Header" style={{ background: '#fbf3c2', padding: 0 }}>
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff' }}>
            {children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default DefaultLayout; 