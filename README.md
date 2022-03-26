# KAG Player Location

This program fetches and sends player location data to connected KAG servers. It is currently used for displaying country flags on the scoreboard.

## Prerequisites

- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)

## Setup

1. Install dependencies using `npm install`
2. Add servers, adjust the reconnect interval, and add your API token in `config.json`
3. Compile the program using `npm run-script build`
4. Ensure `sv_tcpr = 1` is set in the server `autoconfig.cfg`:
5. Run the program using `npm run-script start`
