import Pocketbase from "pocketbase";
import { writable } from "svelte/store"
import { env } from '$env/dynamic/public';

export const pb = new Pocketbase(env.PUBLIC_POCKETBASE_URL);

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
      const bodyJson = JSON.parse(options.body)

      if (bodyJson && !bodyJson.creator && pb.authStore.model !== null) {
        bodyJson.creator = pb.authStore.model.id
        options.body = JSON.stringify(bodyJson)
      }
    } catch (e) {
      console.log("Not a JSON object")
    } 
  }

  return { url, options };
};
