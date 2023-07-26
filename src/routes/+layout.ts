// src/routes/+layout.ts
export const load = ({ url }) => {
  const { pathname } = url

  return {
    pathname
  }
}
