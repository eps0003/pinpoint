# Pinpoint

This program fetches and sends player location data to connected KAG servers. It is currently used for displaying country flags on the scoreboard.

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
