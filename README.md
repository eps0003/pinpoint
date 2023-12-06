# Pinpoint

A [King Arthur's Gold](https://kag2d.com/) mod that displays player country flags on the scoreboard. This is accomplished by sending the player's IP address to a backend program which retrieves the player's country and sends it back to KAG to display. The backend program does not keep maintain a record or player IP addresses and is solely used to retrieve the player's country.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## Mod Setup

1. Create a `Pinpoint` directory in your KAG `Mods` directory
2. Move the contents of the `mod` directory into the `Pinpoint` directory
3. Add `Pinpoint` to a new line of `mods.cfg`
4. Ensure `sv_tcpr = 1` is set in the server `autoconfig.cfg`

## Backend Setup

1. Navigate to the `backend` directory
2. Install dependencies using `npm install`
3. Copy and rename `example.config.json` to `config.json`, then configure it
4. Compile the program using `npm run-script build`
5. Run the program using `npm run-script start`
