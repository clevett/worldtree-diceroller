"use client";
import { useEffect, useState } from "react";
import styles from "./DiceInput.module.css";

export const DiceInput = ({
  defaultValue = "",
  onSubmit,
}: {
  defaultValue?: string;
  onSubmit: (value: string) => void;
}) => {
  const [value, setValue] = useState(defaultValue);

  //Assumption: A better option would be used for a released feature. This just being used for a quick demo.
  useEffect(() => {
    if (value !== defaultValue) {
      setValue(defaultValue);
    }
  }, [defaultValue]);

  const handleSubmit = (value: string) => {
    onSubmit(value);
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter") {
      handleSubmit(value);
    }
  };

  const onBlur = () => {
    setValue(defaultValue);
  };

  return (
    <input
      className={`md:min-w-[480px] ${styles.input}`}
      onBlur={onBlur}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={handleKeyDown}
      onSubmit={() => handleSubmit(value)}
      placeholder="/r 2d20kh1+1d4+5"
      type="text"
      value={value}
    />
  );
};
