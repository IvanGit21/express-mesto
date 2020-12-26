const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

router.get('/', (req,res)=>{
  const filePath = path.join(__dirname,'../','data', 'users.json');
  fsPromises.readFile(filePath, {encoding:'utf-8'})
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })
})

router.get('/:id', (req,res)=>{
  const { id } = req.params
  const filePath = path.join(__dirname,'../','data', 'users.json');
  fsPromises.readFile(filePath, {encoding:'utf-8'})
    .then((result)=>{
      const users = JSON.parse(result)
      const user = users.find((user)=>user._id === id);
      if(!user){
        res.status(404).send({ "message": "Нет пользователя с таким id" });
        return
      }
      res.send(user)
    })
    .catch((err)=>{
      console.log(err)
    })
})

module.exports = router;
