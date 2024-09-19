
const authenticate=(req,res,next)=>{
  req.user={

    'name':'rafi'
  }
  next()
}

module.exports=authenticate