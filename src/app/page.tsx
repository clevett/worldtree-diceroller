import { Header, NotationField, Skeleton } from "@/app/components";

import styles from "./page.module.css";
import axios from "axios";

//Assumption: FULL-STACK ENGINEER WITH FRONT-END FOCUS - I will allocate 3 hours to front end details as that is the focus. In a real planning phase and assuming this project is a foundation, I would evaluate using tools like Storybook, customizing Tailwind, and building a design library to match the design system before coding the feature. "Slow Down to Speed Up".

export default function Home() {
  const token = axios
    .post(process.env.API + "/api/access-token")
    .then((res) => {
      return res.data.accessToken;
    })
    .catch((error) => {
      console.error(error);
    });

  //Assumption: Directions stated not to share the API address. I started to setup an env file and works on serve but ran into an issue passing this function to the client component. This was my first time trying to setup API service in NextJS and need to read the documentation to resolve it but hit my 4 hour limit. :)
  const onRoll = async (notation: string) => {
    console.log(notation);
    await axios
      .get(
        process.env.API +
          `/api/dice-rolls/${notation}/?accessToken=${token}&verbose=true`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const isLoading = true;

  return (
    <div
      className={`grid grid-rows-[68px_1fr] h-full w-full min-h-dvh relative ${styles.surface}`}
    >
      <Header />

      <main className="grid grid-rows-[1fr_100px] content-center">
        {/* Assumption: This will be used as a loading state and may include a animation for a skeleton effect. If team is open to it, I would use Storybook to create front end components in so design could QA states such as loading, error, and success. Storybook could also be used in the future for sharing the component library if we want to build a "create your own" feature. */}
        {isLoading && <Skeleton />}

        <div className="grid place-content-center row-start-2 h-full w-full">
          <NotationField />
        </div>
      </main>
    </div>
  );
}
