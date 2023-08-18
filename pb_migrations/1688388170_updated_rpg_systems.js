migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  collection.listRule = "@request.auth.admin = true"
  collection.viewRule = "@request.auth.admin = true"
  collection.createRule = "@request.auth.admin = true"
  collection.updateRule = "@request.auth.admin = true"
  collection.deleteRule = "@request.auth.admin = true"

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
