/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dr26359lifz1ycf")

  collection.viewRule = ""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("dr26359lifz1ycf")

  collection.viewRule = "@request.auth.id = campaign.creator"

  return dao.saveCollection(collection)
})
