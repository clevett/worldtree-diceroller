"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";

import { DiceInput } from "@/app/components";
import { icon_button, d4, d6, d8, d10, d20, d100 } from "@/app/images";

import styles from "./NotationField.module.css";

//write a switch to get the image based on the number of sides
const getIcon = (die: number) => {
  switch (die) {
    case 4:
      return d4;
    case 6:
      return d6;
    case 8:
      return d8;
    case 10:
      return d10;
    case 20:
      return d20;
    case 100:
      return d100;
    default:
      return undefined;
  }
};

export const NotationField = ({ onRoll }: { onRoll: (n: string) => void }) => {
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef<HTMLDivElement | null>(null);

  //Assumption: Handling die button addition to the input field and the user typing additional inputs into the field is a more complex interaction than I have time to implement in this eval. When I did this for Quest Portal, I used Recoil as a state management for the feature. This allowed quick and dynamic string building for the notation as well as user feedback on the die buttons. Additionally I did some validation to allow us to inform the user when they entered an input which was not a valid dice notation.
  const [notation, setNotation] = useState<string | undefined>(undefined);

  const dice = [20, 100, 10, 8, 6, 4];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      //Assumption: There are component libraries with minimal styles such as Radix which may be an alternative to writing components from scratch. In real project, I would take the type to do further type checking but will leave "as" for this example.
      if (!ref.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
  }, [ref]);

  const updateNotation = (sides: number) => {
    setNotation(notation ? notation + `+1d${sides}` : `/r 1d${sides}`);
  };

  const onSubmit = (n: string) => {
    setNotation(n);
    onRoll(n);
  };

  return (
    <div className={`relative ${styles.input_layout}`}>
      {/* Assumption: This menu needs a nice animation so it slides down and up.  */}
      {isOpen && (
        <div className={styles.menu} ref={ref}>
          <div className={styles.page}>
            {dice.map((die) => (
              //Assumption: Move this button into its own component for better state handling and to keep the code clean. Pass the die value into a shared state. This can be done with Recoil, Context, or a Hook hosted by the parent component.
              <button
                //Assumption: Setup a simple check to see if the button is active. If so add a text- color class to the button per the designs.
                className={styles.dice}
                key={`die-button-${die}`}
                onClick={() => updateNotation(die)}
              >
                {/* Assumption: Icons should be made into components that accept variation like color. Then when the buttons are active the icon's color can be changed per the design  */}
                <Image src={getIcon(die)} alt={`d${die}`} />
                {`-d${die}`}
              </button>
            ))}
            {/* Assumption: Setup a simple check to see any dice button is clicked then update the color of the button as active. Preferably if notation is undefine there is some sort of alert for the user so they are told to enter a notation. */}
            <button
              className={styles.roll}
              onClick={() => onRoll(notation ?? "")}
            >
              Roll
            </button>
          </div>
        </div>
      )}

      {/* Assumption: Accessibility needs to be considered. The button should have a label for screen readers. Roll buttons might be visually hidden but we should consider keeping them available for screen readers. Opening the menu first may be an unnecessary extra step when navigating by audio. */}
      <button onClick={() => setIsOpen(!isOpen)}>
        <Image src={icon_button} alt={"dice menu"} />
      </button>

      <DiceInput
        onSubmit={(value) => onSubmit(value)}
        defaultValue={notation}
      />
    </div>
  );
};
