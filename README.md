# Planner Web App

Planner Web App

![gif](https://github.com/breno-alves/Planner/blob/master/docs/images/planner_gif.gif?raw=true)


## Figma

Designed by [@Rickyalbuq](https://github.com/rickyalbuq)

- [Figma Link](https://www.figma.com/proto/9dCD7smIReEJIfpafihqnI/Planner?node-id=71%3A2&scaling=contain&page-id=0%3A1&hide-ui=1)

---

## Version

    Node.js v14.15.1

## Install dependecies

    yarn

## Run Api in development

    yarn start

---

## Env

Example of envirioment values

```
REACT_APP_API=http://localhost:3333
```

---

## Docker

Docker-compose file contains three containers:

- Web App container
- Nginx proxy

### Runnning docker-compose

    docker-compose up -d
