/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  collection.updateRule = "@request.auth.id = creator || @request.auth.id = campaign.creator"
  collection.deleteRule = "@request.auth.id = creator || @request.auth.id = campaign.creator"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("szqd7d7vqb3qf0w")

  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
