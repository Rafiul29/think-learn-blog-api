const notFound=(msg='Resource not found')=>{
  const error= new Error(msg)
  error.status=404
  return error
}

const badRequest=(msg='data not found')=>{
  const error= new Error(msg)
  error.status=400
  return error
}

const serverError=(msg='Internal Server Error')=>{
  const error= new Error(msg)
  error.status=500
  return error
}


module.exports={notFound,badRequest,serverError}