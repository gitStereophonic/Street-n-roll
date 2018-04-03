'use strict';

const path = require('path');
const http = require('http');
const shell = require('shelljs');
const crypto = require('crypto');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const webpack = require('webpack');
const devMiddleware = require('webpack-dev-middleware');
const hotMiddleware = require('webpack-hot-middleware');
const rekitStudioMiddleWare = require('rekit-studio/middleware');
const request = require('request');
const pkgJson = require('../package.json');
const getConfig = require('../webpack-config');
const fs = require('fs');
const Sequelize = require('sequelize');
const { ArgumentParser } = require('argparse');

const manifestPath = path.join(__dirname, '../.tmp/dev-vendors-manifest.json');

const aS = {
  id:         { type: Sequelize.INTEGER, primaryKey: true },
  city:       { type: Sequelize.STRING },
  age:        { type: Sequelize.STRING },
  gender:     { type: Sequelize.STRING },
  edu:        { type: Sequelize.STRING },
  eduOther:   { type: Sequelize.STRING },
  job:        { type: Sequelize.STRING },
  everPlayed: { type: Sequelize.BOOLEAN },
  thanks:     { type: Sequelize.TEXT },
  help:       { type: Sequelize.TEXT }
};

const aL = {
  id:         { type: Sequelize.INTEGER, primaryKey: true },
  interest:   { type: Sequelize.INTEGER },
  who:        { type: Sequelize.STRING },
  money:      { type: Sequelize.STRING },
  songs:      { type: Sequelize.TEXT },
  sign:       { type: Sequelize.TEXT },
  traditions: { type: Sequelize.TEXT },
  experience: { type: Sequelize.TEXT }
};

const aM = {
  id:             { type: Sequelize.INTEGER, primaryKey: true },
  hobbie:         { type: Sequelize.STRING },
  hobbieOther:    { type: Sequelize.STRING },
  rather:         { type: Sequelize.BOOLEAN },
  ratherExact:    { type: Sequelize.STRING },
  why:            { type: Sequelize.STRING },
  community:      { type: Sequelize.BOOLEAN },
  communityExact: { type: Sequelize.STRING },
  official:       { type: Sequelize.STRING },
  officialOther:  { type: Sequelize.STRING },
  wocom:          { type: Sequelize.STRING },
  howjoin:        { type: Sequelize.TEXT },
  cookies:        { type: Sequelize.TEXT },
  meetings:       { type: Sequelize.BOOLEAN },
  meetingsExact:  { type: Sequelize.STRING },
  reasons:        { type: Sequelize.TEXT },
  where:          { type: Sequelize.TEXT },
  whywhere:       { type: Sequelize.TEXT },
  meetingtime:    { type: Sequelize.STRING },
  place:          { type: Sequelize.TEXT },
  descplace:      { type: Sequelize.TEXT },
  time:           { type: Sequelize.TEXT },
  whatplay:       { type: Sequelize.TEXT },
  whythisplay:    { type: Sequelize.TEXT },
  placeplay:      { type: Sequelize.STRING },
  howcome:        { type: Sequelize.TEXT },
  howleave:       { type: Sequelize.TEXT },
  firstmoney:     { type: Sequelize.STRING },
  talk:           { type: Sequelize.TEXT },
  jargon:         { type: Sequelize.TEXT },
  specsigns:      { type: Sequelize.TEXT },
  idmarks:        { type: Sequelize.TEXT },
  forwhat:        { type: Sequelize.STRING },
  forwhatOther:   { type: Sequelize.STRING },
  celebrations:   { type: Sequelize.STRING },
  howceleb:       { type: Sequelize.TEXT },
  competition:    { type: Sequelize.STRING },
  relations:      { type: Sequelize.TEXT },
  whobest:        { type: Sequelize.TEXT },
  events:         { type: Sequelize.TEXT },
  reactions:      { type: Sequelize.TEXT },
  story:          { type: Sequelize.TEXT },
  identity:       { type: Sequelize.TEXT }
};

const aSettings = {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
}

