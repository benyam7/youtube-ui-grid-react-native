import { BASE_URL, API_KEY } from '../config';
export const youtubeApi = {
    getProgrammingVideos: ({pageParam = 1}) =>
        fetch(`${BASE_URL}/search?part=snippet&type=video&maxResults=20&q=programming&key=${API_KEY}`).then(res => {
            return res.json();
        })
};
