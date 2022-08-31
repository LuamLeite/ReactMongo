## Tinder Mongo
Esse é um aplicativo em desenvolvimento em React, para fazer uma cópia do Tinder para fins de estudo.
Seguindo o seguinte tutorial: https://www.youtube.com/watch?v=Q70IMS-Qnjk&t=1330s
da Ania Kubów
## Mongo DB
Credentials: guest, tinder

## Usando react-router-dom
```javascript
import { BrowserRouter, Routes, Route} from 'react-router-dom';
```
instalaremos com ``npm i react-router-dom``.

No package.json queremos a versão 6.2.1
```javascript 
"react-router-dom": "^6.2.1". 
```
Usaremos a tag <BrowserRouter> ao redor das páginas que vamos usar da seguinte forma:
```javascript
const  App = () => {
return (
<BrowserRouter>
<Routes>
<Route  path="/"  element={<Home/>}/>
<Route  path="/dashboard"  element={<Dashboard/>}/>
<Route  path="/onboarding"  element={<OnBoarding/>}/>
</Routes>
</BrowserRouter>
);
}
``` 
Agora com isso, conseguimos acessar as páginas: 
localhost:3000 será home.
locahost:3000/dashboard para acessar o dashboard.
localhost3000/onboarding para acessar onboarding.
**Coloque diferente textos em cada página para saber em qual você está.**

## Importando fonte

Usaremos a seguinte fonte: [ReadexPro](https://fonts.google.com/specimen/Readex+Pro?vfquery=Readex)
Vá para styles, e escolha os estilos que quer usando o +.
Usaremos 200,300,400,500,700.
Clique no botão superior direito que tem 3 caixas e um + e selecione no modal que abrir ao lado, import.
Colamos o import no arquivo css e definimos o font family para todas as páginas no nosso caso, com uma fonte de backup.
```css
@import url('https://fonts.googleapis.com/css2?family=Readex+Pro:wght@200;300;400;500;700&display=swap');

html {
  margin: 0;
  padding: 0;
}

* {
  font-family: 'Readex Pro', 'Sans Serif';
}```
E voalá, parei aqui:https://youtu.be/Q70IMS-Qnjk?t=4526