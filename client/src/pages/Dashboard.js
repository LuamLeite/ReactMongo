import TinderCard from "react-tinder-card";
import { useState } from "react";
import ChatContainer from "../components/ChatContainer";
const Dashboard = () => {

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
        console.log('removing: ' + nameToDelete)
        setLastDirection(direction)
    }

    const outOfFrame = (name) => {
        console.log(name + ' left the screen!')
    }

    return (
        <div className="dashboard">
            <ChatContainer />
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
