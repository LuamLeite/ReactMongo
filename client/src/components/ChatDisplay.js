import ChatInput from "./ChatInput";
import Chat from "./Chat";
import axios from "axios";
import { useEffect, useState } from "react";

const ChatDisplay = (props) => {
    console.log('PROOOOPS, CHAT DISPLAY', props);
    const userId = props.user?.user_id;
    const clickedUserId = props.clickedUser?.user_id;
    const [clickedUserMessages, setClickedUserMessages] = useState(null);
    const [userMessages, setUsersMessages] = useState(null);


    const getUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: userId, correspondingUserId: clickedUserId }
            })
            setUsersMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }


    const getClickedUsersMessages = async () => {
        try {
            const response = await axios.get('http://localhost:8000/messages', {
                params: { userId: clickedUserId, correspondingUserId: userId }
            })
            setUsersMessages(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getUsersMessages();
        getClickedUsersMessages();
    }, []);

    const messages = [];

    userMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['name'] = props.user?.first_name;
        formattedMessage['img'] = props.user?.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    })

    clickedUserMessages?.forEach(message => {
        const formattedMessage = {};
        formattedMessage['name'] = props.user?.first_name;
        formattedMessage['img'] = props.user?.url;
        formattedMessage['message'] = message.message;
        formattedMessage['timestamp'] = message.timestamp;
        messages.push(formattedMessage);
    })

    const descendingOrderMessages = messages?.sort((a,b) => a.timestamp.localeCompare(b.timestamp))
    console.log('userMessages', userMessages);
    console.log('formattedMessages', messages);
    
    return (
        <div>
            <Chat descendingOrderMessages={descendingOrderMessages} />
            <ChatInput />
        </div>
    )
}

export default ChatDisplay;