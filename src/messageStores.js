import { writable } from "svelte/store";
export const notice = writable("");
export function resetAlerts() {
  alertInfo.set(false);
  alertDanger.set(false);
  alertPrimary.set(false);
  alertSuccess.set(false);
}
export const alertInfo = writable(false);
export const alertDanger = writable(false);
export const alertPrimary = writable(false);
export const alertSuccess = writable(false);
