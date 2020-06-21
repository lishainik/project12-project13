# Учебный проект 12

Учебный проект по написанию API для сервиса Mesto

**Стек:** JS(ES5/ES6)/HTML/CSS/BEM/Webpack/Node.js/Express

**Что реализовано в данном проекте**

- создание сервера 
- обработка простых запросов

Сервер поднимается с помощью команды 

`npm run start`

сервер доступен на 3000 порту localhost

В данный момент API обрабатывает следующие запросы
- выдача баз карточек и пользователей  с помощью запросов `/users` и `/cards`
- выдача информации о конкретном пользователе через код пользователя. Например: `/users/5d208fb50fdbbf001ffdf72a`. В случае отсутствия пользователя с таким кодом в базе, возвращается ошибка.
- выдача 404 при обращении к несуществующему адресу
