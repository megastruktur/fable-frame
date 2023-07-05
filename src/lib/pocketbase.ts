import Pocketbase from "pocketbase";
import { writable } from "svelte/store"

export const pb = new Pocketbase("http://127.0.0.1:8090");

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth) => {
  console.log("AuthStore changed", auth)
  currentUser.set(pb.authStore.model)
  document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
})

pb.beforeSend = function (url, options) {

  // Add Creator field when making a request.
  if (options.body !== undefined) {
    const bodyJson = JSON.parse(options.body)

    if (bodyJson && !bodyJson.creator && pb.authStore.model !== null) {
      bodyJson.creator = pb.authStore.model.id
      options.body = JSON.stringify(bodyJson)
    }
  }

  return { url, options };
};
