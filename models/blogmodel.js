const mongoose = require("mongoose")
    
const schema = mongoose.Schema(
    {
      author: String,
      title: String,
      content: String,
    },
    { timestamps: true } 
    
  );
    
    module.exports = mongoose.model("Blog", schema)