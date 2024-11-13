import { Header, DiceContainer, Skeleton } from "@/app/components";

import styles from "./page.module.css";
import axios from "axios";

//Assumption: FULL-STACK ENGINEER WITH FRONT-END FOCUS - I will allocate 3 hours to front end details as that is the focus. In a real planning phase and assuming this project is a foundation, I would evaluate using tools like Storybook, customizing Tailwind, and building a design library to match the design system before coding the feature. "Slow Down to Speed Up".

export default async function Home() {
  const token = await axios
    .post(process.env.API + "/api/access-token")
    .then((res) => {
      return res.data.accessToken;
    })
    .catch((error) => {
      console.error(error);
    });

  //Assumption: This better handled by a piece of state or resolve condition for the Promise so that if their is an error then we alter the user of that rather than a loading screen which provides no context.
  const isLoading = !token ? true : false;

  return (
    <div
      className={`grid grid-rows-[68px_1fr] h-full w-full min-h-dvh relative ${styles.surface}`}
    >
      <Header />

      <main className="grid grid-rows-[1fr_100px] content-center">
        {/* Assumption: This will be used as a loading state and may include a animation for a skeleton effect. If team is open to it, I would use Storybook to create front end components in so design could QA states such as loading, error, and success. Storybook could also be used in the future for sharing the component library if we want to build a "create your own" feature. */}
        {isLoading && <Skeleton />}

        <DiceContainer token={token} />
      </main>
    </div>
  );
}
