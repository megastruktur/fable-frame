migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  collection.viewRule = "@request.auth.id = characters.creator.id"
  collection.createRule = "@request.auth.id != \"\""
  collection.updateRule = "@request.auth.id = creator.id"
  collection.deleteRule = "@request.auth.id = creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("qnlrhnmrrof1i0e")

  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
