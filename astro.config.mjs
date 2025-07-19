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
          autogenerate: { directory: "getting-started"}
        },
        {
          label: "Evolution Goals",
          autogenerate: { directory: "evolutions" },
        },
      ],
    }),
  ],
});
