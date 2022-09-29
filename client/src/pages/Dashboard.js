import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  console.log('Dashboard call')
const [user, setUser] = useState(null);
const [ cookies, setCookie, removeCookie ] = useCookies(['user']);

const userId = cookies.UserId;

console.log('userId', userId);
    const getUser = async() => {
      try {
        const response = await axios.get('http://localhost:8000/user', {
          params: { userId }
        })
        console.log('RESPONSE', response);
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    } 
    console.log('user is here', user);
    useEffect(() => {
      console.log('alou');
      getUser()
    }, []);
    
    console.log('user', user);

    const characters = [
        {
          name: 'Law',
          url: 'https://pbs.twimg.com/media/FX941-sacAAQHBv?format=jpg&name=4096x4096   '
        },
        {
          name: 'Pang',
          url: 'https://pbs.twimg.com/media/D-6fjNbU8AEyvyi.jpg:large'
        },
        {
          name: 'Yao',
          url: 'https://pbs.twimg.com/media/FQs8y6eagAg8imb?format=jpg&name=large'
        },
        {
          name: 'Crushfang',
          url: 'https://pbs.twimg.com/media/EnwHwReVoAIoTqG.jpg'
        },
        {
          name: 'Toyokuni',
          url: 'https://pbs.twimg.com/media/E1ZuwSIUYAAUUcg.jpg'
        }
      ]


    const [lastDirection, setLastDirection] = useState()

    const swiped = (direction, nameToDelete) => {
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div className="dashboard">
            <ChatContainer user={user}/>
            <div className="swipe-container">
                <div className="card-container">
                    {characters.map((character) =>
                        <TinderCard 
                        className='swipe' 
                        key={character.name} 
                        onSwipe={(dir) => swiped(dir, character.name)} 
                        onCardLeftScreen={() => outOfFrame(character.name)}>
                            <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                                <h3>{character.name}</h3>
                            </div>
                        </TinderCard>
                    )}
                </div>
                <div className="swipe-info">
                    {lastDirection ? <p> You swiped {lastDirection}</p> : <p> : </p>}
                </div>
            </div>
        </div>
    )
}
export default Dashboard;
