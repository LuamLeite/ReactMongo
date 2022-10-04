import axios from "axios";
import { useEffect, useState } from 'react';

const MatchesDisplay = (props) => {
    const [matchedProfiles, setMatchedProfiles] = useState(null);
    const matchedUsersIds = props.matches.map((({ user_id }) => user_id));
    console.log('props0', props);
    const getMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/usersMatched', {
                params: { userIds: JSON.stringify(matchedUsersIds) }
            })
            setMatchedProfiles(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getMatches();
    }, []);

    console.log(matchedProfiles);

    return (
        <div className="matches-display">
            {matchedProfiles?.map((match, _index) => (
                <div key={{ _index }} className="match-card" onClick={() => props.setClickedUser(match)}>
                    <div className="img-container">
                        <img src={match?.url} alt={match?.first_name + ' profile'} />
                    </div>
                    <h3>{match?.first_name}</h3>
                </div>
            ))}
        </div>
    )
}

export default MatchesDisplay;