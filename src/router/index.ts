import { Router } from 'express'
import project from './project.route'
import lang from './language.route'
import page from './page.route'
const fs = require('fs')
const { exec } = require("child_process")



const router = Router()

router.use('/', project)
// router.use('/', lang)
// router.use('/', page)
router.get('/ttt', (req, res, next)=> {
    console.log('get ttt')
    res.send('one qkqkqk rock')
})


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

router.post('/ttt', (req, res, next)=> {
  console.log(req.body)
  // const data = req.body
  // // const data = new Uint8Array(Buffer.from('Hello Node.js'));
  // fs.writeFile('qqq.tar', data.data, (err: Error) => {
  //   if (err) throw err;
  //   console.log('The file has been saved!');
  // });
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

