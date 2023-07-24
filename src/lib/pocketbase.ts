import Pocketbase from "pocketbase";
import { writable } from "svelte/store"
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const pb = new Pocketbase(PUBLIC_POCKETBASE_URL);

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
