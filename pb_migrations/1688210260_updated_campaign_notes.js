migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  collection.listRule = "@request.auth.id = campaign.characters.creator.id"
  collection.viewRule = "@request.auth.id = campaign.characters.creator.id"
  collection.createRule = "@request.auth.id = campaign.characters.creator.id"
  collection.updateRule = "@request.auth.id = creator.id"
  collection.deleteRule = "@request.auth.id = creator.id || @request.auth.id = campaign.creator.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
