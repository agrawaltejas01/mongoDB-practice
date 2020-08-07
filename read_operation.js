use movieData
//  Import data from tv-show.json file

// ----Find One Record----
// db.collectionName.findOne( {filter}, {Projection}, {Option} )

db.movies.findOne()
// Returns First document
db.movies.findOne(
    {
        name: "The Last Ship"
    }
)
// Returns the first document with name = "The Last Ship

// `````````````Read Many Document`````````````````
// db.collectionName.find( {filter}, {projection}, {option} ).pretty()
// prtty() makes it indented instead of plain text
db.movies.find(
    {
        runtime: 60
    }
).pretty()

// `````````````````````````````Operators`````````````````````````````````

// COMPARIOSION OPERATORS

// gt => greater than
db.movies.find({ runtime: { $gt: 40 } })

// lt => less than
db.movies.find({ runtime: { $lt: 40 } })

// gte => greater than or equal
db.movies.find({ runtime: { $gte: 40 } })

// lte => less than equal 
db.movies.find({ runtime: { $lte: 40 } })

// eq => equal
db.movies.find({ runtime: { $eq: 40 } })

// ne => not equal 
db.movies.find({ runtime: { $ne: 40 } })


// INCLUSION OPERATORS
// in => in the given list
db.movies.find(
    {
        runtime: {
            $in: [
                30,
                42
            ]
        }
    }
).pretty()
// Return me the documents whose runtime value belongs to one of the element in $in

// nin => not in the given list
db.movies.find(
    {
        runtime: {
            $nin: [
                30,
                42
            ]
        }
    }
).pretty()
// Return me the documents whose runtime value does not belongs to one of the element in $in

// LOGICAL OPERATORS

// or 
db.movies.find(
    {
        $or: [
            {
                "rating.average": {
                    $lt: 5
                }
            },

            {
                "rating.average": {
                    $gt: 9.3
                }
            }
        ]
    }
).pretty()

// nor
db.movies.find(
    {
        $nor: [
            {
                "rating.average": {
                    $lt: 5
                }
            },

            {
                "rating.average": {
                    $gt: 9.3
                }
            }
        ]
    }
).pretty()

// and
db.movies.find(
    {
        $and: [
            {
                "rating.average": {
                    $gt: 9
                }
            },

            {
                genres: "Drama"
            }
        ]
    }
).pretty()
// This is not same as following

// We can basically give multiple condition in the filter itself, and they will all have to match
db.movies.find(
    {
        "rating.average": {
            $gt: 9
        },

        genres: "Drama"
    }
).pretty()

// But above thing only works if the keys are different

db.movies.find(
    {
        $and: [
            {
                genre: "Drama"
            },

            {
                genre: "Horror"
            }
        ]
    }
).count()
// Gives 17

db.movies.find(
    {
        genre: "Drama",
        genre: "Horror"
    }
).count()
// Gives 23
// Reason : If a document does not have Drama in it, it will check if it has Horror, 
// if it does have Horror it will return true. Wont check is both are present
// When Keys are same, 2nd value replaces first if first is not found
// Result will have Horror and Drama, but may have Horror only.

// Combining different operatos
// Following is basically
// if((genres == "Drama") && (ratings.average < 5 || ratings.average > 9))
db.movies.find(
    {
        genres: "Drama",

        $or: [
            {
                "rating.average": {
                    $lt: 5
                }
            },

            {
                "rating.average": {
                    $gt: 9
                }
            }
        ]
    }
).pretty()

// not
db.movies.find(
    {
        runtime: {
            $not: {
                $eq: 60
            }
        }
    }
).pretty()

// ELEMENT OPERATORS
// exists => Check if the key exists in the document

use udemyMongo
// udemyMongo is created in insert operation file
db.persons.find(
    {
        hobbies: {
            $exists: false
        }
    }
)

