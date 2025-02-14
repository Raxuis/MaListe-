import type {Route} from "./+types/home";
import {Welcome} from "~/welcome/welcome";

export function meta({}: Route.MetaArgs) {
    return [
        {title: "MaListe+"},
        {name: "description", content: "Welcome to MaListe+"},
    ];
}

export default function Home() {
    return (
        <Welcome/>
    );
}
