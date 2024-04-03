const express = require("express");
/*importing users to get the users info*/
const {users} = require("./data/users.json")

/*application name*/
const app = express();

/*initialise port*/
const PORT = 8081

/*application will be using data in JSON only*/
app.use(express.json());

/*simple API*/
app.get('/', (req,res)=>{
    res.status(200).json({
        message: "server is up"
    })
})

/*users API info format
    * route: /users
    * method: GET
    * description: get all users
    * access: public
    *parameters: none
*/

/*users API*/
app.get('/users',(req,res)=>{
    /*logic for application*/
    res.status(200).json({
        success: true,
        data: users
    })
})

/*GET users by their IDs API info format
    * route: /users/:id
    * method: GET
    * description: get single user by their id
    * access: public
    *parameter: id
*/

app.get('/users/:id',(req,res)=>{
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
app.get('*', (req,res)=>{
    res.status(200).json({
        message: "this route doesn't exists"
    })
})

/*GET users by their IDs API info format
    ADD A NEW USER
    * route: /users
    * method: POST
    * description: create a new user
    * access: public
*/

app.post('/users',(req,res)=>{
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

/*GET users by their IDs API info format:
    UPDATE THE USER DATA
    * route: /users/:id
    * method: PUT
    * description: update the user data by their id
    * access: public
    * parameter: id
*/
app.put('/users/:id',(req,res)=>{
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

app.delete('/users/:id',(req,res)=>{
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
    const index = users.index(user);
    users.splice(index, 1);
    /*deletion response*/
    return res.status(200).json({
        success: true,
        data: users
    })
})

/*server should listen us on port 8081*/
app.listen(PORT, ()=>{
    console.log(`server is up and running on port ${PORT}`);
})