# keras_react_template


Frontend configuration
```
cd keras_react_template/static
npm i
npm run watch
```

Backend configuration  
Change keras backend to theano ($HOME/.keras/keras.json) then;  

```
cd keras_react_template/server
python3 server.py
(ngrok http 5000)
```