import axios from 'axios';
import { useState } from 'react';

const ChatInput = (props) => {
    const [textArea, setTextArea] = useState('');
    const userId = props.user?.user_id;
    const clickedUserId = props.clickedUser?.user_id;

    const addMessage = async () => {
        const message = {
            timestamp: new Date().toISOString(),
            from_userId: userId,
            to_userId: clickedUserId,
            message: textArea
        }

        try {
            await axios.post('http://localhost:8000/message', { message})
            props.getUsersMessages();
            props.getClickedUsersMessages();
            setTextArea("");
        } catch (error) {
            
        }
    }
    return (
        <>
            <div className="chat-input">
                <textarea value={textArea} onChange={(e) => setTextArea(e.target.value)} />
                <button className="secondary-button" onClick={addMessage}>Submit</button>
            </div>

        </>
    )
}

export default ChatInput;