migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.id = creator.id || @request.auth.id = campaign.creator.id)"
  collection.updateRule = "@request.auth.id != \"\" && @request.auth.id = creator.id"
  collection.deleteRule = "@request.auth.id != \"\" && @request.auth.id = creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  collection.viewRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
