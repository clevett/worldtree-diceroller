# Technical Challenge

World Tree Dice Roller Project

## Start the project

1. Run `npm install`
2. .env file with the API services, `API={address}` and `NEXT_PUBLIC_ROLLS="$API"`
3. Run `npm run dev` from worldtree-diceroller folder

## Assumptions

Assumptions can be found through the code with `Assumptions: `. One my development mentors told me it more important to be able to explain your thoughts than implement the perfect solution during a code eval. I've done my best to leave comments related to my thought process and how I might approach provided less time constraints.

## Front End Implementation

Limited front end implementation to 3 hours. Initial menu has been created and requires styling to indicated selected dice rolls in the notation. Comments have been left in the code about how I would proceed with the logic and visual updates.

## API Implementation

Ran into obstacles with NextJS relate to env. This my first time implementing API service into NextJs. In practice to solve this issue I would read through the documentation, search StackOverflow, and reach out for help if I was unable to make progress on a solution within couple hours.

## Quest Portal Implementation

I have implemented this feature and a macro build for Quest Portal. I used an open source library with BabylonJS + Ammo for the rolls as the animation is smoother. A hook called by the parent manage the state in the menu implementation but Recoil (later replaced by Jotai) was used in the formula builder. Roll announcements are sent to SendBird and a watch pulls them out of Firebase to update all users. Different parts of this feature were abstracted in our monorepo allowing reusability between marketing website (NextJS), Quest Portal app, and mobile app. The menu can be previewed here: https://www.questportal.com/roll

![dice_builder](https://github.com/user-attachments/assets/599b63f5-9c07-44e2-82b2-27cab54fecb0)
