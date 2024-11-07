import Image from "next/image";

import { Header, Skeleton } from "@/app/components";
import { icon_button } from "@/app/images";

import styles from "./page.module.css";

export default function Home() {
  //Assumption: State zero is the loading state. If using NextJS there are way to handle loading state. If using base React then this would be replace by an implementation related to getting data.
  const isLoading = false;

  return (
    <div
      className={`grid grid-rows-[68px_1fr] h-full w-full min-h-dvh relative ${styles.surface}`}
    >
      <Header />

      <main className="grid grid-rows-[1fr_100px] content-center">
        {/* Assumption: This will be used as a loading state and may include a animation for effect. If team is open to it, I would use Storybook to create front end components so design could preview states such as loading, error, and success. This could also be used in the future for sharing the component library if we want to build a "create your own system". */}
        {isLoading && <Skeleton />}

        <div className="grid place-content-center row-start-2 h-full w-full">
          <div className={styles.input_layout}>
            <Image src={icon_button} alt={"dice menu"} />
            <input
              className={`md:min-w-[480px] ${styles.input}`}
              type="text"
              placeholder="/r 2d20kh1+1d4+5"
            />
          </div>
        </div>
      </main>
    </div>
  );
}
