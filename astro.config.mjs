// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import cookieConsent from "@jop-software/astro-cookieconsent";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  integrations: [starlight({
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
        autogenerate: { directory: "catch" },
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
        autogenerate: { directory: "victory-road" },
      },
      {
        label: "Path of Legends",
        autogenerate: { directory: "path-of-legends" },
      },
    ],
  }), cookieConsent({
    guiOptions: {
      consentModal: {
        equalWeightButtons: true,
        flipButtons: false,
        layout: "cloud",
        position: "bottom center",
      },
      preferencesModal: {
        layout: "box",
        equalWeightButtons: true,
        position: "right",
        flipButtons: false,
      },
    },
    categories: {
      necessary: {
        enabled: true, // this category is enabled by default
        readOnly: true, // this category cannot be disabled
      },
      thirdPartyContent: {
        enabled: true,
        readOnly: false,
      },
    },
    language: {
      default: "en",
      translations: {
        en: {
          consentModal: {
            title: "You want a cookie?",
            description:
              "There's no tracking involved, but GDPR forces my hand if I want to embed external services :(",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            showPreferencesBtn: "Manage Individual preferences",
          },
          preferencesModal: {
            title: "Manage cookie preferences",
            acceptAllBtn: "Accept all",
            acceptNecessaryBtn: "Reject all",
            savePreferencesBtn: "Accept current selection",
            closeIconLabel: "Close modal",
            sections: [
              {
                title: "Somebody said ... cookies?",
                description: "I want one!",
              },
              {
                title: "Strictly Necessary cookies",
                description:
                  "These cookies are essential for the proper functioning of the website and cannot be disabled.",

                linkedCategory: "necessary",
              },
              {
                title: "Third Party Content cookies",
                description:
                  "These cookies allow us to embed external content like YouTube Videos or Maps.",
                linkedCategory: "thirdPartyContent",
              },
              {
                title: "More information",
                description:
                  "For any queries in relation to my policy on cookies and your choices, message @cyklan on the Lockout.live discord.",
              },
            ],
          },
        },
      },
    },
  }), preact()],
});