// src/routes/+layout.ts
export const ssr = false;
// export const prerender = true

export const load = ({ url }) => {
  const { pathname } = url

  return {
    pathname
  }
}
