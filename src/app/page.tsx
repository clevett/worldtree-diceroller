import { Header, DiceContainer, Skeleton } from "@/app/components";

import styles from "./page.module.css";
import axios from "axios";

export default async function Home() {
  const token = await axios
    .post(process.env.API + "/api/access-token")
    .then((res) => {
      return res.data.accessToken;
    })
    .catch((error) => {
      console.error(error);
    });

  //This better handled by a piece of state or resolve condition for the Promise so that if their is an error then we alter the user of that rather than a loading screen which provides no context.
  const isLoading = !token ? true : false;

  return (
    <div
      className={`grid grid-rows-[68px_1fr] h-full w-full min-h-dvh relative ${styles.surface}`}
    >
      <Header />

      <main className="grid grid-rows-[1fr_100px] content-center">
        {isLoading && <Skeleton />}

        <DiceContainer token={token} />
      </main>
    </div>
  );
}
