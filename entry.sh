source .env
echo $VUE_APP_APP_NAME
npm install -g serve
npm audit fix --force
npm run build
serve -s dist  -l tcp://$VUE_APP_APP_NAME:8080