function startBuildServer() {
  const app = express();
  const root = __dirname;
  app.use(express.static(root));
  app.use(fallback('index.html', { root }));

  app.use(express.static(__dirname));

  app.use(bodyParser.json());

  app.post('/send', (req, res) => {
    const dataBase = req.body.dataBase;
    const aStart = req.body.answersStart;
    const aTable = req.body.answersTable;

    console.log(dataBase);
    console.log(aStart);
    console.log(aTable);

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov@yandex.ru', 'RRica29081BhA5', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: path.join(__dirname, 'StreetnrollDB.db'),

      operatorsAliases: false
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection established');

        const answersStart = sequelize.define('answersStart', aS, aSettings);

        const answersListener = sequelize.define(dataBase, aL, aSettings);

        const answersMusician = sequelize.define(dataBase, aM, aSettings);

        answersStart.sync().then(function () {
          answersStart.findAll().then(function(rows) {
            answersStart.create({
              id:         rows.length,
              city:       aStart.city,
              age:        aStart.age,
              gender:     aStart.gender,
              edu:        aStart.edu,
              eduOther:   aStart.eduOther,
              job:        aStart.job,
              everPlayed: aStart.everPlayed,
              thanks:     aStart.thanks,
              help:       aStart.help
            }).then(function () {
              console.log('start writen');
              if (dataBase === 'answersListener') {
                answersListener.sync().then(function() {
                  answersListener.create({
                    id:         rows.length,
                    interest:   aTable.interest,
                    who:        aTable.who,
                    money:      aTable.money,
                    songs:      aTable.songs,
                    sign:       aTable.sign,
                    traditions: aTable.traditions,
                    experience: aTable.experience
                  }).then(function() {
                    res.sendStatus(200);
                  });
                });
              } else if (dataBase === 'answersMusician') {
                answersMusician.sync().then(function() {
                  answersMusician.create({
                    id:             rows.length,
                    hobbie:         aTable.hobbie,
                    hobbieOther:    aTable.hobbieOther,
                    rather:         aTable.rather,
                    ratherExact:    aTable.ratherExact,
                    why:            aTable.why,
                    community:      aTable.community,
                    communityExact: aTable.communityExact,
                    official:       aTable.official,
                    officialOther:  aTable.officialOther,
                    wocom:          aTable.wocom,
                    howjoin:        aTable.howjoin,
                    cookies:        aTable.cookies,
                    meetings:       aTable.meetings,
                    meetingsExact:  aTable.meetingsExact,
                    reasons:        aTable.reasons,
                    where:          aTable.where,
                    whywhere:       aTable.whywhere,
                    meetingtime:    aTable.meetingtime,
                    place:          aTable.place,
                    descplace:      aTable.descplace,
                    time:           aTable.time,
                    whatplay:       aTable.whatplay,
                    whythisplay:    aTable.whythisplay,
                    placeplay:      aTable.placeplay,
                    howcome:        aTable.howcome,
                    howleave:       aTable.howleave,
                    firstmoney:     aTable.firstmoney,
                    talk:           aTable.talk,
                    jargon:         aTable.jargon,
                    specsigns:      aTable.specsigns,
                    idmarks:        aTable.idmarks,
                    forwhat:        aTable.forwhat,
                    forwhatOther:   aTable.forwhatOther,
                    celebrations:   aTable.celebrations,
                    howceleb:       aTable.howceleb,
                    competition:    aTable.competition,
                    relations:      aTable.relations,
                    whobest:        aTable.whobest,
                    events:         aTable.events,
                    reactions:      aTable.reactions,
                    story:          aTable.story,
                    identity:       aTable.identity
                  }).then(function() {
                    res.sendStatus(200);
                  });
                });
              } else {
                res.sendStatus(400);
              }
            });
          });
        });
      })
      .catch(err => {
        console.error('Connection Error: ', err);
        res.sendStatus(502);
      });
  });

  // Other files should not happen, respond 404
  app.get('*', (req, res) => {
    console.log('Warning: unknown req: ', req.path);
    res.sendStatus(404);
  });

  app.listen(pkgJson.rekit.buildPort, (err) => {
    if (err) {
      console.error(err);
    }

    console.log(`Dist server at http://localhost:${pkgJson.rekit.buildPort}/`);
  });
}

startBuildServer();
