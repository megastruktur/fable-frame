import Pocketbase from "pocketbase";
import { writable } from "svelte/store"
import { env } from '$env/dynamic/public';

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);
pb.autoCancellation(false);

export const currentUser = writable(pb.authStore.model)

pb.authStore.onChange((auth) => {
  console.log("AuthStore changed", auth)
  currentUser.set(pb.authStore.model)
  if (document !== undefined) {
    document.cookie = pb.authStore.exportToCookie({ httpOnly: false })
  }
})

try {
  if (!pb.authStore.isValid) {
    currentUser.set(null)
  }
} catch (_) {
  console.log("Error")
}

pb.beforeSend = function (url, options) {

  // Add Creator field when making a request.
  if (options.body !== undefined) {

    try {

      if (options.body instanceof FormData) {
        if (pb.authStore.model !== null) {
          options.body.set("creator", pb.authStore.model.id)
        }
      }
      if (typeof options.body === "string") {

        const bodyJson = JSON.parse(options.body)
  
        if (bodyJson && !bodyJson.creator && pb.authStore.model !== null) {
          bodyJson.creator = pb.authStore.model.id
          options.body = JSON.stringify(bodyJson)
        }
      }
      else {
        if (options.body !== undefined && pb.authStore.model !== null) {
          options.body.creator = pb.authStore.model.id
        }
      }
    } catch (e) {
      console.log(options.body)
      console.log("PB parse object error")
    } 
  }

  return { url, options };
};
