'use strict';

// Summary:
//  This script is used to start dev server, build result server and Rekit Studio.
//  Feel free to edit it to meet your specific requirement since this file has been copied to your project.

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
const nodemailer = require('nodemailer');
const { ArgumentParser } = require('argparse');

const parser = new ArgumentParser({
  addHelp: true,
  description: 'Start an express server for webpack dev or build result.',
});

parser.addArgument(['-m', '--mode'], {
  help: 'Server mode, dev or build.',
  metavar: 'mode',
  choices: ['dev', 'build', 'studio'],
});

parser.addArgument(['--readonly'], {
  help: 'Whether build server server is readonly',
  action: 'storeTrue',
});

const args = parser.parseArgs();

const srcPath = path.join(__dirname, '../src');
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
  howlong:        { type: Sequelize.STRING },
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
  mascot:         { type: Sequelize.STRING },
  mascotdesc:     { type: Sequelize.TEXT },
  jargon:         { type: Sequelize.TEXT },
  specsigns:      { type: Sequelize.TEXT },
  idmarks:        { type: Sequelize.TEXT },
  forwhat:        { type: Sequelize.STRING },
  forwhatOther:   { type: Sequelize.STRING },
  celebrations:   { type: Sequelize.STRING },
  whatceleb:      { type: Sequelize.TEXT },
  relations:      { type: Sequelize.TEXT },
  whobest:        { type: Sequelize.TEXT },
  events:         { type: Sequelize.TEXT },
  reactions:      { type: Sequelize.TEXT },
  story:          { type: Sequelize.TEXT },
  identity:       { type: Sequelize.TEXT },
  names:          { type: Sequelize.STRING },
  nameslist:      { type: Sequelize.STRING },
  problems:       { type: Sequelize.BOOLEAN },
  problemsExact:  { type: Sequelize.STRING },
  problemsOther:  { type: Sequelize.STRING },
  problemdesc:    { type: Sequelize.TEXT },
  solution:       { type: Sequelize.TEXT }
};

const aSettings = {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
}

const smtpConfig = {
  service: 'gmail',
  secure: true,
  auth: {
    user: 'richardelfsheep@gmail.com',
    pass: 'shr572FktyZrt'
  }
};

const transporter = nodemailer.createTransport(smtpConfig);


