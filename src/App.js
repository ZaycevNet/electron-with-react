import React, {useEffect, useRef, useState} from 'react';
import {Switch, Route, useHistory} from 'react-router-dom';

import { Layout, Menu, PageHeader, Button } from 'antd';
import {
    DatabaseOutlined,
    ApiOutlined,
    SmileOutlined
} from '@ant-design/icons';

const { Content, Sider } = Layout;

import Context from './context';

import TornadoRoute from './routes/tornado';
import FetchingRoute from './routes/fetching';

import './App.css';

import folder from '../src/folder/folder/folder/folder/s46kcJcPxXf.mp3';

const App = data => {
    const ref = useRef();
    const [smile, setSmile] = useState(false);

    const history = useHistory();
    const [header, setHeader] = useState({
        header: '',
        subHeader: ''
    });

    const onClick = ({ item, key, keyPath, domEvent }) => {
        history.push(key);
    };

    const smileClick = () => {
        setSmile(!smile);

        ref.current[!smile ? 'play' : 'pause']();
    };

    useEffect(() => {
        history.push('/tornado-server');
    }, []);

    return <Context.Provider value={{header, setHeader}}><Layout>
            <Sider
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                }}
            >
                <div className="logo" />
                <Menu theme="dark" mode="inline" defaultSelectedKeys={['/tornado-server']} onClick={onClick}>
                    <Menu.Item key="/tornado-server">
                        <DatabaseOutlined />
                        <span className="nav-text">Tornado server</span>
                    </Menu.Item>
                    <Menu.Item key="/data-fetching">
                        <ApiOutlined />
                        <span className="nav-text">Data fetching</span>
                    </Menu.Item>
                </Menu>
            </Sider>
        <Layout className="site-layout" style={{ marginLeft: 200 }}>
            <Content style={{ margin: '24px 16px 24px', overflow: 'initial', minHeight: 'calc(100vh - 24px * 2)' }}>
        <PageHeader
            className="site-page-header"
            backIcon={false}
            title={header.header}
            subTitle={header.subHeader}
        />
            <Switch>
                <Route path="/tornado-server" component={TornadoRoute}/>
                <Route path="/data-fetching" component={FetchingRoute}/>
            </Switch>
            </Content>
        </Layout>
        <div style={{position: 'fixed', bottom: '30px', right: '30px'}}>
            <div style={{display: 'none'}}><audio src={folder} ref={ref} loop={true} controls={true}/></div>
            <Button type="primary" shape="circle" icon={<SmileOutlined />} size='large' onClick={smileClick} />
        </div>
        </Layout></Context.Provider>;
};

export default App;