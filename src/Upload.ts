//
// import {Simulate} from "react-dom/test-utils";
// import error = Simulate.error;
//
// const express = require("express");
// const  fileUpload = require("express-fileupload");
//
// const app = express;
//
// app.use(fileUpload({
//     createParentPath: true,
// }))
//
// app.post("/upload", req, res) => {
//     if(!req.files) {
//         return res.status(400).json({msg: "noFiles"})
//     }
// }
//
// const file = req.files.file;
//
// if(!file) return res.json({error: "incorect name"});
//
// file.mv(`${__dirname}/client/public.upload/${newFileName}`, err =>
//     {
//         if (err) {
//             console.error(err);
//             return res.status(500).send(err);
//         }
//         console.log('file was upl');
//         res.json({
//             fileName: file.name,
//             filePath: `/upload/${newFileName}`
//         })
//     }
// )
const initialState = {

}

export default (state = initialState) => {
    return state
}