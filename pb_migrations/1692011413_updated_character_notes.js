migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.id = creator.id"
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.id = creator.id"
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = creator.id"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.id = creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("td18h7zr0u0vqgm")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
