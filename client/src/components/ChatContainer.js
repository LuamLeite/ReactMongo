import MatchesDisplay from "./MatchesDisplay";
import ChatDisplay from "./ChatDisplay";
import ChatHeader from "./ChatHeader";

const ChatContainer = (props) => {
    console.log('PROPS', props);
    return (
        <div className="chat-container">
            <ChatHeader user={props.user}/>

            <div>
            <button className="option">
                Matches
            </button>
            <button className="option">
                Chat
            </button>
            </div>

            <MatchesDisplay/>


            <ChatDisplay/>
        </div>
    )
}

export default ChatContainer;