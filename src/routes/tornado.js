import React, {useContext, useEffect} from 'react';

import Context from '../context';

const Tornado = data => {
    const {setHeader} = useContext(Context);

    useEffect(() => {
        setHeader({
            header: 'Tornado server',
            subHeader: 'none'
        });
    }, []);

    return <div className="site-layout-background" style={{ padding: 24, textAlign: 'left' }}>
                <p><b>Во-первых</b>: я пишу на JS, не на Python</p>
                <p><b>Во-вторых</b>: не вижу необходимости в разворачивании локального или удаленного Tornado Web Server. Фетчинг на клиенте зависит от интерфейса API, будь то Rest или GraphQL, а не от сервера API</p>
            </div>;
};

export default Tornado;