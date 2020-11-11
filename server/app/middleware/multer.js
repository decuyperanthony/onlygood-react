//! ------ CONFIG MULTER A REMETTRE DANS SON DOSSIER -------
const multer = require('multer');

// == config multer
const storage = multer.diskStorage({
    //* on indique l'endroit ou on stock la photo
    destination : (requete, file, cb)=> {
        console.log('cb', cb)
        // cb(null, "./public/img/")
        // cb(null, '../../public/img/')
        // cb(null, path.join(__dirname, '../../public/img/'))
        // cb(null, "../static/cimages/")
        cb(null, './public/img')
    },
    //* puis le nom du fichier
    filename : (requete, file, cb)=> {
        // console.log('data', date)
        // cb(null, "fnel"+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname)
        cb(null, Math.round(Math.random() * 10000)+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname.replace(/\s/g, '-'))
        // cb(null, date+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname)
        // cb(null, date+"-"+Math.round(Math.random() * 10000)+"-"+file.originalname.replace(/\s/g, '-'))
    }
  });

  const fileFilter = (requete, file, cb) =>{
    if(file.mimetype === "image/jpeg" || file.mimetype === "image/png"){
        cb(null, true)
    } else {
        cb(new Error("l'image n'est pas acceptée"),false)
    }
}

const upload = multer({
    storage : storage,
    limits : {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter : fileFilter
});

module.exports = upload;