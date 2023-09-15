/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  collection.listRule = "@request.auth.id = campaign.creator"
  collection.viewRule = "@request.auth.id = campaign.creator"
  collection.createRule = "@request.auth.id = campaign.creator"
  collection.deleteRule = "@request.auth.id = creator.id || @request.auth.id = campaign.creator"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("shh0f358w4655fm")

  collection.listRule = "@request.auth.id = campaign.characters.creator.id"
  collection.viewRule = "@request.auth.id = campaign.characters.creator.id"
  collection.createRule = "@request.auth.id = campaign.characters.creator.id"
  collection.deleteRule = "@request.auth.id = creator.id || @request.auth.id = campaign.creator.id"

  return dao.saveCollection(collection)
})
