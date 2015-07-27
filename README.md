# SpecTech
## Сборка проекта
Сборка проекта была отдельно протестирована на чистой виртуалке с Ubuntu. Ниже привожу полную последовательность действий.

###1. [Скачать Виртуальную машину с Ubuntu](https://virtualboximages.com/Ubuntu+14.04+LTS+i386+Desktop+VirtualBox+VDI+Virtual+Computer)
###2. Установить Git и Node.js
```
sudo apt-get update
sudo apt-get install git
sudo apt-get install nodejs
sudo apt-get install npm
```
Еще пришлось создать линк, чтобы Node.js вызывался командой `node`, а не `nodejs`
```
sudo ln -s /usr/bin/nodejs /usr/bin/node
```
###3. Установисть Gulp и Bower
(Bower пока не используется, но пусть будет)
```
sudo npm install -g gulp
sudo npm install -g bower
```
###4. Скачать СпецТех и установить все локальные зависимости
```
git clone https://github.com/dkrupenya/spectech.git
cd spectech
npm install
```
###5. Собрать проект
  * `gulp build` - проект будет собран в папку build, там его можно посмотреть и потестировать.
  * `gulp` - проект будет подготовлен для разработки, запущены watcher и browser-sync. Проект можно просматривать по адресу `http://localhost:9000/`.
