// https://www.w3resource.com/mongodb-exercises/

// 1
db.restaurent.find().pretty()

// 2
db.restaurent.find(
    {

    },

    {
        name : 1,
        borough : 1,
        cuisine : 1
    }
).pretty()

// 3
db.restaurent.find(
    {

    },

    {
        _id : 0,
        name : 1,
        borough : 1,
        cuisine : 1
    }
).pretty()

// 4
db.restaurent.find(
    {

    },

    {
        _id : 0,
        restaurant_id : 1,
        name : 1,
        borough : 1,
        zip_code : 1
    }
).pretty()

// 5
db.restaurent.find(
    {
        
    }
)