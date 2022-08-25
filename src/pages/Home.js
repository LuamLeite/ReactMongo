import { useState } from 'react';
import Nav from '../components/Nav';



const Home = () => {
    const [showModal, setShowModal] = useState(false);

    const authToken = false;
    const handleClick = () => {
        console.log('clicked');
    }
    return (
        <div className="overlay">
            <Nav minimal={false} authToken={authToken} />
            <div className="Home">
                <h1>Swipe Right</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'SignOut' : 'SignUp'}
                </button>
            </div>
        </div>)
}
export default Home;