import React from 'react';
import Nav from '../components/Nav';

const Home = () => {
    const authToken = false;
    const handleClick = () => {
        console.log('clicked');
    }
    return (
        <React.Fragment>
        <Nav/>
            <div className="Home">
                <h1>Swipe Right</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'SignOut' : 'SignUp'}
                </button>
            </div>
        </React.Fragment>)
}
export default Home;