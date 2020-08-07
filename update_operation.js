use userData
//  import from users.json

// `````````````update One ````````````````
// db.collectionName.updateOne( {Condition for matching document}, {field you want to update} )
// Updates FIRST documents that matches the condition

// update hobbies of chris
db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $set: {
            hobbies: [
                {
                    title: "Sports",
                    frequency: 5
                },

                {
                    title: "Cooking",
                    frequency: 3
                },

                {
                    title: "Hiking",
                    frequency: 2
                }
            ]
        }
    }
)

// $set does not overwrite the keys that are not specified in it
// Here $set only got hobbies, so it will work only on hobbies, and no other key
// It can overwite the hobbie, even create it (if it does not exists already)

// ```````````````````Update Many ````````````````````
// db.updateMany( {Condition to match the documents}, {field to update} )
// Updates ALL documents that match the condition

// Add a field isSporty to true, if person has Sports as its hobby
db.users.updateMany(
    {
        "hobbies.title": "Sports"
    },

    {
        $set: {
            isSporty: true
        }
    }
)

// ```````````````````````$set`````````````````````
// $set does not overwrite the keys that are not specified in it
// Here $set only got hobbies, so it will work only on hobbies, and no other key
// It can overwite the hobbie, even create it (if it does not exists already)

// Add phone number and age to Chris
db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $set: {
            age: 40,
            phone: 483924792
        }
    }
)

// $set can
// add multiple fields
// overwrite multiple values
// add documents, arrays, combination of both, etc.

// ````````````````````````INCREMENTING or DECREMENTING``````````````````````````````

// Increment age of Manuel by 2 
db.users.updateOne(
    {
        name: "Manuel"
    },

    {
        $inc: {
            age: 2
        }
    }
)

// Decrement age of Manuel by 1
db.users.updateOne(
    {
        name: "Manuel"
    },

    {
        $inc: {
            age: -1
        }
    }
)

// Increament age of manuel by 1, and set isSporty yo false
db.users.updateOne(
    {
        name: "Manuel"
    },

    {
        $inc: {
            age: 1
        },

        $set: {
            isSporty: false
        }
    }
)

// When 2 updating operators ($set, $inc, etc) are working on the same field, it genrates an error
db.users.updateOne(
    {
        name: "Manuel"
    },

    {
        $inc: {
            age: 1
        },

        $set: {
            age: 30
        }
    }
)
// Error


// ``````````````````````````` Min, Max, Mul```````````````````````````````````

// $min => update the key only if given current value is HIGHER than specified value

// Update age of Chris to 35 only if its higher than 35
// Current age of Chris is 40
db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $min: {
            age: 35
        }
    }
)
// Age of Chris is 35 now

db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $min: {
            age: 38
        }
    }
)
// Did not update, becaue current age of Chris is 35
// Its NOT HIGHER than the specified value


// $max => update key only if current value of key is LOWER than specifeid one

db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $max: {
            age: 32
        }
    }
)
// Did not update, becaue current age of Chris is 35
// Its NOT LOWER than the specified value

db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $max: {
            age: 38
        }
    }
)
// Updates value of age of Chris to 38


// $mul => Multiply value of key with given value

// Increment age of Chris by 10%
// => Multiply age of Chris by 1.1

db.users.updateOne(
    {
        name: "Chris"
    },

    {
        $mul: {
            age: 1.1
        }
    }
)

// ``````````````````````````Delete a key(Unset)``````````````````

// $unset => drop the key specified in unset

// Drop phone numbers of all the users who are sporty
db.users.updateMany(
    {
        isSporty: true
    },

    {
        $unset: {
            phone: ""
        }
    }
)

// ````````````````````````Renaming a field````````````````````
// $rename => Rename a key to new one(Specified)

// Rename age field to totalAge
db.users.updateMany(
    {
        // No filter, becoz we want to rename age key of all documents
    },

    {
        $rename: {
            age: "totalAge"
        }
    }
)

// ```````````````````Upsert`````````````````````
// upsert : true

// Update Maria, set age = 29, hobbies, and isSporty to true

db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $set: {
            age: 29,
            isSporty: true,
            hobbies: [
                {
                    title: "Good Food",
                    frequency: 3
                }
            ]
        }
    }
)
// { "acknowledged" : true, "matchedCount" : 0, "modifiedCount" : 0 }
// Becoz Maria does not exists yet

// We want to Update If Exists or Insert (Upsert)

db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $set: {
            age: 29,
            isSporty: true,
            hobbies: [
                {
                    title: "Good Food",
                    frequency: 3
                }
            ]
        }
    },

    {
        upsert: true
    }
)
// Even the filter condiotion was added as field, even though we only specified some fields in set
// MongoDB correctly assumes that whatever filter is given, has to be also set

// ```````````````````````Updating Array``````````````````````````````

