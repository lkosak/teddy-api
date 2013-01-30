# TEDdy API #
A tiny node.js app that dumps a collection of TED talks from mongodb.

## Endpoints ##

**/v1/talks**
* format: JSON
* params:
  * offset (default: 0)
  * limit (default: 30)

Returns a set of talks. Includes all attributes.

## Dependencies ##

* mongodb (not sure what version; probably doesn't matter too much)

## Loading the dataset ##

1. Import csv into mongo
`mongoimport -d tedder -c talks --type csv --file seeds/all_ted_talks_2012_11_29.csv --headerline`

2. Convert dates. Within the mongodb client:
```javascript
    var cursor = db.talks.find()
    while (cursor.hasNext()) {
      var doc = cursor.next();
      db.talks.update({_id : doc._id}, {$set : {published_on : new Date(doc.published_on)}})
    }
```

3. That should do it!
