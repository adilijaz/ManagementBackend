const express = require("express");
const router = express.Router();
const {Fee} = require('../models/fee')

router.get("/",async(req,res)=>{
    const fee = await Fee
                .find()
                .populate('student','name email fee class phone -_id')
                .select(['-__v'])
    if(fee.length ===0){

        res.status(404).json({status:'false', Error:'No Students'})
    }else{
        res.status(200).json(fee);
    }
})

module.exports = router;