// UPDATING MATCHING ARRAY ELEMENT

// Update all documents where hobbies title is Sports and its frequency >= 3 and set highFrequency = true
db.users.updateMany(
    {
        hobbies: {
            $elemMatch: {
                title: "Sports",
                frequency: {
                    $gte: 3
                }
            }
        }
    },

    {
        $set:
        {
            "hobbies.$.highFrequency": true
        }
    }
)

// "hobbies.$" automatically selects the element of the array that matched your criteria
// Here highFrequency was not a field, so it simply got added ($set property)

// "hobbies.$" operator will return only the first element of the array that matches the criteria
// For this purpose use hobbies.$[].frequency

// Update all elements of array, decrement frequency by 1 where age > 30
db.users.updateMany(
    {
        totalAge: {
            $gt: 30
        }
    },

    {
        $inc: {
            "hobbies.$[].frequency": -1
        }
    }
)

// ARRAY FILTER

// Add a field goodFrequency = true for all users, whose hobby frequency is > 2.
// e.g hobbies : [
//     {
//         title : "Sports",
//         frequency : 3,
//         goodFrequency : true
//     },

//     {
//         title : "Cars",
//         frequency : 1,
//     },

//     {
//         title : "Sports",
//         frequency : 5,
//         goodFrequency : true
//     },
// ]
db.users.updateMany(
    {
        "hobbies.frequency": {
            $gt: 2
        }
    },

    {
        $set: {
            "hobbies.$[element].goodFrequency": true
        }
    },

    {
        arrayFilters: [
            {
                "element.frequency": {
                    $gt: 2
                }
            }
        ]
    }
)

// "hobbies.frequency" in filter will generate all documents, whose even one element has frequency > 2
// We dont want all elements to be set
// Therefore we create arrayFilters
// "hobbies.$[element]" works with arrayFIlters to determine thefilter specified for "element"
// We can multiple filters, each one will have uniwue name (e.g. element, index, etc)


// ````````````````Adding Elements to array```````````````````````````

// $push => push new element to array
// $addToSet => Does not allow duplicate element

// Add sports to hobbies of Maria
db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $push: {
            hobbies: {
                title: "Sports",
                frequency: 2
            },
        }
    }
)

// addToSet
db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $push: {
            hobbies: {
                title: "Sports",
                frequency: 2
            },
        }
    }
)
// Error
// Not Unique

// Add 2 more hobbies to maria
db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $push: {
            hobbies:
                [
                    {
                        title: "Sports",
                        frequency: 2
                    },

                    {
                        title: "Drinking",
                        frequency: 7
                    }
                ]

        }
    }
)

// This will add as array
// "hobbies" : [
//     {
//             "title" : "Good Food",
//             "frequency" : 3,
//             "goodFrequency" : true
//     },
//     {
//             "title" : "Sports",
//             "frequency" : 2
//     },
// [
//         {
//                 "title" : "Sports",
//                 "frequency" : 2
//         },
//         {
//                 "title" : "Drinking",
//                 "frequency" : 7
//         }
// ]
// ]

// Use following

db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $push: {
            hobbies: {
                $each:
                    [
                        {
                            title: "Hiking",
                            frequency: 2
                        },

                        {
                            title: "Drinking",
                            frequency: 7
                        }
                    ]
            }
        }
    }
)

// ````````````````````````Remove Elements frmo array``````````````````````````

// Pull Redundant array in the hobbies array
// $pull => Pull specific document
// $pop : 1(remove last elemnt)/-1(remove first element)
db.users.updateOne(
    {
        name: "Maria"
    },

    {
        $pull: {
            hobbies: {
                "title": "Sports",
                "frequency": 2
            }
        }
    }
)

db.users.updateOne(
    {
        name : "Maria"
    },

    {
        $pop : {
            hobbies : 1
        }
    }
)









// PRACTICE

// Create a collection called sports and upsert 2 or more documents in it with fields "title", "reuiresTeam"
// Update all documents where "requiresTeam" is true and add min no of players requires in team
// Update all documents which has "minPlayers" and increment it by 10

db.sports.updateMany(
    {
        title: "Football"
    },

    {
        $set: {
            requiresTeam: true
        }
    },

    {
        upsert: true
    }
)

db.sports.updateMany(
    {
        title: "Cricket"
    },

    {
        $set: {
            requiresTeam: true
        }
    },

    {
        upsert: true
    }
)

db.sports.updateMany(
    {
        title: "Tennis"
    },

    {
        $set: {
            requiresTeam: false
        }
    },

    {
        upsert: true
    }
)

db.sports.updateMany(
    {
        requiresTeam: true
    },

    {
        $set: {
            minPlayers: 11
        }
    }
)

db.sports.updateMany(
    {
        minPlayers: {
            $exists: true
        }
    },

    {
        $inc: {
            minPlayers: 10
        }
    }
)