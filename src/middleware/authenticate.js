
const authenticate=(req,res,next)=>{
  req.user={
    id:'66ebb0a3caa9c968306ecdf1',
    name:'Clayton Bailey',
    role:'role'
  }
  next()
}

module.exports=authenticate