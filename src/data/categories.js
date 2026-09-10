import { NETWORKING } from "./networking.js";
import { PROGRAMMING } from "./programming.js";
import { CLOUD } from "./cloud.js";
import { DEVOPS } from "./devops.js";
import { DATABASES } from "./databases.js";

// Each category needs a name, a color pair (for the tag), and its question bank.
// To add a new category: create a data file like the others above, then add
// an entry here. The puzzle generator picks it up automatically.
export const CATEGORIES = [
  { name: "Networking", data: NETWORKING, color: "#185FA5", bg: "#E6F1FB" },
  { name: "Programming", data: PROGRAMMING, color: "#534AB7", bg: "#EEEDFE" },
  { name: "Cloud", data: CLOUD, color: "#0F6E56", bg: "#E1F5EE" },
  { name: "DevOps", data: DEVOPS, color: "#993C1D", bg: "#FAECE7" },
  { name: "Databases", data: DATABASES, color: "#993556", bg: "#FBEAF0" },
];
