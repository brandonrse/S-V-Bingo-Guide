// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  integrations: [
    starlight({
      title: "S/V Bingo Guide",
      social: [
        {
          icon: "discord",
          label: "Discord",
          href: "https://discord.gg/GG2fAsbr6E",
        },
        {
          icon: "seti:lock",
          label: "Lockout.live",
          href: "https://lockout.live",
        },
      ],
      sidebar: [
        {
          label: "Getting Started",
          autogenerate: { directory: "getting-started" },
        },
        {
          label: "Catching Goals",
          autogenerate: { directory: "catch" }
        },
        {
          label: "Evolution Goals",
          autogenerate: { directory: "evolutions" },
        },
        {
          label: "In-Game Trades",
          autogenerate: { directory: "in-game-trades" },
        },
        {
          label: "League Rep Rewards",
          autogenerate: { directory: "league-rep-rewards" },
        },
        {
          label: "Purchasing Goals",
          autogenerate: { directory: "purchasing" },
        },
        {
          label: "Victory Road",
          autogenerate: { directory: "victory-road"}
        },
        {
          label: "Path of Legends",
          autogenerate: { directory: "path-of-legends" },
        },
      ],
    }),
  ],
});
