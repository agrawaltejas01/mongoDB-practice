// A db has many documents.
// Generally in millions
// When we do a find MediaQueryList, mongoDB returns these files in batches
// Cursor actually points to next batch

// so find() returns a cursor

use movieData

db.movies.find().count()
// 240
// Here cursor counted number of entries returned in the batch

// SORT

db.movies.find().sort( { "rating.average" : -1, runtime : 1 } ).pretty()
// sort( {param1 : (asc)1/(desc)-1, param2 : (asc)1/(desc)-1, ...., paramn : (asc)1/(desc)-1 } )

// Skipping or limting

// skip => skip n number of documents

db.movies.find().sort({"rating.average" : 1}).skip(10).pretty();
// Skip first 100 elements after sorting according to rating.average

// limit => limit the number of documents cursor retieves
db.movies.find().sort( {"rating.average" : 1} ).skip(10).limit(10).pretty()