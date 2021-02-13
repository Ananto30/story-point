import { writable } from "svelte/store";

export const roomConfig = writable({
  maxTimerSeconds: 10,
  pointingSystem: "Fibonacci series",
  allowedPointingSystem: ["Fibonacci series", "T-shirt sizing"],
});
