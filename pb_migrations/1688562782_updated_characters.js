migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  collection.listRule = "@request.auth.id = creator.id || @request.auth.id = campaign.creator.id"
  collection.viewRule = "@request.auth.id = creator.id || @request.auth.id = campaign.creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  collection.listRule = null
  collection.viewRule = null

  return dao.saveCollection(collection)
})
