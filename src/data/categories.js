import { NETWORKING } from "./networking.js";
import { PROGRAMMING } from "./programming.js";
import { CLOUD } from "./cloud.js";
import { DEVOPS } from "./devops.js";
import { DATABASES } from "./databases.js";

// Each category needs a name, a color pair (for the tag), and its question bank.
// To add a new category: create a data file like the others above, then add
// an entry here. The puzzle generator picks it up automatically.
export const CATEGORIES = [
  { name: "Networking", data: NETWORKING, color: "#7eb6e8", bg: "#1a2d42" },
  { name: "Programming", data: PROGRAMMING, color: "#b4acf5", bg: "#25244a" },
  { name: "Cloud", data: CLOUD, color: "#6ec9a8", bg: "#16352c" },
  { name: "DevOps", data: DEVOPS, color: "#e09a7a", bg: "#3a241c" },
  { name: "Databases", data: DATABASES, color: "#e08aa8", bg: "#3a1f2c" },
];
