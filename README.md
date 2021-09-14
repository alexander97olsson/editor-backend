[![Build Status](https://app.travis-ci.com/alexander97olsson/editor-backend.svg?branch=master)](https://app.travis-ci.com/alexander97olsson/editor-backend)

# Jsramverk

Installation/documentation av mitt API.
Detta är en backend support för min editor.

GitHub för detta repo är publicerat på:

* https://github.com/alexander97olsson/editor-backend

Guide/struktur av routes:
Det finns möjlighet att hämta/addera/hämta.
Alternativ som finns är id (_id), title (title), text (maintext). Id skapas automatiskt och behöver inte ta hänsyn till. När man 
uppdaterar något behöver man dock specificera med hjälp av id (_id).

* Ladda ner MongoDB för Windows på länken

    Gå till <a href="https://www.mongodb.com/try/download/community">MongoDB Community Server</a> och välj ditt operativsystem i listan. Följ sedan installationsinstruktionerna.

* Skapa egen databas

```
    $ mongosh
    $ use databasensnamn
    $ db.crowd.insertOne( { title: "NewTitle", mainText: "<p>Hello world</p>" } )
```
Node till MongoDB

```
    npm install
    npm install mongodb --save
```
Sist kör dessa två för att skapa databasen med src/setup.js. Det skapar ett exempel objekt till min editor

```
    $ node src/setup.js
    $ mongo --eval "db.crowd.find().pretty()"
```

* För att koppla upp sig mot sin egna databas på monogdb behöver man skapa sig en config.jon fil. Config.password
och config.username kommer bytas ut mot värderna i config,json filen.

Strukturen för config.json ska se ut så här:

```
    {
    "username": "exampleName"
    "password": "******"
    }
```

```
let dsn = `mongodb+srv://${config.username}:${config.password}@cluster0.xs9r9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
```

* Starta programmet genom

```
    npm start
```

Testa min editor på:

* https://www.student.bth.se/~alos17/editor/

Alla data hittas genom /data

* https://ramverk-editor-alos17.azurewebsites.net/data

```
    https://ramverk-editor-alos17.azurewebsites.net/data
```


```
    Copyright (c) 2021 Alexander Olsson, alexander93olsson@hotmail.com
```