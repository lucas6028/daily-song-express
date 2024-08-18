import axios from "axios";
import { useState } from "react";

function TopTrack() {
    const [imgUrl, setImgUrl] = useState("");
    axios
        .get(import.meta.env.VITE_SERVER_URL + "/track/myTop")
        .then((res) => {
            console.log(res);
            setImgUrl(res.data.body.items[0].album.images[1].url);
        })
        .catch((err) => {
            console.error(err);
        })
    return (
        <>
            <h1>Top Tracks</h1>
            <img src={imgUrl} alt="img"></img>
        </>
    )
}

export default TopTrack