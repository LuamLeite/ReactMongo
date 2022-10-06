import axios from "axios";
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
const MatchesDisplay = (props) => {
    const [matchedProfiles, setMatchedProfiles] = useState(null);
    const matchedUsersIds = props.matches.map((({ user_id }) => user_id));
    const [cookies, setCookie, removeCookie] = useCookies(null);
    const userId = cookies.UserId;

    const getMatches = async () => {
        try {
            const response = await axios.get('http://localhost:8000/usersMatched', {
                params: { userIds: JSON.stringify(matchedUsersIds) }
            })
            setMatchedProfiles(response.data);
        } catch (error) {

        }
    }

    useEffect(() => {
        getMatches();
    }, []);

    const filteredMatchedProfiles = matchedProfiles?.filter(matchedProfile => matchedProfile.matches.filter(profile => profile.user_id == userId).length > 0);

    return (
        <div className="matches-display">
            {filteredMatchedProfiles?.map((match, _index) => (
                <div key={match.user_id} className="match-card" onClick={() => props.setClickedUser(match)}>
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