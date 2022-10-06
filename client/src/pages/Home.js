import { useState } from 'react';
import Nav from '../components/Nav';
import AuthModal from '../components/AuthModal';
import { useCookies } from 'react-cookie';


const Home = () => {
    const [showModal, setShowModal] = useState(false);
    const [isSignUp, setIsSignUp] = useState(false);
    const [cookies, setCookie, removeCookie] = useState(['user']);
    const authToken = cookies.authToken;

    const handleClick = () => {
        if(authToken) {
            removeCookie('UserId', cookies.UserId);
            removeCookie('AuthToken', cookies.AuthToken);
            window.location.reload();
            return
        }
        setShowModal(true);
        setIsSignUp(true);

    }
    return (
        <div className="overlay">
            <Nav authToken={authToken} minimal={false} setIsSignUp={setIsSignUp} authToken={authToken} setShowModal={setShowModal} showModal={showModal}/>
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