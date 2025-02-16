import type {Route} from "./+types/home";
import {Welcome} from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "MaListe+"},
        {name: "description", content: "MaListe+ makes shopping simple: create, manage, and access your lists instantly."},
    ];
}

export default function Home() {
    return (
        <Welcome/>
    );
}
