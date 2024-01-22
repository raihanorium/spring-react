import React, {useEffect, useState} from 'react';

function App() {

    const [message, setMessage] = useState('Hello');

    useEffect(() => {
        fetch('/rest/api/v1/home')
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setMessage(data.message);
            })
            .catch((err) => {
                console.error(err.message);
            });
    }, []);

    return (
        <div className="App">
            <h1>Message:</h1>
            <hr/>
            {message}
        </div>
    );
}

export default App;
