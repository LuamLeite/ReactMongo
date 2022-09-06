import whiteLogo from '../assets/toppng.com-tinder-icon-logo-black-stroke-512x512.png';
import colorLogo from '../assets/Tinder-Logo.png';

const Nav = (props) => {
const   handleClick = () => {
    props.setShowModal(true);
    props.setIsSignUp(false);
}

    return (
    <nav>
        <div className="logo-container">
        {/* <img className="logo"  alt='Logo' width="25"  height="25" src={props.minimal ? colorLogo : whiteLogo} /> */}
        </div>
        {!props.authToken && !props.minimal && <button onClick={handleClick} className="nav-button" disabled={props.showModal}>Log In</button>}
    </nav>
    );
};

export default Nav;