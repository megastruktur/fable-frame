migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  collection.updateRule = "@request.auth.admin = true"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qew4qqb536t1zxd")

  collection.updateRule = null

  return dao.saveCollection(collection)
})
