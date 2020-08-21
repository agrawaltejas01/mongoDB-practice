// https://www.w3resource.com/mongodb-exercises/

// 1
db.restaurant.find().pretty()

// 2
db.restaurant.find(
    {

    },

    {
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 3
db.restaurant.find(
    {

    },

    {
        _id: 0,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 4
db.restaurant.find(
    {

    },

    {
        _id: 0,
        restaurant_id: 1,
        name: 1,
        borough: 1,
        zip_code: 1
    }
).pretty()

// 5
db.restaurant.find(
    {
        borough: "Bronx"
    }
).pretty()

// 6
db.restaurant.find(
    {
        borough: "Bronx"
    }
).pretty().limit(5)

// 7
db.restaurant.find(
    {
        borough: "Bronx"
    }
).pretty().skip(5).limit(5)

// 8
db.restaurant.find(
    {
        "grades.score": {
            $gt: 90
        }
    }
).pretty()

// 9
db.restaurant.find(
    {
        $and: [
            {
                "grades.score": {
                    $gt: 80
                }
            },

            {
                "grades.score": {
                    $lt: 100
                }
            }
        ]

    }
).pretty()

// 10
db.restaurant.find(
    {
        "address.coord.0": {
            $lt: -95.754168
        }
    }
).pretty()

// 11
db.restaurant.find(
    {
        $and: [
            {
                cuisine: {
                    $ne: "American"
                }
            },

            {
                "grades.score": {
                    $gt: 70
                }
            },

            {
                "address.coord.1": {
                    $lt: -65.7545168
                }
            }
        ]
    }
).pretty()

// 12
db.restaurant.find(
    {
        $and: [
            {
                cuisine: {
                    $ne: "American"
                }
            },

            {
                "grades.score": {
                    $gt: 70
                }
            },

            {
                "address.coord.0": {
                    $lt: -65.7545168
                }
            }
        ]
    }
).pretty()

// 13
db.restaurant.find(
    {
        $and: [
            {
                cuisine: {
                    $ne: "American"
                }
            },

            {
                "grades.grade": "A"
            },

            {
                borough: {
                    $ne: "Brooklyn"
                }
            }
        ]
    }
).pretty().sort(
    {
        cuisine: 1
    }
)

// 14
db.restaurant.find(
    {
        name: {
            $regex: /^Wil/
        }
    },

    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 15
db.restaurant.find(
    {
        name: {
            $regex: /ces$/
        }
    },

    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 16
db.restaurant.find(
    {
        name: {
            $regex: /.*Reg.*/
        }
    },

    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 17
db.restaurant.find(
    {
        $and: [
            {
                borough: "Bronx"
            },

            {
                cuisine: {
                    $in: ['American', 'Chinese']
                }
            }
        ]
    }
).pretty()

// 18
db.restaurant.find(
    {
        borough: {
            $in: [
                'Staten Island',
                'Queens',
                'Bronxor Brooklyn'
            ]
        }
    },
    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 19
db.restaurant.find(
    {
        borough: {
            $nin: [
                'Staten Island',
                'Queens',
                'Bronxor Brooklyn'
            ]
        }
    },
    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 20
db.restaurant.find(
    {
        "grades.score": {
            $lte: 10
        }
    },
    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 21
db.restaurant.find(
    {
        $or: [
            {
                cuisine: {
                    $nin: ['American ', 'Chinees']
                }
            },

            {
                name: {
                    $regex: /^Wil/
                }
            }
        ]
    },
    {
        restaurant_id: 1,
        name: 1,
        borough: 1,
        cuisine: 1
    }
).pretty()

// 22
db.restaurant.find(
    {
        grades: {
            $elemMatch: {
                date: ISODate("2014-08-11T00:00:00Z"),
                grade: "A",
                score: 11
            }
        }
    },
    {
        _id: 0,
        restaurant_id: 1,
        name: 1,
        grades: 1
    }
).pretty()

// 23
db.restaurant.find(
    {
        "grades.1.date": ISODate("2014-08-11T00:00:00Z"),
        "grades.1.grade": "A",
        "grades.1.score": 9


    },
    {
        _id: 0,
        restaurant_id: 1,
        name: 1,
        grades: 1
    }
).pretty()

// 24
// Geo Location

// 25
db.restaurant.find().sort({ name : 1 }).pretty()

// 26
db.restaurant.find().sort({ name : -1 }).pretty()

// 27
db.restaurant.find().sort({ cuisine : 1, borough : -1 }).pretty()

// 28
var doesExists = db.restaurant.find(
    {
        "address.street" : {
            $exists : true
        }
    }
).pretty().count();
if(doesExists) print("true"); else print("false"); 

// 29
db.restaurant.find(
    {
        "address.coord" : {
            $type : "double"
        }
    }
).pretty()

// 30
db.restaurant.find(
    {
        "grades.score" : {
            $mod : [7, 0]
        }
    },

    {
        restaurant_id : 1,
        name : 1,
        grades : 1
    }
).pretty()

// 31
db.restaurant.find(
    {
        name : {
            $regex : /.*mon.*/
        }
    },

    {
        name : 1,
        borough : 1,
        "address.coord" : 1,
        cuisine : 1
    }
).pretty()

// 32
db.restaurant.find(
    {
        name : {
            $regex : /^Mad/
        }
    },

    {
        name : 1,
        borough : 1,
        "address.coord" : 1,
        cuisine : 1
    }
).pretty()