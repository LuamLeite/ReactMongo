import TinderCard from "react-tinder-card";
import { useEffect, useState } from "react";
import ChatContainer from "../components/ChatContainer";
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Dashboard = () => {
  console.log('Dashboard call')
  const [user, setUser] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(['user']);
  const [genderedUsers, setGenderedUsers] = useState(null);
  const [lastDirection, setLastDirection] = useState();


  const userId = cookies.UserId;

  console.log('userId', userId);
  const getUser = async () => {
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

  const getGenderedUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/gendered-users', {
        params: { gender: user?.gender_interest }
      })
      setGenderedUsers(response.data);
    } catch (error) {
      console.log(error);
    }
  }
  console.log('genderedUsers', genderedUsers);
  console.log('user is here', user);

  useEffect(() => {
        getUser()
    }, [])

    useEffect(() => {
        if (user) {
            getGenderedUsers()
        }
    }, [user])

  console.log('user', user);
  console.log('genderedUsers', genderedUsers);
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

  const updatedMatches = async (matchedUserId) => {
    try {
      await axios.put('http://localhost:8000/addmatch', {
        userId,
        matchedUserId
      })
      getUser();
    } catch (error) {
      console.log(error);
    }
  }


  const swiped = (direction, swipedUserId) => {

    if(direction === 'right'){
      updatedMatches(swipedUserId);
    }
    setLastDirection(direction)
  }

  const outOfFrame = (name) => {
    console.log(name + ' left the screen!')
  }

  const matchedUserIds = user?.matches.map(({user_id}) => user_id).concat(userId);

  const filteredGenderedUsers = genderedUsers?.filter(
    genderedUser => !matchedUserIds.includes(genderedUser.user_id)
  );
    console.log('filteredGenderedUsers', filteredGenderedUsers);
  return (
    <>
    { user &&
      <div className="dashboard">
        <ChatContainer user={user} />
        <div className="swipe-container">
          { genderedUsers && 
          <div className="card-container">
            {filteredGenderedUsers.map((character) =>
              <TinderCard
                className='swipe'
                key={character.first_name}
                onSwipe={(dir) => swiped(dir, character.user_id)}
                onCardLeftScreen={() => outOfFrame(character.first_name)}>
                <div style={{ backgroundImage: 'url(' + character.url + ')' }} className='card'>
                  <h3>{character.first_name}</h3>
                </div>
              </TinderCard>
            )}
          </div> }
          <div className="swipe-info">
            {lastDirection ? <p> You swiped {lastDirection}</p> : <p> : </p>}
          </div>
        </div>
      </div>
      }
    </>
  )
}
export default Dashboard;
