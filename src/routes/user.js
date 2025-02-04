import express from 'express'
import { userAuth } from '../middlewares/auth.js'
import { connectionRequestModel } from '../models/connectionRequest.js'

export const userRouter = express.Router()

userRouter.get('/user/requests/received',userAuth, async(req,res)=>{
    try{
        const loggedInuser = req.user 
        const connectionRequest = await connectionRequestModel.find({
            toUserId:loggedInuser._id,
            status:'interested'
        })
        res.json({message:'Data fetched successfully', connectionRequest})

    }catch(err){
        res.status(400).send("ERROR:"+err.message)
    }
})