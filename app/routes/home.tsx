import type { Route } from "./+types/home";
import { Welcome } from "~/welcome/welcome";
import Layout from "~/components/Layout";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "MaListe+" },
    { name: "description", content: "Welcome to MaListe+" },
  ];
}

export default function Home() {
  return (
      <Layout>
        <Welcome />
      </Layout>
  );
}
