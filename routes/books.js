/*importing express*/
const express = require("express");

/*importing the books data that is in data folder*/
const {books} = require("../data/books.json");
const {users} = require("../data/users.json");

const router = express.Router();

/*GET all books API info format:
    
    * route: /books
    * method: GET
    * description: Get the books
    * access: public
    * parameter: none
*/
router.get('/', (req,res)=>{
    res.status(200).json({
        success: true,
        data: books  
    })
})

/*GET books by their IDs API info format:
    * route: /books/:id
    * method: GET
    * description: Get the books by ID
    * access: public
    * parameter: ID
*/
router.get("/:id", (req,res)=>{
    const {id} = req.params;
    /*check if ID is present or not*/
    const book = books.find((each)=> each.id === id);
    if(!book)
        return res.status(404).json({
            success: false,
            message: "book not found for the given ID"
        })
    /*if book found*/
    return res.status(200).json({
        success: true,
        data: book
    })
})

/*GET books by their IDs API info format:
    GET THE ISSUED BOOKS
    * route: /books/issued
    * method: GET
    * description: GET ALL ISSUED BOOK
    * access: public
    * parameter: NONE
    * dependencies: 2 (books.json file and users.json file)
*/
router.get("/issued/by-user", (req,res)=>{
    /*we use filter to get the extented or a particular value we want*/
    /*check if the user has the field called as 'issuedbook'*/
    const usersWithIssuedBooks = users.filter((each)=> {
        if(each.issuedbook) 
            return each                                     /*if yes then return the book*/
    })
    const issuedbooks = [];                                 /*we built an array since there may be multiple issued books*/
    usersWithIssuedBooks.forEach((each)=>{
        /*checking if the book id matches with the one in data or not*/
        const book = books.find((book)=> book.id === each.issuedbook)

        /*we will sore the info in the array 'issuedbooks'*/
        books.issuedby = each.name;
        books.issueddate = each.issueddate;
        books.returndate = each.returndate;

        /*after getting this info we'll update the array*/
        issuedbooks.push(book);
    });
    /*check if there is any element resent in array, if not then it's a negative response*/
    if(issuedbooks.length === 0)
        return res.status(404).json({
        success: false,
        message: "no books issued"
    });
    return res.status(200).json({
        success: true,
        data: issuedbooks
    })
});

/*CREATE books by their IDs API info format:
    CREATE A NEW BOOK
    * route: /books
    * method:  POST
    * description: CREATE A NEW BOOK
    * access: public
    * parameter: NONE
    * data: pass the data-> AUTHOR, GENRE, PRICE, PUBLISHER, ID
    * dependencies: 2 (books.json file and users.json file)
*/
router.post("/", (req,res)=>{
    const {data} = req.body;

    /*first we check if the data is present*/
    if(!data)
    return res.status(404).json({
        success: false,
        message: "data not found"
    });
    /*first we'll check of the user with thatparticular ID already exists or not*/
    const book = books.find((each)=> each.id === data.id)
    if(book)
        return res.status(404).json({
            success: false,
            message: "user with given id already exists"
        });
    /*if data is found, but the user isn't found, add the data accordingly*/
    const allbooks = [...books, data];
    return  res.status(201).json({
        success: true,
        data: allbooks
    })
});

/*UPDATE books by their IDs API info format:
    UPDATE A BOOK
    * route: /books/:id
    * method:  PUT
    * description: UPDATE A BOOK BY ITS ID
    * access: public
    * parameter: ID
    * dependencies: 2 (books.json file and users.json file)
*/
router.put("/:id", (req,res)=>{
    const {id} = req.params;
    /*get the data and id*/
    const {data} = req.body;

    /*first we check if the book with the given id is present*/
    const book = books.find((each)=> each.id === id)
    if(!book)
        return res.status(404).json({
            success: false,
            message: "book with given ID not found"
        });
    /*if book with given ID is found, then append the data accordingly*/
        const updateData = books.map((each)=>{
            if(each.id === id)
            {
                return {...each, ...data}
            }
            return each
        });
        return res.status(200).json({
            success: true,
            message: "book with given id found",
            data: updateData
        });
});

/*exporting the router*/
module.exports = router;