import Pocketbase from "pocketbase";
import { writable } from "svelte/store"

export const pb = new Pocketbase("http://localhost:8090");

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth) => {
  console.log("AuthStore changed", auth)
  currentUser.set(pb.authStore.model)
})
