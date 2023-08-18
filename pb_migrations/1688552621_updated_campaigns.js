migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  collection.listRule = "@request.auth.id = creator.id"
  collection.viewRule = "@request.auth.id = creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
