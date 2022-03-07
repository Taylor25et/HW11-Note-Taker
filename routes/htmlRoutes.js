const router = require('express').Router();
const path = require('path')


//create html front end routes to display the appropriate html file. 
router.get('/notes', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

router.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports =  router;