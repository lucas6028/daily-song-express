import useAuth from "../../hooks/useAuth";
import { DashboardProps } from "../Types";

export default function Dashboard({ code }: DashboardProps) {
    if (!code) return;
    console.log("run useAuth not yet");
    const accessToken = useAuth(code);
    console.log("Finishing useAuth, return the {code}");
    return (
        <p>{code}</p>
    );
}
