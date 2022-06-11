import { BASE_URL, API_KEY } from '../config';

export const gamesApi = {
    // later convert this url to infinite scrolling
    fetchAllGames: () =>
        fetch(`${BASE_URL}/games?key=${API_KEY}`).then(res => {
            return res.json();
        })
};
