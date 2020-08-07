use udemyMongo

// INSERT ONE AT A TIME = insertOne()
// db.collectionName.insertOne( {...} )
db.persons.insertOne(
    {
        name : "Max",
        age : 30,
        hobbies : [
            "Sports",
            "Cooking"
        ]
    }
)

db.persons.insertOne(
    {
        name : "Manuel",
        age : 31,
        hobbies : [
            "Cars",
            "Cooking"
        ]
    }
)

// INSERT MANY AT A TIME = insertMany()
// db.collectionName.insertMany( [ {}, {}, ... , {} ] )
// insertMany takes array of documents
// Its fine if we put only one entry in insertMany
db.persons.insertMany(
    [
        {
            name : "Anna",
            age : 29,
            hobbies : [
                "Sports",
                "Yoga"
            ]
        }
    ]
)

// Schema of mongoDB need not be consistent
// Unless said so in the schema option
db.persons.insertMany(
    [
        {
           name : "Maria",
           age : 31 
        },

        {
            name : "Chris",
            age : 25
        }
    ]
)

// We can give our own _id as well
db.hobbies.insertMany(
    [
        {
            _id : "sports",
            name : "Sports"
        },

        {
            _id : "cooking",
            name : "Cooking"
        },

        {
            _id : "cars",
            name : "Cars"
        }
    ]
)

// {
//     "acknowledged" : true,
//     "insertedIds" : [
//             "sports",
//             "cooking",
//             "cars"
//     ]
// }

// What happens if we repeat the id ? 

// ````````````````````````````Orderd Insert`````````````````````````````

db.hobbies.insertMany(
    [
        {
            _id : "yoga",
            name : "Yoga"
        },

        {
            _id : "cooking",
            name : "Cooking"
        },

        {
            _id : "hiking",
            name : "Hinking"
        }
    ]
)
// It inserts the first one => yoga
// Fails at 2nd one => cooking, as _id already exists
// 3rd one is not inserted, because opertaion failed at 2nd
// But first one is inserted. This is called ordered insertion
// Operation does not rollback, it inserts up to the point where error occured 

// Overriding ordered insertion
db.hobbies.insertMany(
    [
        {
            _id : "reading",
            name : "Reading"
        },

        {
            _id : "yoga",
            name : "Yoga"
        }
    ],

    {
        ordered : false                 // Overrides the default behaviour, now even the first one will not be inserted
    }
)

// ````````````````````````````WriteConcern`````````````````````````````

// We might have multiple instance of the database
// We can tell the mongoDB storage engine, if we want to see the acknowldement of our operation
// WriteConcern : { w : 1, j : undefined} => Default
// w : 1 => acknowledgement will be shown, w : 0 => Acknowledgement will not be shown irrespective of insertion happened or not 
// j = journal
// MongoDB Storage engine store a file called journal
// We can store info of our operations in this journal
// { w = 1, j = true} => Write on 1 instance. Write on journal also and give me status of my operation (failed or success)

db.persons.insertOne(
    {
        "name" : "CHetan",
        age : 20
    },

    {
        writeConcern : {
            w : 0
        }
        
    }
)
// { "acknowledged" : false } => Even though data was added, acknowlwdgement was not shown
// When w = 0, we dont knwo if the request even reached the server. So we dont knwo the _id of the object generated(if generated), 
//  hence acknowledgement is given as false

db.persons.insertOne(
    {
        "name" : "Himanshu",
        age : 20
    },

    {
        writeConcern : {
            w : 1,
            j : false
        }
        
    }
)
// Entry will be written on journal also for higher security
// Here operation might be a little slower, because we are waiting for engine to write on the journal also.


//`````````````Importing Data```````````````
// mongoimport file_name -d database_name -c collection_name <--jsonArray> <--drop>
// --jsonArray => If there multiple document in file, use this.
// --drop => If there already exists such collection, delete it and create new One

// ``````````````````````````````````````````Practice`````````````````````````````````
db.company.insertOne(
    {
        _id : 1,
        name : "Google",
        stalk : 100
    }
)

db.company.insertMany(
    [
        {
            _id : 2,
            name : "Microsoft",
            stalk : 90
        },

        {
            _id : 3,
            name : "Apple",
            stalk : 95
        },

        {
            _id : 4,
            name : "DB",
            stalk : 60
        }
    ]
)

db.company.insertMany(
    [
        {
            _id : 5,
            name : "PayPal",
            stalk : 90
        },

        {
            _id : 3,
            name : "PhonePay",
            stalk : 70
        },

        {
            _id : 6,
            name : "Goldman Sachs",
            stalk : 75
        }
    ],

    {
        ordered : false
    }
)