/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  collection.listRule = "@request.auth.id != \"\""
  collection.viewRule = "@request.auth.id != \"\""

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("cfh703t0mjspxbr")

  collection.listRule = "@request.auth.id != \"\" && (@request.auth.id = creator.id || @request.auth.id = campaign.creator.id)"
  collection.viewRule = "@request.auth.id != \"\" && (@request.auth.id = creator.id || @request.auth.id = campaign.creator.id)"

  return dao.saveCollection(collection)
})
