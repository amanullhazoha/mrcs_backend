const mongoose = require("mongoose"); 

const recallCategorySchema  = mongoose.Schema({
    cat_name:{
        type:String, 
        required : true, 
        trim : true, 
    }, 
    image: {
        type: String,
    },
    publicid:{
        type:String,
    },
    cat_status: {
        type:String, 
        required: true, 
        trim : true, 
        lowercase : true, 
    },
    create_date:{
        type:Date, 

    }
},{timestamps: true });

const RecallCategory =  mongoose.model("RecallCategory", recallCategorySchema); 

module.exports = RecallCategory; 
