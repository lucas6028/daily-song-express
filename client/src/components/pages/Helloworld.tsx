import { useEffect } from "react"
import RefreshToken from "../api/RefreshToken"

export default function Helloworld() {
    useEffect(() => {
        try {
            RefreshToken();
        } catch (err) {
            console.error(err);
        }
    }, [])

    return (
        <h1>Hello World!</h1>
    )
}
