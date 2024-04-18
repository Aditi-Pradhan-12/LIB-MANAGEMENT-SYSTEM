/*importing express*/
const express = require("express");

/*importing the user data that is in data folder*/
const {users} = require("../data/users.json");
const router = express.Router();

/*users API*/
/*users API info format
    * route: /users
    * method: GET
    * description: get all users
    * access: public
    *parameters: none
*/

/*users API*/
/*router.get('/users',(req,res)=>{
    /*logic for application
    res.status(200).json({
        success: true,
        data: users
    })
})*/

/*GET users by their IDs API info format
    * route: /users/:id
    * method: GET
    * description: get single user by their id
    * access: public
    *parameter: id
*/
router.get('/:id',(req,res)=>{
    /*logic for application*/
    const {id} = req.params;
    /*check if the id is present or not*/
    const user = users.find((each)=>each.id === id); 
    /*if that user != given id, then*/
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user not found"
        })
    }
    /*if user is found, then*/
     return res.status(200).json({
        success: true,
        data: user        
    })
})

/*API to handle the generalised URL*/
/*app.get('*', (req,res)=>{
    res.status(200).json({
        message: "this route doesn't exists"
    })
})*/

/*Create users by their IDs API info format
    ADD A NEW USER
    * route: /users
    * method: POST
    * description: create a new user
    * access: public
*/
router.post('/',(req,res)=>{
    const {id,name,surname,email,subscriptiontype,subscriptiondate} = req.body;
    /*check if the id is present or not*/
    const user = users.find((each)=>each.id === id);
    /*if that user!= given id, then*/
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user doesn't exists"
        })
    }
    /*since, user not found, push the required info*/
    users.push({
        id,name,surname,email,subscriptiontype,subscriptiondate
    })
    /*after pushing the above information*/
    return res.status(201).json({
        success: true,
        data: users  
    })
})

/*Update users by their IDs API info format:
    UPDATE THE USER DATA
    * route: /users/:id
    * method: PUT
    * description: update the user data by their id
    * access: public
    * parameter: id
*/
router.put('/:id',(req,res)=>{
    const {id} = req.params;
    const {data} = req.body;
    /*check if the id is present or not*/
    const user = users.find((each)=>each.id === id);
    /*if that user != id, then*/
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user doesn't exists"
        })
    }
    /*we use spread operator to append some info to json structure*/
    const updateduser = users.map((each)=>{
        if(each.id === id){
            return {...each,
            ...data }
        }
        return each;
    })
    /*if user is found, then*/
    return res.status(200).json({
        success: true,
        data: updateduser
    })
})

/*DELETE users by their IDs API info format:
    DELETE THE USER DATA
    * route: /users/:id
    * method: DELETE
    * description: delete the user data by their id
    * access: public
    * parameter: id
*/
router.delete('/:id',(req,res)=>{
    /*const [id,name,surname,email,subscriptiontype,subscriptiondate] = req.body;*/
    const {id} = req.params;
    /*const [data] = req.body;*/
    /*check if the id is present or not*/
    const user = users.find((each)=>each.id === id);
    /*if that user != id, then*/
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user doesn't exists"
        })
    }
    /*if user is found, then use the splice operator, for which we need to find the index of the user*/
    const index = users.indexOf(user);
    users.splice(index, 1);
    /*deletion response*/
    return res.status(200).json({
        success: true,
        data: users
    })
})

/*Get subscription details of the users by their IDs API info format:
    GETTING THE SUBSCRIPTION USER DETAILS
    * route: /users/subscription-details/:id
    * method: GET
    * description: get all subscription details
    * access: public
    * parameter: id
*/
router.get('/subscription-details/:id',(req,res)=>{
    const {id} = req.params;
    /*const [data] = req.body;*/
    /*check if the id is present or not*/
    const user = users.find((each)=>each.id === id);
    /*if that user != id, then*/
    if(!user){
        return res.status(404).json({
            success: false,
            message: "user doesn't exists"
        })
    }
    /*if user is found, then get their subscription details*/
    const getdateindays = (data = "")=>{
        let date;
        /*if no parameter found then print the current date*/
        if(data === ""){
            /*print current date*/
            date = new date();
        }
        else {
            /*getting the defined/demanded*/
            date = new date(data);
        }
        let days = Math.floor(date / (1000*60*60*24))
        /*this means => 1000=milliseconds, 60=seconds, 60=minutes, 24=hours*/
        return days
    };
    const subscriptiontype = (data) =>{
        if(user.subscriptiontype === "Basic"){
            data = date + 90;                   /*since the basic subscription is for 90 days*/
        }else if(user.subscriptiontype === "Standard"){
            data = date + 180;                  /*since the standard subscription is for 180 days*/
        }else if(user.subscriptiontype === "Premium"){
            data = date + 365;                  /*since the premium subscription is for 365 days*/
        }
        return data;
    };
    /*subscription calculation expiration logic*/
    /*calculation of fine*/
    let returnDate = getdateindays(user.returnDate);
    let currentdate = getdateindays();
    let subscriptiondate = getdateindays(user.subscriptiondate);
    let subscriptionexpiration = subscriptiontype(subscriptiondate);

    /*calling an object to get the required data*/
    const data = {
        ...user,
        subscriptionexpired: subscriptionexpiration < currentdate,
        /*if the 1st condition subscriptionexpiration <= currentdate holds true
        then it will RETURN 0, else, we will calculate the subscriptionexpiration - currentdate
        in order to get the number of days left fot expiration*/
        daysleftforexpiration: subscriptionexpiration <= currentdate ? 0: subscriptionexpiration - currentdate,
        /*if the subscriptionexpiration <= currentdate the get the penalty of INR200, 
        i.e. Rs100 fir retrun date and Rs100 for subscriptiondate,
        if subscription not expired then get the Rs100 in fine,
        if neither is satisfied, then get Rs0 fine*/
        fine: returnDate < currentdate ? subscriptionexpiration <= currentdate ? 200 :100 : 0
    }
    return res.status(200).json({
        success: true,
        data
    })
})
/*exporting the router*/
module.exports = router;