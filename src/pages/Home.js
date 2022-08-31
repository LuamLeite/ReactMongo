import { useState } from 'react';
import Nav from '../components/Nav';
import AuthModal from '../components/AuthModal';



const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const authToken = false;
    const handleClick = () => {
        console.log('clicked');
        setShowModal(true);
        setIsSignUp(true);
    }
    return (
        <div className="overlay">
            <Nav minimal={false} setIsSignUp={setIsSignUp} authToken={authToken} setShowModal={setShowModal} showModal={showModal}/>
            <div className="Home">
                <h1 className="primary-title">Swipe Right</h1>
                <button className="primary-button" onClick={handleClick}>
                    {authToken ? 'SignOut' : 'SignUp'}
                </button>

                {showModal && (<AuthModal setShowModal={setShowModal} isSignUp={isSignUp}/>)}
            </div>
        </div>)
}
export default Home;