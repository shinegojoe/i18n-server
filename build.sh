rm tsconfig.tsbuildinfo
rm -r dist
rm dist.tar.gz
npm run build
tar -zcvf dist.tar.gz dist
node deploy.js