db.persons.find(
    {

        $and: [
            {
                hobbies: {
                    $exists: true
                }
            },

            {
                hobbies: "Cars"
            }
        ]

    }
)


// `````````````````Embeded Document ```````````````````
// rating : {
//     average : 9.4
// }
// rating.average is how you access the nested document element

db.movies.find({
    "rating.average": {
        $gt: 7
    }
}
).pretty()

// a : {
//     a1 : 234
//     b : {
//         c : {
//             c1 : "kdnv"
//             d : 123
//         }
//     }
// }

// Here a1 = "a.a1", d = "a.b.c.d" c1 = "a.b.c.c1"
// We can go to any number of levels

// ```````````````````````````````` Accessing Array ````````````````````````````````
// In array equality means that the given element should be present in array
db.movies.find({ genres: "Drama" }).pretty()
// Gives result where generes CONTAINS Drama
// It need not be the only element in it

// If we want to match exact array, we pass element as array
db.movies.find(
    { genres: ["Drama"] }
).pretty()
// Here we passed an array as element to match. Therefore array comparision wil happen
// Here result is that, generes contain exactly Darama

// Array INSIDE a document element
db.movies.find(
    { "schedule.days": "Friday" }
).pretty()

// QUERYING FOR SPECIFIC ELEMENT IN ARRAY DOCUMENT

// Say we have a collection of following type
// {
//     hobbies : [
//         {
//             title : "Sports",
//             freq : 2
//         },

//         {
//             title : "Cars",
//             freq : 1
//         }
//     ]
// },

// {
//     hobbies : [
//         {
//             title : "Sports",
//             freq : 3
//         },

//         {
//             title : "Reading",
//             freq : 1
//         }
//     ]
// }

{
    //     hobbies : [
    //         {
    //             title : "Sports",
    //             freq : 2
    //         },
    
    //         {
    //             title : "Reading",
    //             freq : 1
    //         },

    //             {
    //                 title : "Cars",
    //                 freq : 3
    //          }
    //     ]
    // }
// We want to find all, where hobbie is "Sporst"

// This is basically document in array
db.persons.find(
    {
        "hobbies.title" : "Sports"
    }
)


// size => size of array

// Find all, where person has exactly 2 hobbies
db.persons.find(
    {
        hobies : {
            $size : 2
        }
    }
)

// elemMatch => match exact elemnt of array

// Find all, where hobby title is Sports and freq >= 3
db.persons.find(
    {
        hobbies : {
            $elemMatch : {
                title : "Sports",
                freq : {
                    $gte : 3
                }
            }
        }
    }
)

// all => All elements in the give array element should exists in the key
// Order does not matter

// In boxOffice, Find all, where genre is action or thriller

db.boxOffice.find(
    {
        genre : [
            "action",
            "thriller"
        ]
    }
)
// This only looks where action is before thriller
// But we dont want order to matter, both the elements should be there

db.boxOffice.find(
    {
        genre : {
            $all : [
                "action",
                "thriller"
            ]
        }
    }
).pretty()




`````````````````Projection`````````````````

db.movies.find(
    {},
    {
        name : 1,
        genres : 1,
        runtime : 1,
        "schedule.time" : 1
    }
).pretty()
// We specify the keys we want to show, no need to add the keys we dont want to show
// Exception is _id, it is always shown
// If not wanted, make it explicitely 0

db.movies.find(
    {},
    {
        _id : 0,
        name : 1,
        genres : 1,
        runtime : 1,
        "schedule.time" : 1
    }
).pretty()












// ``````````````Practice``````````````
db.boxOffice.find(
    {
        $and: [
            {
                "meta.runtime": {
                    $gt: 9.2
                }
            },
            {
                "meta.runtime": {
                    $lt: 100
                },
            }
        ]
    }
)

db.boxOffice.find(
    {
        $or: [
            {
                "genre": "drama" 
            },
            {
                "meta.runtime": "action",
            }
        ]
    }
)