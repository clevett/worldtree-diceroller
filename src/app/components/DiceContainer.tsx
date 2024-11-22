"use client";

import axios from "axios";
import { useState } from "react";

import { NotationField } from "./NotationField";

const getLocalUser = () => {
  return {
    id: 1,
    name: "Me!",
    icon: (
      <div className="flex justify-center items-center bg-primary rounded-full text-dark-outline h-[32px] w-[32px] font-bold">
        M
      </div>
    ),
  };
};

const getGuestUser = () => {
  return {
    id: 2,
    name: "Guest",
    icon: (
      <div className="flex justify-center items-center bg-primary rounded-full text-dark-outline h-[32px] w-[32px] font-bold">
        G
      </div>
    ),
  };
};

type User = {
  id: number;
  name: string;
  icon: JSX.Element;
};

const rollExample = {
  id: 1,
  user: getLocalUser(),
  timestamp: Date.now(),
  result: {
    notationAsJson: [
      {
        count: 2,
        sides: 20,
        negative: false,
        keepHighest: 1,
      },
      {
        count: 1,
        sides: 4,
        negative: false,
      },
      {
        constant: 5,
      },
    ],
    results: [
      {
        type: "dice",
        count: 2,
        sides: 20,
        allRolls: [7, 10],
        keptRolls: [10],
        total: 10,
      },
      {
        type: "dice",
        count: 1,
        sides: 4,
        allRolls: [3],
        keptRolls: [3],
        total: 3,
      },
      {
        type: "constant",
        result: 5,
      },
    ],
    sum: 18,
    notation: "r 2d20kh1+1d4+5",
  },
};

type Announcement = {
  timestamp: number;
  user: User;
  result: (typeof rollExample)["result"];
  id: number;
};

const Types = {
  DICE: "dice",
  CONST: "const",
};

//Color theming would be done as a first step to make a matching the designs a lot easier. For now skip lot of the design details like colors, padding, and spacing.

export const DiceContainer = ({ token }: { token: string }) => {
  //TODO: Replace this with a websocket to get the announcements from other users.
  const localUser = getLocalUser();

  const getDiceNotation = (result: Announcement["result"]["results"]) => {
    const notations: JSX.Element[] = [];
    //Loop through the results and wrap any kept dice rolls with a span using className text-99 to give it the eye catching lighter color.
    //This solution simple mapping is based on the Figma example. I would ask questions about how this feature might be built out and use in the future to make the this helper function more scalable.
    result.forEach((e) => {
      if (e.type === Types.DICE && e.allRolls && e.allRolls.length > 1) {
        //Loops through the allRolls. If the number is included in kepRolls then then highlight it with then use the lighter text color. Keeping in mind that we could roll 3d20s and get three 10s. In which case we only need to highlight two of the three. Wrap the result from with with () and use pipe | to separate them.
      }

      if (e.type === Types.DICE && e.allRolls === e.keptRolls) {
        //Assuming we kept all of them and can highlight the result and wrap it in ()
      }

      if (e.type === Types.CONST) {
        //Wrap it in a span with the text color for kept dice rolls.
      }

      //Assume put all the above elements into an array the join them with a +
      //Ideally I would create enums or constants to store the type strings in order to keep the syntax in one place. This could also be using for types, typeguards, and potential string validation in the future.
    });

    //Return this for the preview of the feature. The above logic would build out the middle then join it with +
    return (
      <span className="text-dark-outline">
        (15 | <span className="text-neutral-99">5</span>) + (
        <span className="text-neutral-99">3</span>) +
        <span className="text-neutral-99">5</span>
      </span>
    );
  };

  //Assumption: This local state is for this demo. A websocket is in the implementation details so a better solution would be to setup a hook, context, or other state to handle getting the announcements from other users and likely sorting these by timestamps to ensure they are in an expected order.
  //An important question is where in the app are rolls going to come from. For example Roll20 or Quest Portal rolls can be added to a chat input similar to this design. They can also come from character sheets, roll menu, and apis. This results in multiple rolls from multiple users coming from multiple areas of the app. This means we have to be mindful of the ui when rendering the results to ensure they appear intuitive to the users. This can influence were in the app we build this feedback.
  //Setting element 0 for the purpose of demo and showing the styling.
  const [announcements, setAnnouncements] = useState<Announcement[]>([
    rollExample,
  ]);

  const onRoll = async (notation: string) => {
    await axios
      .get(
        `${process.env.NEXT_PUBLIC_ROLLS}/api/dice-rolls/${notation}/?accessToken=${token}&verbose=true`
      )
      .then((res: { data: { notation: string; sum: number } }) => {
        const announcement = {
          id: announcements.length + 1, //UUID likely needed here.
          user: getGuestUser(),
          timestamp: Date.now(),
          result: res.data,
          notation: res.data.notation,
        };
        const update =
          announcements.length > 0
            ? [...announcements, announcement]
            : [announcement];

        setAnnouncements(update);
      })
      .catch((error: unknown) => {
        //This should set a message to inform the user when their are problems. We might also put in an incident tracking if we are planning to use something like Sentry.
        console.error(error);
      });
  };

  return (
    <>
      {/* This section will need scroll/overflow improvements. Right now it will break the layout when do to many rolls. There are libraries for this. Set the min/max for web demo but this would need adjustment for mobile. */}
      <div className="grid gap-2 auto-rows-min max-w-[480px] min-w-[480px] justify-self-center">
        {announcements.map((a: Announcement) => {
          //Assumption: Users would
          const isLocalUser = a.user.id === localUser.id;
          //Assuming the roll announcement with the background is the local user. If so then simple up updating the styles to add a background and align the content to the right. Rolls from other users will be aligned to the left with a transparent background.
          const localStyles = isLocalUser
            ? "bg-[#41deb424] justify-self-end rounded-lg"
            : "bg-transparent self-start grid-cols-[32px_1fr]";

          return (
            <div
              key={`roll-announcement-${a.id}`}
              className={`grid gap-2 auto-flow-cols auto-rows-min max-w-[188px] min-w-[188px] ${localStyles}`}
            >
              <div>{!isLocalUser && a.user.icon}</div>
              <div
                className={`grid gap-2 auto-rows-min ${
                  isLocalUser ? "px-2 py-4" : ""
                }`}
              >
                <div className="grid gap-4 grid-flow-col auto-rows-min">
                  {!isLocalUser && (
                    //  Assumption: Alignment needs improvement to better align with the icon to match the designs. Making an assumption we're looking for the overall implementation here rather than the details.
                    <span className="text-primary font-bold">
                      {a.user.name}
                    </span>
                  )}
                  {/* Assumption: Timestamp doesn't match the designs but this is an easy fix. I'll skip this for now for the sake of time. We can use date to convert it to a more human readable string. This need styling improvements to match the designs font size and color. */}
                  <span className="text-dark-outline justify-self-end">
                    {a.timestamp}
                  </span>
                </div>

                {/* Assumption: Build this 'notation' string in a helper function were dice results are returned with the lighter color text per the designs. This easy to do mapping over the JSON provided by the API. I would have questions about potentially future features we want to do and if rolls will be stored in a data base. */}
                <div className="text-dark-outline">{`/${a.result.notation}`}</div>
                <div>{getDiceNotation(a.result.results)}</div>
                <div className="text-neutral-99">{`= ${a.result.sum}`}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="grid place-content-center row-start-2 h-full w-full">
        <NotationField onRoll={onRoll} />
      </div>
    </>
  );
};
