import { writable } from "svelte/store";
export const userDetails = writable({
  formState: undefined,
  email: undefined,
  name: undefined,
  school: undefined,
  grade: undefined,
  homeroom: undefined,
  userRole: undefined,
  isStudent: undefined,
  isInClub: undefined,
  hasPendingClub: undefined,
  currentClubName: undefined,
  currentClubName: undefined,
  currentClubId: undefined,
  isModerator: undefined,
  formSubmitted: false,
  formState: undefined,
  canSubmit: undefined,
  isAdmin: undefined,
});