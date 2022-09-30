import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
const AuthModal = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    let navigate = useNavigate(); //para navegarmos para outra pagina

    const handleClick = () => {
        props.setShowModal(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (props.isSignUp && (password !== passwordCheck)) {
                setError("Passwords do not match");
                return;
            }
            console.log("make a post request to our database", props.isSignUp ? 'signup' : 'login');
            const response = await axios.post(`http://localhost:8000/${props.isSignUp ? 'signup' : 'login'}`, { email, password });
            const success = response.status === 201;

            if (success) {
                setCookie('AuthToken', response.data.token);
                setCookie('UserId ', response.data.userId);
            }
            if (success && props.isSignUp) {
                navigate('/onboarding');
                window.location.reload();
            }
            if (success && !props.isSignup) {
                navigate('/dashboard');
                window.location.reload();
            }
        } catch (error) {
            console.log(error);
        }
    }
    console.log(props);


    return (
        <div className="auth-modal">
            <div className="closed-icon" onClick={handleClick}>X</div>
            <h2>{props.isSignUp ? 'CREATE ACCOUNT' : 'LOG IN'}</h2>
            <p>By clicking Log In, you agree to our terms. Learn how we process our data in our Privacy Policy.</p>
            <form onSubmit={handleSubmit}>
                <input type="email" id="email" placeholder="Enter your email address" required={true} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" id="password" placeholder="Enter your password" required={true} onChange={(e) => setPassword(e.target.value)} />
                {props.isSignUp && <input type="password" id="passwordCheck" placeholder="Confirm your password" required={true} onChange={(e) => setPasswordCheck(e.target.value)} />}

                <input className='secondary-button' type="submit" id="submit" />
                <p>{error}</p>
            </form>
            <hr />
            <h2>GET THE APP</h2>
        </div>)
}
export default AuthModal;