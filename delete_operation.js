use movieData

db.boxOffice.deleteOne(
    {
        "meta.rating" : {
            $gt : 9
        }
    }
)

db.boxOffice.deleteMany(
    {
        expectedVisitors : {
            $gt : 100
        }
    }
)

// Delteing all entries in a colection

1. db.boxOffice.deleteMany( {} )    
// Delete all documents in the database

2. db.boxOffice.drop()
// Drop collection directly

3. db.dropDatabase()
// Drop database directly