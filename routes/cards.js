const router = require('express').Router();
const path = require('path');
const fsPromises = require('fs').promises;

router.get('/', (req,res)=>{
  const filePath = path.join(__dirname,'../','data', 'cards.json');
  fsPromises.readFile(filePath, {encoding:'utf-8'})
    .then((result)=>{
      const cards = JSON.parse(result);
      res.send(cards)
    })
    .catch((err)=>{
      res.status(500).send({ "message": "Server Error" })
    })
})

module.exports = router;