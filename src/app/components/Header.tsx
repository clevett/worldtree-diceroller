import Image from "next/image";

import { logo } from "@/app/images";

import styles from "./Header.module.css";

//Assumption: SVG in icons and images will be used across the app with variation. These should be put into their own components that take in props such as heigh, width, and color. Implementation below is simply to save time in this exercise.

export const Header = () => {
  return (
    <header className="flex w-full h-full relative">
      <div className={styles.header}>
        <div className={styles.logo}>
          <Image
            alt={"World Tree logo with twisting knotwork branches"}
            priority
            src={logo}
          />
        </div>
      </div>
    </header>
  );
};
