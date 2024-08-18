import axios from "axios";

function TopTrack() {
    axios
        .get(import.meta.env.VITE_SERVER_URL + "/track/myTop")
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.error(err);
        })
    return (
        <h1>Top Tracks</h1>
    )
}

export default TopTrack