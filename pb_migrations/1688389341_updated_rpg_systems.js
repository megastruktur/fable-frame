migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  collection.listRule = "@request.auth.id != \"\" && @request.auth.admin = true"
  collection.viewRule = "@request.auth.id != \"\" && @request.auth.admin = true"
  collection.createRule = "@request.auth.id != \"\" && @request.auth.admin = true"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.admin = true"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.admin = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