// Start an express server for development using webpack dev-middleware and hot-middleware
function startDevServer() {
  const app = express();
  const devConfig = getConfig('dev');

  devConfig.plugins.push(new webpack.DllReferencePlugin({
    context: srcPath,
    manifest: require(manifestPath),
  }));

  const compiler = webpack(devConfig);
  app.use(devMiddleware(compiler, {
    publicPath: devConfig.output.publicPath,
    historyApiFallback: true,
  }));

  app.use(hotMiddleware(compiler));

  // First, find files from src folder
  app.use(express.static(path.join(__dirname, '../src')));

  // Also support files from root folder, mainly for the dev-vendor bundle
  app.use(express.static(path.join(__dirname, '../')));

  app.use(bodyParser.json());

  // Proxy all calls /api when DEV to
  const { rekit: { proxy: API } } = pkgJson;
  if (API) {
    app.get('/api/*', (req, res) => req.pipe(request.get(`${API}${req.originalUrl}`)).pipe(res));
    app.post('/api/*', (req, res) => req.pipe(request.post(`${API}${req.originalUrl}`)).pipe(res));
  }

  app.get('/getpages', (req, res) => {
    // do smth
    res.send(JSON.stringify(23));
  });

  app.get('/getstatbypages/:page', (req, res) => {
    const pageNumber = req.params.page;

    const data = {
      questions: []
    };

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov', 'RRica29081BhA5', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: path.join(__dirname, '../src/StreetnrollDB.db'),

      operatorsAliases: false
    });

    const baseData = [
      [
        { question: 'Ваш город', fieldName: 'city', dataType: 'pie' },
        { question: 'Ваш возраст', fieldName: 'age', dataType: 'pie' },
        { question: 'Ваш пол', fieldName: 'gender', dataType: 'pie' },
        { question: 'Ваше образование', fieldName: 'edu', dataType: 'pie', textExtra: 'Другое: ', fieldExtraName: 'eduOther', dataExtraType: 'list' },
        { question: 'Ваш род занятий', fieldName: 'job', dataType: 'list' },
        { question: 'Играли ли Вы на улице', fieldName: 'everPlayed', dataType: 'pie' }
      ],
      [
        { question: '', fieldName: '', dataType: ''}
      ]
    ];

    const countingAllTheAssholes = (array = []) => {
      const names = [];
      const count = [];
      for (let item of array) {
        let isHere = false;
        for (let i = 0; i < names.length; i += 1) {
          if (item === names[i]) {
            count[i] += 1;
            isHere = true;
            break;
          }
        }
        if (!isHere) {
          names.push(item);
          count.push(1);
        }
      }

      return {
        values: count,
        labels: names
      };
    };

    const getArrayByField = (items = [], field = '') => {
      const ret = [];
      switch (field) {
        case 'city':
          for (let item of items) {
            ret.push(item.dataValues.city);
          }
          break;
        case 'age':
          for (let item of items) {
            ret.push(item.dataValues.age);
          }
          break;
        case 'gender':
          for (let item of items) {
            ret.push(item.dataValues.gender);
          }
          break;
        case 'edu':
          for (let item of items) {
            ret.push(item.dataValues.edu);
          }
          break;
        case 'eduOther':
          for (let item of items) {
            ret.push(item.dataValues.eduOther);
          }
          break;
        case 'job':
          for (let item of items) {
            ret.push(item.dataValues.job);
          }
          break;
        case 'everPlayed':
          for (let item of items) {
            ret.push(item.dataValues.everPlayed);
          }
          break;
        default:
          break;
      }

      return ret;
    };

    const getPageQuestionsData = () => {
      const pageRes = [];

      for (let q of baseData[pageNumber - 1]) {
        const dt = {
          qText: q.question,
          qDataType: q.dataType,
          qData: null,
          qExtraText: null,
          qExtraType: null,
          qExtraData: null
        };
        const arr = getArrayByField(items, q.fieldName);
        switch (q.dataType) {
          case 'pie':
            dt.qData = countingAllTheAssholes(arr);
            break;
          case 'list':
            dt.qData = { list: arr };
            break;
          default:
            break;
        }
        if (q.fieldExtraName) {
          const extraArr = getArrayByField(items, q.fieldExtraName);
          let cnt = 0;
          for (let eE of extraArr) {
            console.log('eE');
            if (eE !== '' && eE != null) {
              extraArr[cnt] = eE;
              cnt += 1;
            }
          }
          extraArr.length = cnt;
          dt.qExtraText = q.textExtra;
          dt.qExtraType = q.dataExtraType;
          dt.qExtraData = { list: extraArr };
        }
        pageRes.push(dt);
      }
      return pageRes;
    }

    sequelize.authenticate().then(() => {
      console.log('Get connection at "getstatbypages" to DB established');

      const answersStart = sequelize.define('answersStart', aS, aSettings); 

      /**
       * Format:
       * {
       *    qText: "Question text",
       *    qDataType: pie/list/bar,
       *    qData: { chart format } 
       * }
       */
      if (pageNumber === 1) {
        answersStart.sync().then(() => {
          answersStart.findAll().then(items => {
            data.questions = getPageQuestionsData();
            console.log('Questions:');
            console.log(data.questions);

            res.send(JSON.stringify(data));
          });
        });
      } else if (pageNumber > 1 && pageNumber < 8) {
        answersListener.sync().then(() => {
          answersListener.findAll().then(items => {
            data.questions = getPageQuestionsData();

            res.send(JSON.stringify(data));
          });
        });
      } else if (pageNumber >= 8 && pageNumber < 24) {

      } else {
        console.log('Page number is over limit');
        res.sendStatus(418);
      }
    });
  });

  app.get('/getstatbyquestion/:id/:field/:type/:extra', (req, res) => {
    const id = req.params.id;
    const field = req.params.field;
    const type = req.params.type;
    const extra = req.params.extra;

    const data = {};

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov', 'RRica29081BhA5', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: path.join(__dirname, '../src/StreetnrollDB.db'),

      operatorsAliases: false
    });

    sequelize.authenticate().then(() => {
      console.log('Get connection at "getstatbyquestion" to DB established');

      if (id < 0) {
        console.log('id < 0');
      } else if (id < 7) {
        const answersStart = sequelize.define('answersStart', aS, aSettings);

        answersStart.sync().then(() => {
          answersStart.findAll().then(items => {
            if (id == 0) {
              answersStart.sync().then(() => {
                answersStart.count().then(c => {
                  data.singleValue = c;
                  res.send(JSON.stringify(data));
                });
              });
            } else if (id == 1) {
              const cityNames = [];
              const cityCounts = [];
              for (let item of items) {
                const c = item.dataValues.city.toUpperCase();
                let check = false;
                for (let j = 0; j < cityNames.length; j += 1) {
                  if (cityNames[j] == c) {
                    check = true;
                    cityCounts[j] += 1;
                    break;
                  }
                }
                if (!check) {
                  cityNames.push(c);
                  cityCounts.push(1);
                }
              }
              data.chartPie = {
                values: cityCounts,
                labels: cityNames
              };
              res.send(JSON.stringify(data));
            } else {
              switch (type) {
                case 'pie':
                  const names = [];
                  const counts = [];
                  const extras = [];
                  for (let item of items) {
                    let c = '';
                    switch (field) {
                      case 'age':
                        c = item.dataValues.age;
                        break;
                      case 'edu':
                        c = item.dataValues.edu;
                        break;
                      case 'gender':
                        c = item.dataValues.gender;
                        break;
                      case 'everPlayed':
                        c = item.dataValues.everPlayed ? 'Да' : 'Нет';
                        break;
                      default:
                        break;
                    }
                    let check = false;
                    for (let j = 0; j < names.length; j += 1) {
                      if (names[j] == c) {
                        check = true;
                        counts[j] += 1;
                        break;
                      }
                    }
                    if (!check) {
                      names.push(c);
                      counts.push(1);
                    }
                    if (extra === 'eduOther') {
                      const oth = item.dataValues.eduOther;
                      if (oth != '') extras.push(oth);
                    }
                  }
                  data.chartPie = {
                    values: counts,
                    labels: names
                  };
                  if (extra) {
                    data.otherList = extras;
                  }
                  res.send(JSON.stringify(data));
                  break;
                case 'list':
                  const list = [];
                  for (let item of items) {
                    if (field === 'job') {
                      list.push(item.job);
                    }
                  }
                  data.chartList = {
                    list: list
                  }
                  res.send(JSON.stringify(data));
                  break;
                default:
                  break;
              }
            }
          });
        });
      } else if (id < 14 ) {
        const answersListener = sequelize.define('answersListener', aL, aSettings);

        answersListener.sync().then(() => {
          answersListener.findAll().then((items) => {
            switch (type) {
              case 'radar':
                const names = [];
                const counts = [];
                let label = '';
                for (let item of items) {
                  let c = 0;
                  if (field === 'interest') {
                    label = 'От 0 до 6';
                    c = item.dataValues.interest;
                    if (names.length < 7) {
                      for (let k = names.length; k < 7; k += 1) {
                        names.push(`${k}`);
                        counts.push(0);
                      }
                    }
                    if (c < 7) {
                      counts[c] += 1;
                    }
                  }
                }
                data.chartRadar = {
                  values: counts,
                  labels: names,
                  label: label
                };
                res.send(JSON.stringify(data));
                return;
              case 'list':
                const list = [];
                switch (field) {
                  case 'who':
                    for (let item of items) {
                      const v = item.dataValues.who;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'money':
                    let yes = 0;
                    let no = 0;
                    for (let item of items) {
                      const str = item.dataValues.money;
                      if (str !== '') {
                        list.push(str);
                        const s = ` ${str.toLowerCase()} `.replace(/,.!?/g, ' ');
                        if (s.includes(' да ')) {
                          yes += 1;
                        } else if (s.includes(' нет ')) {
                          no += 1;
                        }
                      }
                    }
                    data.extraBar = {
                      labels: ['Да', 'Нет'],
                      values: [yes, no]
                    }
                    break;
                  case 'songs':
                    for (let item of items) {
                      const v = item.dataValues.songs;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'sign':
                    for (let item of items) {
                      const v = item.dataValues.sign;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'traditions':
                    for (let item of items) {
                      const v = item.dataValues.traditions;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'experience':
                    for (let item of items) {
                      const v = item.dataValues.experience;
                      if (v !== '') list.push(v);
                    }
                    break;
                  default:
                    break;
                }
                data.chartList = {
                  list: list
                };
                res.send(JSON.stringify(data));
                return;
              default:
                break;
            }
          });
        });
      } else {
        const answersMusician = sequelize.define('answersMusician', aM, aSettings);

        answersMusician.sync().then(() => {
          answersMusician.findAll().then((items) => {
            switch (type) {
              case 'pie':
                const names = [];
                const counts = [];
                const extras = [];
                for (let item of items) {
                  let c = '';
                  switch (field) {
                    case 'hobbie':
                      c = item.dataValues.hobbie;
                      break;
                    case 'howlong':
                      c = item.dataValues.howlong;
                      break;
                    case 'rather':
                      c = item.dataValues.ratherExact;
                      break;
                    case 'community':
                      c = item.dataValues.communityExact;
                      break;
                    case 'official':
                      c = item.dataValues.official;
                      break;
                    case 'meetings':
                      c = item.dataValues.meetingsExact;
                      break;
                    case 'mascot':
                      c = item.dataValues.mascot;
                      break;
                    case 'names':
                      c = item.dataValues.names;
                      break;
                    case 'celebrations':
                      c = item.dataValues.celebrations;
                      break;
                    default:
                      break;
                  }

                  let check = false;
                  for (let j = 0; j < names.length; j += 1) {
                    if (names[j] == c) {
                      check = true;
                      counts[j] += 1;
                      break;
                    }
                  }
                  if (!check && c !== '') {
                    names.push(c);
                    counts.push(1);
                  }

                  let oth = '';
                  switch (extra) {
                    case 'hobbieOther':
                      oth = item.dataValues.hobbieOther;
                      break;
                    case 'officialOther':
                      oth = item.dataValues.officialOther;
                      break;
                    default:
                      break;
                  }
                  if (oth !== '') extras.push(oth);
                }

                data.chartPie = {
                  values: counts,
                  labels: names
                };
                if (extra) {
                  data.otherList = extras;
                }
                res.send(JSON.stringify(data));
                break;
              case 'list':
                const list = [];
                for (let item of items) {
                  let c = '';
                  switch (field) {
                    case 'why':
                      c = item.dataValues.why;
                      break;
                    case 'wocom':
                      c = item.dataValues.wocom;
                      break;
                    case 'howjoin':
                      c = item.dataValues.howjoin;
                      break;
                    case 'cookies':
                      c = item.dataValues.cookies;
                      break;
                    case 'reasons':
                      c = item.dataValues.reasons;
                      break;
                    case 'where':
                      c = item.dataValues.where;
                      break;
                    case 'whywhere':
                      c = item.dataValues.whywhere;
                      break;
                    case 'place':
                      c = item.dataValues.place;
                      break;
                    case 'descplace':
                      c = item.dataValues.descplace;
                      break;
                    case 'time':
                      c = item.dataValues.time;
                      break;
                    case 'whatplay':
                      c = item.dataValues.whatplay;
                      break;
                    case 'whythisplay':
                      c = item.dataValues.whythisplay;
                      break;
                    case 'placeplay':
                      c = itrm.dataValues.placeplay;
                      break;
                    case 'howcome':
                      c = item.dataValues.howcome;
                      break;
                    case 'howleave':
                      c = item.dataValues.howleave;
                      break;
                    case 'firstmoney':
                      c = item.dataValues.firstmoney;
                      break;
                    case 'talk':
                      c = item.dataValues.talk;
                      break;
                    case 'mascotdesc':
                      c = item.dataValues.mascotdesc;
                      break;
                    case 'jargon':
                      c = item.dataValues.jargon;
                      break;
                    case 'specsigns':
                      c = item.dataValues.specsigns;
                      break;
                    case 'idmarks':
                      c = item.dataValues.idmarks;
                      break;
                    case 'nameslist':
                      c = item.dataValues.nameslist;
                      break;
                    case 'whatceleb':
                      c = item.dataValues.whatceleb;
                      break;
                    case 'relations':
                      c = item.dataValues.relations;
                      break;
                    case 'whobest':
                      c = item.dataValues.whobest;
                      break;
                    case 'problemdesc':
                      c = item.dataValues.problemdesc;
                      break;
                    case 'solution':
                      c = item.dataValues.solution;
                      break;
                    case 'events':
                      c = item.dataValues.events;
                      break;
                    case 'reactions':
                      c = item.dataValues.reactions;
                      break;
                    case 'story':
                      c = item.dataValues.story;
                      break;
                    case 'identity':
                      c = item.dataValues.identity;
                      break;
                    default:
                      break;
                  }
                  if (c !== '') list.push(c);
                }

                data.chartList = {
                  list: list
                };
                res.send(JSON.stringify(data));
                break;
              case 'radar':
                const namesRad = [];
                const countsRad = [];
                const extrasRadar = [];
                let labelRad = '';
                const mT = ['Утром', 'Днем', 'Вечером', 'Ночью', 'По ситуации'];
                const iMrks = ['Для удобства', 'Чтобы понимали только свои', 'Другое'];
                const prArr = ['Столкновения со стражами порядка', 'Конфликты с прохожими',
                  'Профессиональная конкуренция', 'У меня не было проблем', 'Другое'];
                switch (field) {
                  case 'meetingtime':
                    labelRad = 'Общее количество отмеченных значений';
                    for (let m of mT) {
                      namesRad.push(m);
                      countsRad.push(0);
                    }
                    for (let item of items) {
                      const c = item.dataValues.meetingtime.split(',');
                      for (let ci of c) {
                        if (ci !== '') {
                          for (let i = 0; i < namesRad.length; i += 1) {
                            if (ci === namesRad[i]) countsRad[i] += 1;
                          }
                        }
                      }
                    }
                    break;
                  case 'forwhat':
                    labelRad = 'Общее количество отмеченных значений';
                    for (let m of iMrks) {
                      namesRad.push(m);
                      countsRad.push(0);
                    }
                    for (let item of items) {
                      const c = item.dataValues.forwhat.split(',');
                      for (let ci of c) {
                        if (ci !== '') {
                          if (ci.split(':').length === 2) ci = iMrks[iMrks.length - 1];
                          for (let i = 0; i < namesRad.length; i += 1) {
                            if (ci === namesRad[i]) countsRad[i] += 1;
                          }
                        }
                      }
                      if (extra === 'forwhatOther') {
                        const oth = item.dataValues.forwhatOther;
                        extrasRadar.push(oth);
                      }
                    }
                    break;
                  case 'problems':
                    labelRad = 'Выбранные значения';
                    for (let m of prArr) {
                      namesRad.push(m);
                      countsRad.push(0);
                    }
                    for (let item of items) {
                      let c = item.dataValues.problemsExact;
                      if (c !== '') {
                        if (c.split(':').length === 2) c = prArr[prArr.length - 1];
                        if (c === 'Все перечисленное') {
                          for (let i = 0; i < 3; i ++) {
                            countsRad[i] += 1;
                          }
                        } else {
                          for (let i = 0; i < namesRad.length; i += 1) {
                            if (c === namesRad[i]) countsRad[i] += 1;
                          }
                        }
                      }
                      if (extra === 'problemsOther') {
                        const oth = item.dataValues.problemsOther;
                        extrasRadar.push(oth);
                      }
                    }
                    break;
                  default:
                    break;
                }

                data.chartRadar = {
                  values: countsRad,
                  labels: namesRad,
                  label: labelRad
                };
                if (extra) {
                  data.otherList = extrasRadar;
                }
                res.send(JSON.stringify(data));
                break;
              default:
                break;
            }
          });
        });
      }
    });
  });

  app.get('/getstatdata/:id', (req, res) => {
    const id = req.params.id;

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov', 'RRica29081BhA5', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: path.join(__dirname, '../src/StreetnrollDB.db'),

      operatorsAliases: false
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Get connection to DB established');

        const answersStart    = sequelize.define('answersStart',    aS, aSettings);
        const answersListener = sequelize.define('answersListener', aL, aSettings);
        const answersMusician = sequelize.define('answersMusician', aM, aSettings);

        answersStart.sync().then(() => {
          if (id < 0) {
            answersStart.findAll().then((rows) => {
              let data = [];
              for (let i = 0; i < rows.length; i++) {
                const row = rows[i].dataValues;
                if (row) {
                  data.push({
                    id: row.id,
                    city: row.city,
                    age: row.age,
                    everPlayed: row.everPlayed ? 1 : 0
                  });
                }
              }
              res.send(JSON.stringify(data));
            });
          } else {
            answersStart.findById(id).then((item) => {
              const aStart = item.dataValues;
              if (aStart.everPlayed) {
                answersMusician.sync().then(() => {
                  answersMusician.findById(id).then((museItem) => {
                    res.send(JSON.stringify({
                      aStart: aStart,
                      aMain: museItem.dataValues
                    }));
                    return;
                  });
                });
              } else {
                answersListener.findById(id).then((listItem) => {
                  res.send(JSON.stringify({
                    aStart: aStart,
                    aMain: listItem.dataValues
                  }));
                });
              }
            });
          }
        });
      }
    )
    .catch(err => {
        console.error('Connection Error: ', err);
        res.sendStatus(502);
      }
    );
  });

  // History api fallback
  app.use(fallback('index.html', { root: path.join(__dirname, '../src') }));

  app.post('/sendFeedback', (req, res) => {
    const data = req.body;

    const mailOptions = {
      from: '"Street-n-roll Feedbacker" <richardelfsheep@gmail.com>',
      to: 'sergey.chinkov@yandex.ru',
      subject: 'Feedback from Street\'n\'roll',
      text: data.thanks + '\n' + data.help,
      html: '<h3>С сайта street-n-roll.ru было выслано сообщение с обратной связью</h3>'
        + '<h4> Благодарности: </h4>'
        + '<p>' + data.thanks + '</p>'
        + '</br>'
        + '<h4> Предложения по улучшению: </h4>'
        + '<p>' + data.help + '</p>'
    };

    transporter.sendMail(mailOptions, function(error, info) {
      if(error) {
        return console.log(error);
      }

      console.log('Message sent: ' + info.response);
    });
  });

  app.post('/send', (req, res) => {
    const dataBase = req.body.dataBase;
    const aStart = req.body.answersStart;
    const aTable = req.body.answersTable;

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov', 'RRica29081BhA5', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: path.join(__dirname, '../src/StreetnrollDB.db'),

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
                    howlong:        aTable.howlong,
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
                    mascot:         aTable.mascot,
                    mascotdesc:     aTable.mascotdesc,
                    jargon:         aTable.jargon,
                    specsigns:      aTable.specsigns,
                    idmarks:        aTable.idmarks,
                    forwhat:        aTable.forwhat,
                    forwhatOther:   aTable.forwhatOther,
                    celebrations:   aTable.celebrations,
                    whatceleb:      aTable.whatceleb,
                    relations:      aTable.relations,
                    whobest:        aTable.whobest,
                    events:         aTable.events,
                    reactions:      aTable.reactions,
                    story:          aTable.story,
                    identity:       aTable.identity,
                    names:          aTable.names,
                    nameslist:      aTable.nameslist,
                    problems:       aTable.problems,
                    problemsExact:  aTable.problemsExact,
                    problemsOther:  aTable.problemsOther,
                    problemdesc:    aTable.problemdesc,
                    solution:       aTable.solution
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

  app.listen(pkgJson.rekit.devPort, (err) => {
    if (err) {
      console.error(err);
    }
    console.log(`Dev server listening at http://localhost:${pkgJson.rekit.devPort}/`);
    if (API) {
      console.log(`Proxy to API Server(Only for dev): ${API}`);
    }
  });
}

// Start an express server for build result.
function startBuildServer() {
  const app = express();
  const root = path.join(__dirname, '../build');
  app.use(express.static(root));
  app.use(fallback('index.html', { root }));

  app.use(express.static(path.join(__dirname, '../')));

  app.use(bodyParser.json());

  app.post('/sendFeedback', (req, res) => {
    const data = req.body;

    const mailOptions = {
      from: '"Street-n-roll Feedbacker" <richardelfsheep@gmail.com>',
      to: 'sergey.chinkov@yandex.ru',
      subject: 'Test feedback from Street\'n\'roll build server',
      text: data.thanks + '\n' + data.help
    };
  });

  app.post('/send', (req, res) => {
    const dataBase = req.body.dataBase;
    const aStart = req.body.answersStart;
    const aTable = req.body.answersTable;

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov@yandex.ru', 'RRica29081BhA5', {
      host: 'localhost',
      dialect: 'sqlite',

      pool: {
        max: 5,
        min: 0,
        idle: 10000
      },

      storage: './StreetnrollDB.db',

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
                    howlong:        aTable.howlong,
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
                    mascot:         aTable.mascot,
                    mascotdesc:     aTable.mascotdesc,
                    jargon:         aTable.jargon,
                    specsigns:      aTable.specsigns,
                    idmarks:        aTable.idmarks,
                    forwhat:        aTable.forwhat,
                    forwhatOther:   aTable.forwhatOther,
                    celebrations:   aTable.celebrations,
                    whatceleb:      aTable.whatceleb,
                    relations:      aTable.relations,
                    whobest:        aTable.whobest,
                    events:         aTable.events,
                    reactions:      aTable.reactions,
                    story:          aTable.story,
                    identity:       aTable.identity,
                    names:          aTable.names,
                    nameslist:      aTable.nameslist,
                    problems:       aTable.problems,
                    problemsExact:  aTable.problemsExact,
                    problemsOther:  aTable.problemsOther,
                    problemdesc:    aTable.problemdesc,
                    solution:       aTable.solution
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

// Start an express server for rekit-studio.
function startStudioServer() {
  console.log('Starting Rekit Studio...');
  const app = express();
  const server = http.createServer(app);
  const root = path.join(__dirname, '../node_modules/rekit-studio/dist');
  app.use(rekitStudioMiddleWare()(server, app, { readonly: !!args.readonly }));
  app.use(express.static(root));
  app.use(fallback('index.html', { root }));

  // Other files should not happen, respond 404
  app.get('*', (req, res) => {
    console.log('Warning: unknown req: ', req.path);
    res.sendStatus(404);
  });

  const port = pkgJson.rekit.studioPort;
  server.listen(port, (err) => {
    if (err) {
      console.error(err);
    }

    console.log(`Studio server is listening at http://localhost:${port}/`);
  });
}

// Build dll to accerlarate webpack build performance for dev-time.
function buildDevDll() {
  const dllConfig = getConfig('dll');

  // Get snapshot hash for all dll entries versions.
  const nameVersions = dllConfig.entry['dev-vendors'].map((pkgName) => {
    const pkg = require(path.join(pkgName.split('/')[0], 'package.json'));
    return `${pkg.name}_${pkg.version}`;
  }).join('-');

  const dllHash = crypto
    .createHash('md5')
    .update(nameVersions)
    .digest('hex');
  const dllName = `devVendors_${dllHash}`;

  // If dll doesn't exist or version changed, then rebuild it
  if (
    !shell.test('-e', manifestPath)
    || require(manifestPath).name !== dllName
  ) {
    delete require.cache[manifestPath]; // force reload the new manifest
    console.log('Dev vendors have changed, rebuilding dll...');
    console.time('Dll build success');

    dllConfig.output.library = dllName;
    dllConfig.output.path = path.join(__dirname, '../.tmp');
    dllConfig.plugins.push(new webpack.DllPlugin({
      path: manifestPath,
      name: dllName,
      context: srcPath,
    }));

    return new Promise((resolve, reject) => {
      webpack(dllConfig, (err) => {
        if (err) {
          console.log('dll build failed:');
          console.log(err.stack || err);
          reject();
          return;
        }
        console.timeEnd('Dll build success');
        resolve();
      });
    });
  }
  console.log('The dev-vendors bundle is up to date, no need to rebuild.');
  return Promise.resolve();
}

if (!args.mode || args.mode === 'build') startBuildServer();
if (!args.mode || args.mode === 'dev') buildDevDll().then(startDevServer);
if (!args.mode || args.mode === 'studio') startStudioServer();
