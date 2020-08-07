// Use persons.js

// Aggregation is a pipeline
// Multiplt queries can be run using aggregation, to get the data in the desired format

// `````````````````Match```````````````````````

// $match is nothing but filter
db.persons.aggregate(
    [
        {
            $match: {
                gender: "female"
            }
        }
    ]
).pretty()

// ```````````````Group```````````````
// $group matches the key and combines them

// Check number of females in each state
db.persons.aggregate(
    [

        {
            $match: {
                gender: "female"
            },
        },

        {
            $group: {
                _id: {
                    state: "$location.state"
                },

                totalPersons: {
                    $sum: 1
                }
            }
        }

    ]
).pretty()

// db.collectionName.aggreagate([
//     {
//         $group: {
//             _id: {
//                 key_which_is_used_for_grouping
//             },

//             result_Name : {
//                 Other_operator ($sum, $avg, $max...)
//                 $sum : value_to_add_for_each_document_that_is_aggregated
//             }

//         }
//     }
// ])


// ````````````````````````SORT```````````````````````````````
db.persons.aggregate(
    [
        {
            $match: {
                gender: "female"
            }
        },

        {
            $group: {
                _id: {
                    state: "$location.state"
                },
                totalPersons: {
                    $sum: 1
                }
            }
        },

        {
            $sort: {
                totalPersons: -1
            }
        }
    ]
)

// PRACTICE
// Find persons older than 50, group by gender, find how many persons we have per gender and their avg age. 
// Order it by total persons per gender

db.persons.aggregate(
    [
        {
            $match: {
                "dob.age": {
                    $gt: 50
                }

            }
        },
        {
            $group: {
                _id: {
                    gender: "$gender"
                },
                totalPersons: {
                    $sum: 1
                },
                avgAge: {
                    $avg: "$dob.age"
                }
            }
        },
        {
            $sort:
                { totalPersons: -1 }
        }
    ]
)



// ``````````````````PROJECT`````````````````````````

// Find gender and fullname of person
db.persons.aggregate(
    [
        {
            $project: {
                _id: 0,
                gender: 1,
                fullName: {
                    $concat: [
                        "$name.first",
                        " ",
                        "$name.last"
                    ]
                }
            }
        }
    ]
)

// toUpper
// First letter of name should be capital

// substrCP => sub string of a string
// $substrCP : { string_name, starting_index, length_of_needed_substring }

// strLenCP => length of a string
// $strLenCP : stringNa,e

db.persons.aggregate(
    [
        {
            $project: {
                _id: 0,
                gender: 1,
                fullName: {
                    $concat: [
                        { $toUpper: { $substrCP: ["$name.first", 0, 1] } },
                        { $substrCP: ["$name.first", 1, { $subtract: [{ $strLenCP: "$name.first" }, 1] }] },
                        " ",
                        { $toUpper: { $substrCP: ["$name.last", 0, 1] } },
                        { $substrCP: ["$name.last", 1, { $subtract: [{ $strLenCP: "$name.last" }, 1] }] },
                    ]
                }
            }
        }
    ]
)


// PROJECTION AND ARRAYS

$slice => slice array from start
// slice : ["ArrayName", length_from_start]  (We can also use negative indexing here)


// Return first 2 examScores 
db.friends.aggregate(
    [
        {
            $project: {
                _id: 0,
                examScore: {
                    $slice: [
                        "$examScores", 2
                    ]
                }
            }
        }
    ]
).pretty()

// $size => Size of array

// Find number of exams a person took
db.friends.aggregate(
    [
        {
            $project: {
                _id: 0,
                name: 1,
                numOfExams: {
                    $size: "$examScores"
                }
            }
        }
    ]
).pretty()


// ```````````````````````Convert````````````````````````````
// convert => Convert a data type into another CONVERTABLE type
// $convert : {
//     input : input_field,
//     to : type_to_which_converted_to,
//     onError : default_value_if_there_is_error
//     onNull : default_value_if_there_is_null
// }

db.persons.aggregate(
    [
        {
            $project: {
                _id: 0,
                name: 1,
                birthDate: {
                    $convert: {
                        input: "$dob.date",
                        to: "date"
                    }
                },
                age: "$dob.age"
            }
        }
    ]
)


// ``````````````````````````Aggregation and array`````````````````````````
// Use friends.js data

// PUSHING ELEMENTS INTO NEWLY CREATED ARRAY

db.friends.aggregate(
    [
        {
            $group: {
                _id: {
                    age: "$age"
                },

                allHobbies: {
                    $push: "$hobbies"
                }
            }
        }
    ]
).pretty()


// ``````````````````````````UnWind````````````````````````````````

// $unwind => Opens up a array

db.friends.aggregate(
    [
        {
            $unwind: "$hobbies"
        },

        {
            $group: {
                _id: {
                    age: "$age"
                },

                allHobbies: {
                    $push: "$hobbies"
                }
            }
        }
    ]
).pretty()
// Now hobbies are added as single elements, and not as arrays
// Does not take care of dupliacation though

// ````````````Eliminate Duplicate Values``````````````````````
// Use addToSet instead of push

db.friends.aggregate(
    [
        {
            $unwind: "$hobbies"
        },

        {
            $group: {
                _id: {
                    age: "$age"
                },

                newHobbies: {
                    $addToSet: "$hobbies"
                }
            }
        }
    ]
).pretty()

// ```````````````````````Filter Array```````````````````````
db.friends.aggregate(
    [
        {
            $project: {
                _id: 0,
                Examsscores: {
                    $filter: {
                        input: "$examScores",
                        as: "scores",
                        cond: {
                            $gt: ["$$scores.score", 60]
                        }
                    }
                }
            }
        }
    ]
).pretty()

db.persons.find(
    {

    },

    {
        "dob.date": 1,
        name: 1
    }
).sort(
    {
        "dob.date": 1
    }
).limit(10).pretty();