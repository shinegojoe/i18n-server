import express from 'express'
const fs = require('fs')
const { exec } = require("child_process")
const router = express.Router()

const run = () => {
    exec("tar xvf dist.tar", (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        // if (stderr) {
        //     console.log(`stderr: ${stderr}`);
        //     return;
        // }
        console.log(`run: ${stdout}`);
     });
}

const run2 = () => {
    exec("npm run restart", (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        // if (stderr) {
        //     console.log(`stderr: ${stderr}`);
        //     return;
        // }
        console.log(`run2: ${stdout}`);
     });
}

router.post('/deploy', (req, res, next)=> {
  // console.log(req.body)
 
  const b = Buffer.from(req.body.data)
  fs.writeFile('dist.tar', b, (err: Error)=> {
    if(err) {
      console.log(err)
    }
    console.log('ok')
    run()
    run2()
  })
  
  res.send('ok')
})


export default router