const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

router.get('/', (req,res)=>{
  const filePath = path.join(__dirname,'../','data', 'cards.json');
  fsPromises.readFile(filePath, {encoding:'utf-8'})
    .then((result)=>{
      res.send(result)
    })
    .catch((err)=>{
      console.log(err)
    })
})

module.exports = router;