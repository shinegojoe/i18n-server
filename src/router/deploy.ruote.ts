import express from 'express'
const fs = require('fs')
const { exec } = require("child_process")
const router = express.Router()

const run = (name: string) => {
    exec(`tar -xzvf ${name}`, (error: any, stdout: any, stderr: any) => {
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
 
  const b = Buffer.from(req.body.data, 'binary')
  fs.writeFile('dist.tar.gz', b, (err: Error)=> {
    if(err) {
      console.log(err)
    }
    console.log('ok')
    run('dist.tar.gz')
    run2()
  })
  
  res.send('ok')
})

router.post('/deployClient', (req, res, next)=> {
  const b = Buffer.from(req.body.data)
  // console.log(req.body.data)
  fs.writeFile('client.tar.gz', b, (err: Error)=> {
    if(err) {
      console.log(err)
    }
    console.log('ok')
    run('client.tar.gz')
  })
  
  res.send('ok')
})


export default router

///home/taka/project/i18n-server/client_dist

// taka@taka-X301A1:~/project/i18n-server$ sudo docker run -ti -p 5003:5003 --name xxx -v /home/taka/project/i18n-server/client_dist:/storage base-server:v2 /bin/bash