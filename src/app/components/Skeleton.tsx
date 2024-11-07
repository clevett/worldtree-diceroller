import styles from "./Skeleton.module.css";

export const Skeleton = () => {
  return (
    <div className="flex flex-wrap flex-row place-content-center h-full w-full gap-4">
      <div className={styles.text_field}></div>
      <div className={styles.text_field}></div>
      <div className={styles.text_field}></div>
    </div>
  );
};
