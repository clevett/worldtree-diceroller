import { Header, NotationField, Skeleton } from "@/app/components";

import styles from "./page.module.css";

//Assumption: FULL-STACK ENGINEER WITH FRONT-END FOCUS - I will allocate 3 hours to front end details as that is the focus. In a real planning phase and assuming this project is a foundation, I would evaluate using tools like Storybook and customizing Tailwind to our design system before coding the feature. Perhaps even making all the initial base components with design approval before starting the actual project. "Slow Down to Speed Up". I will note ideas related to this when they come to mind but I will not take the time to implement them given this is a tech challenge.

export default function Home() {
  //Assumption: State zero is the loading state. Replace this with a state related to fetching the data. Not using NextJS features related to loading as World Tree may not be using NextJS.
  const isLoading = false;

  return (
    <div
      className={`grid grid-rows-[68px_1fr] h-full w-full min-h-dvh relative ${styles.surface}`}
    >
      <Header />

      <main className="grid grid-rows-[1fr_100px] content-center">
        {/* Assumption: This will be used as a loading state and may include a animation for a skeleton effect. If team is open to it, I would use Storybook to create front end components so design could QA states such as loading, error, and success. Storybook could also be used in the future for sharing the component library if we want to build a "create your own" feature. */}
        {isLoading && <Skeleton />}

        <div className="grid place-content-center row-start-2 h-full w-full">
          <NotationField />
        </div>
      </main>
    </div>
  );
}
