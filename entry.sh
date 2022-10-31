source .env
echo $VUE_APP_APP_NAME
echo $VUE_APP_FRONT_PORT
npm install -g serve
npm audit fix --force
npm run build
serve -s dist  -l tcp://$VUE_APP_APP_NAME:$VUE_APP_FRONT_PORT