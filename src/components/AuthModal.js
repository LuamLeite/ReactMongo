import { useState } from 'react';
const AuthModal = (props) => {
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [passwordCheck, setPasswordCheck] = useState(null);
    const [confirmPassword, setConfirmPassword] = useState(null);
    const [error, setError] = useState(null);
    const handleClick = () => {
        props.setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            if (props.isSignUp && (password !== confirmPassword)) {
                setError("Passwords do not match");
            }
            console.log("make a post request to our database");
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
                { props.isSignUp && <input type="password" id="passwordCheck" placeholder="Confirm your password" required={true} onChange={(e) => setPasswordCheck(e.target.value)}/>}

                <input className='secondary-button' type="submit" id="submit" />
                <p>{error}</p>
            </form>
            <hr />
            <h2>GET THE APP</h2>
        </div>)
}
export default AuthModal;