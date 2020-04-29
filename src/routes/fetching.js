import React, {useCallback, useContext, useEffect, useMemo, useState} from 'react';
import {List, Divider, Button, Space, Table, notification, Switch} from 'antd';
import Axios from 'axios-observable';

import {VerticalAlignBottomOutlined} from '@ant-design/icons';

import Context from '../context';

const urls = [
    'https://jsonplaceholder.typicode.com/posts',
    'https://jsonplaceholder.typicode.com/comments',
    'https://jsonplaceholder.typicode.com/albums',
    'https://jsonplaceholder.typicode.com/photos',
    'https://jsonplaceholder.typicode.com/todos',
    'https://jsonplaceholder.typicode.com/users'
];

let sub = null;

const Fetching = data => {
    const [cache, setCache] = useState(false);

    const {setHeader} = useContext(Context);
    const [fetching, setFetching] = useState(false);

    const [rows, setRows] = useState([]);
    const [columns, setColumns] = useState([]);

    const onSuccess = useCallback(e => {
        setFetching(false);

        setRows(e.data);
    }, []);
    const onError = useCallback(e => {
        setFetching(false);

        notification.error({
            message: e.type || e.name,
            description: e.message
        });
    }, []);

    const fetchUrl = url => {
        setFetching(true);

        if(!cache) url += `?_=${new Date().getTime()}`;

        sub = Axios.get(`${url}`).subscribe(
            onSuccess,
            onError
        );
    };

    useEffect(() => {
        let one = false;

        rows.map(row => {
            if(one) return true;

            const _columns = [];

            Object.keys(row).map((rowParam, index) => {
                return _columns.push({
                    title: rowParam,
                    dataIndex: rowParam,
                    key: rowParam,
                    fixed: index === 0
                });
            });

            setColumns(_columns);

            return true;
        });
    }, [rows]);

    const dataSource = useMemo(() => {
        return rows.map((row, index) => ({...row, key: index}));
    }, [rows]);

    useEffect(() => {
        setHeader({
            header: 'Data fetching',
            subHeader: 'rest api'
        });

        return () => {
            if(sub) sub.unsubscribe();
        };
    }, []);

    return <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
        <Divider orientation="left">Опции</Divider>
        <Space>
            Кешировать запросы
            <Switch onChange={e => setCache(e)} />
        </Space>
        <Divider orientation="left">Доступные урлы</Divider>
        <List
            size="small"
            bordered
            dataSource={urls}
            renderItem={url => <List.Item>
                <Space>
                <Button type="primary"
                        icon={<VerticalAlignBottomOutlined />}
                        disabled={fetching}
                        onClick={() => fetchUrl(url)}/>
                {url}
                </Space>
            </List.Item>}
        />
        <Divider orientation="left">Дата</Divider>
        <Table dataSource={dataSource} columns={columns} loading={fetching} scroll={{x: true}}/>
    </div>;
};

export default Fetching;