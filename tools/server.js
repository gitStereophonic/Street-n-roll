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
  id: { type: Sequelize.INTEGER, primaryKey: true },
  city: { type: Sequelize.STRING },
  age: { type: Sequelize.STRING },
  gender: { type: Sequelize.STRING },
  edu: { type: Sequelize.STRING },
  eduOther: { type: Sequelize.STRING },
  job: { type: Sequelize.STRING },
  everPlayed: { type: Sequelize.BOOLEAN },
  thanks: { type: Sequelize.TEXT },
  help: { type: Sequelize.TEXT }
};

const aL = {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  interest: { type: Sequelize.INTEGER },
  who: { type: Sequelize.STRING },
  money: { type: Sequelize.STRING },
  songs: { type: Sequelize.TEXT },
  sign: { type: Sequelize.TEXT },
  traditions: { type: Sequelize.TEXT },
  experience: { type: Sequelize.TEXT }
};

const aM = {
  id: { type: Sequelize.INTEGER, primaryKey: true },
  hobbie: { type: Sequelize.STRING },
  hobbieOther: { type: Sequelize.STRING },
  howlong: { type: Sequelize.STRING },
  rather: { type: Sequelize.BOOLEAN },
  ratherExact: { type: Sequelize.STRING },
  why: { type: Sequelize.STRING },
  community: { type: Sequelize.BOOLEAN },
  communityExact: { type: Sequelize.STRING },
  official: { type: Sequelize.STRING },
  officialOther: { type: Sequelize.STRING },
  wocom: { type: Sequelize.STRING },
  howjoin: { type: Sequelize.TEXT },
  cookies: { type: Sequelize.TEXT },
  meetings: { type: Sequelize.BOOLEAN },
  meetingsExact: { type: Sequelize.STRING },
  reasons: { type: Sequelize.TEXT },
  where: { type: Sequelize.TEXT },
  whywhere: { type: Sequelize.TEXT },
  meetingtime: { type: Sequelize.STRING },
  place: { type: Sequelize.TEXT },
  descplace: { type: Sequelize.TEXT },
  time: { type: Sequelize.TEXT },
  whatplay: { type: Sequelize.TEXT },
  whythisplay: { type: Sequelize.TEXT },
  placeplay: { type: Sequelize.STRING },
  howcome: { type: Sequelize.TEXT },
  howleave: { type: Sequelize.TEXT },
  firstmoney: { type: Sequelize.STRING },
  talk: { type: Sequelize.TEXT },
  mascot: { type: Sequelize.STRING },
  mascotdesc: { type: Sequelize.TEXT },
  jargon: { type: Sequelize.TEXT },
  specsigns: { type: Sequelize.TEXT },
  idmarks: { type: Sequelize.TEXT },
  forwhat: { type: Sequelize.STRING },
  forwhatOther: { type: Sequelize.STRING },
  celebrations: { type: Sequelize.STRING },
  whatceleb: { type: Sequelize.TEXT },
  relations: { type: Sequelize.TEXT },
  whobest: { type: Sequelize.TEXT },
  events: { type: Sequelize.TEXT },
  reactions: { type: Sequelize.TEXT },
  story: { type: Sequelize.TEXT },
  identity: { type: Sequelize.TEXT },
  names: { type: Sequelize.STRING },
  nameslist: { type: Sequelize.STRING },
  problems: { type: Sequelize.BOOLEAN },
  problemsExact: { type: Sequelize.STRING },
  problemsOther: { type: Sequelize.STRING },
  problemdesc: { type: Sequelize.TEXT },
  solution: { type: Sequelize.TEXT }
};

const aSettings = {
  createdAt: false,
  updatedAt: false,
  freezeTableName: true
};

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
    const pageNumber = parseInt(req.params.page, 10);

    const data = {
      id: pageNumber,
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
        { question: 'Ваш род занятий', fieldName: 'job', dataType: 'list' }
      ],
      [
        { question: 'Играли ли Вы на улице', fieldName: 'everPlayed', dataType: 'pie' }
      ],
      [
        { question: 'Интересует ли вас уличная музыка и ее исполнители?', fieldName: 'interest', dataType: 'radar', fixedLabels: [0, 1, 2, 3, 4, 5, 6] },
        { question: 'Кто такие, на Ваш взгляд, уличные музыканты?', fieldName: 'who', dataType: 'list' },
        { question: 'Даете ли Вы деньги музыкантам и почему?', fieldName: 'money', dataType: 'list' },
        { question: 'Какие песни Вам доводилось слышать в исполнении менестрелей?', fieldName: 'songs', dataType: 'list' },
        { question: 'Есть ли у Вас приметы и поверья, связанные с уличными музыкантами?', fieldName: 'sign', dataType: 'list' },
        { question: 'Известны ли Вам обычаи, распространенные среди музыкантов?', fieldName: 'traditions', dataType: 'list' },
        { question: 'Были ли в Вашей жизни примечательные случаи, связанные с уличными музыкантами?', fieldName: 'experience', dataType: 'list' },
        { question: '', fieldName: '', dataType: '' },
      ]
    ];

    const countingAllTheAssholes = (array = []) => {
      const names = [];
      const count = [];
      for (let item = 0; item < array.length; item += 1) {
        let isHere = false;
        for (let i = 0; i < names.length; i += 1) {
          if (array[item] === names[i]) {
            count[i] += 1;
            isHere = true;
            break;
          }
        }
        if (!isHere) {
          names.push(array[item]);
          count.push(1);
        }
      }

      return {
        values: count,
        labels: names
      };
    };

    const countingFixedAssholes = (array = [], fixedLabels = null) => {
      const count = [];
      for (let i = 0; i < fixedLabels.length; i += 1) {
        count.push(0);
      }
      for (let item = 0; item < array.length; item += 1) {
        for (let i = 0; i < fixedLabels.length; i += 1) {
          if (array[item] === fixedLabels[i]) {
            count[i] += 1;
            break;
          }
        }
      }

      return {
        values: count,
        labels: fixedLabels
      };
    };

    const getArrayByField = (items = [], field = '') => {
      const ret = [];
      switch (field) {
        case 'city':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.city);
          }
          break;
        case 'age':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.age);
          }
          break;
        case 'gender':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.gender);
          }
          break;
        case 'edu':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.edu);
          }
          break;
        case 'eduOther':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.eduOther);
          }
          break;
        case 'job':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.job);
          }
          break;
        case 'everPlayed':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.everPlayed ? 'Да' : 'Нет');
          }
          break;
        case 'interest':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.interest);
          }
          break;
        case 'who':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.who);
          }
          break;
        case 'money':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.money);
          }
          break;
        case 'songs':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.songs);
          }
          break;
        case 'sign':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.sign);
          }
          break;
        case 'traditions':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.traditions);
          }
          break;
        case 'experience':
          for (let i = 0; i < items.length; i += 1) {
            ret.push(items[i].dataValues.experience);
          }
          break;
        default:
          break;
      }

      return ret;
    };

    const getPageQuestionsData = (items = []) => {
      const pageRes = [];

      for (let i = 0; i < baseData[pageNumber].length; i += 1) {
        const q = baseData[pageNumber][i];
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
          case 'radar':
            dt.qData = countingFixedAssholes(arr, q.fixedLabels);
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
          for (let j = 0; j < extraArr.length; j += 1) {
            const eE = extraArr[j];
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
    };

    sequelize.authenticate().then(() => {
      console.log('Connection to DB established at "getstatbypages"');

      /**
       * Res data structure (data.questions[i]):
       * {
       *    qText: "Question text",
       *    qDataType: pie/list/bar,
       *    qData: { chart format },
       *    qExtraText: "Extra question text",
       *    qExtraType: pie/list/bar,
       *    qExtraData: { list }
       * }
       */
      if (pageNumber < 2 && pageNumber > -1) {
        const answersStart = sequelize.define('answersStart', aS, aSettings);
        answersStart.sync().then(() => {
          answersStart.findAll().then((items = []) => {
            data.questions = getPageQuestionsData(items);

            res.send(JSON.stringify(data));
          });
        });
      } else if (pageNumber > 1 && pageNumber < 8) {
        const answersListener = sequelize.define('answersListener', aL, aSettings);
        answersListener.sync().then(() => {
          answersListener.findAll().then((items = []) => {
            data.questions = getPageQuestionsData(items);

            res.send(JSON.stringify(data));
          });
        });
      } else if (pageNumber >= 8 && pageNumber < 24) {
        console.log('pageNumber >= 8 && pageNumber < 24');
      } else {
        console.log(`The page number (${pageNumber}) is over the limit`);
        res.sendStatus(418);
      }
    });
  });

  app.get('/getstatbyquestion/:id/:field/:type/:extra', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { field, type, extra } = req.params;

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
      console.log('Connection to DB established at "getstatbyquestion"');

      if (id < 0) {
        console.log('id < 0');
      } else if (id < 7) {
        const answersStart = sequelize.define('answersStart', aS, aSettings);

        answersStart.sync().then(() => {
          answersStart.findAll().then((items = []) => {
            if (id === 0) {
              answersStart.sync().then(() => {
                answersStart.count().then((c = 0) => {
                  data.singleValue = c;
                  res.send(JSON.stringify(data));
                });
              });
            } else if (id === 1) {
              const cityNames = [];
              const cityCounts = [];
              for (let item = 0; item < items.length; item += 1) {
                const c = items[item].dataValues.city.toUpperCase();
                let check = false;
                for (let j = 0; j < cityNames.length; j += 1) {
                  if (cityNames[j] === c) {
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
                case 'pie': {
                  const names = [];
                  const counts = [];
                  const extras = [];
                  for (let i = 0; i < items.length; i += 1) {
                    let c = '';
                    switch (field) {
                      case 'age':
                        c = items[i].dataValues.age;
                        break;
                      case 'edu':
                        c = items[i].dataValues.edu;
                        break;
                      case 'gender':
                        c = items[i].dataValues.gender;
                        break;
                      case 'everPlayed':
                        c = items[i].dataValues.everPlayed ? 'Да' : 'Нет';
                        break;
                      default:
                        break;
                    }
                    let check = false;
                    for (let j = 0; j < names.length; j += 1) {
                      if (names[j] === c) {
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
                      const oth = items[i].dataValues.eduOther;
                      if (oth !== '') extras.push(oth);
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
                }
                case 'list': {
                  const list = [];
                  for (let i = 0; i < items.length; i += 1) {
                    if (field === 'job') {
                      list.push(items[i].job);
                    }
                  }
                  data.chartList = {
                    list
                  };
                  res.send(JSON.stringify(data));
                  break;
                }
                default:
                  break;
              }
            }
          });
        });
      } else if (id < 14) {
        const answersListener = sequelize.define('answersListener', aL, aSettings);

        answersListener.sync().then(() => {
          answersListener.findAll().then((items = []) => {
            switch (type) {
              case 'radar': {
                const names = [];
                const counts = [];
                let label = '';
                for (let i = 0; i < items.length; i += 1) {
                  let c = 0;
                  if (field === 'interest') {
                    label = 'От 0 до 6';
                    c = items[i].dataValues.interest;
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
                  label
                };
                res.send(JSON.stringify(data));
                return;
              }
              case 'list': {
                const list = [];
                switch (field) {
                  case 'who':
                    for (let i = 0; i < items.length; i += 1) {
                      const v = items[i].dataValues.who;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'money': {
                    let yes = 0;
                    let no = 0;
                    for (let i = 0; i < items.length; i += 1) {
                      const str = items[i].dataValues.money;
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
                    };
                    break;
                  }
                  case 'songs':
                    for (let i = 0; i < items.length; i += 1) {
                      const v = items[i].dataValues.songs;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'sign':
                    for (let i = 0; i < items.length; i += 1) {
                      const v = items[i].dataValues.sign;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'traditions':
                    for (let i = 0; i < items.length; i += 1) {
                      const v = items[i].dataValues.traditions;
                      if (v !== '') list.push(v);
                    }
                    break;
                  case 'experience':
                    for (let i = 0; i < items.length; i += 1) {
                      const v = items[i].dataValues.experience;
                      if (v !== '') list.push(v);
                    }
                    break;
                  default:
                    break;
                }
                data.chartList = {
                  list
                };
                res.send(JSON.stringify(data));
                break;
              }
              default:
                break;
            }
          });
        });
      } else {
        const answersMusician = sequelize.define('answersMusician', aM, aSettings);

        answersMusician.sync().then(() => {
          answersMusician.findAll().then((items = []) => {
            switch (type) {
              case 'pie': {
                const names = [];
                const counts = [];
                const extras = [];
                for (let i = 0; i < items.length; i += 1) {
                  let c = '';
                  switch (field) {
                    case 'hobbie':
                      c = items[i].dataValues.hobbie;
                      break;
                    case 'howlong':
                      c = items[i].dataValues.howlong;
                      break;
                    case 'rather':
                      c = items[i].dataValues.ratherExact;
                      break;
                    case 'community':
                      c = items[i].dataValues.communityExact;
                      break;
                    case 'official':
                      c = items[i].dataValues.official;
                      break;
                    case 'meetings':
                      c = items[i].dataValues.meetingsExact;
                      break;
                    case 'mascot':
                      c = items[i].dataValues.mascot;
                      break;
                    case 'names':
                      c = items[i].dataValues.names;
                      break;
                    case 'celebrations':
                      c = items[i].dataValues.celebrations;
                      break;
                    default:
                      break;
                  }

                  let check = false;
                  for (let j = 0; j < names.length; j += 1) {
                    if (names[j] === c) {
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
                      oth = items[i].dataValues.hobbieOther;
                      break;
                    case 'officialOther':
                      oth = items[i].dataValues.officialOther;
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
              }
              case 'list': {
                const list = [];
                for (let i = 0; i < items.length; i += 1) {
                  let c = '';
                  switch (field) {
                    case 'why':
                      c = items[i].dataValues.why;
                      break;
                    case 'wocom':
                      c = items[i].dataValues.wocom;
                      break;
                    case 'howjoin':
                      c = items[i].dataValues.howjoin;
                      break;
                    case 'cookies':
                      c = items[i].dataValues.cookies;
                      break;
                    case 'reasons':
                      c = items[i].dataValues.reasons;
                      break;
                    case 'where':
                      c = items[i].dataValues.where;
                      break;
                    case 'whywhere':
                      c = items[i].dataValues.whywhere;
                      break;
                    case 'place':
                      c = items[i].dataValues.place;
                      break;
                    case 'descplace':
                      c = items[i].dataValues.descplace;
                      break;
                    case 'time':
                      c = items[i].dataValues.time;
                      break;
                    case 'whatplay':
                      c = items[i].dataValues.whatplay;
                      break;
                    case 'whythisplay':
                      c = items[i].dataValues.whythisplay;
                      break;
                    case 'placeplay':
                      c = items[i].dataValues.placeplay;
                      break;
                    case 'howcome':
                      c = items[i].dataValues.howcome;
                      break;
                    case 'howleave':
                      c = items[i].dataValues.howleave;
                      break;
                    case 'firstmoney':
                      c = items[i].dataValues.firstmoney;
                      break;
                    case 'talk':
                      c = items[i].dataValues.talk;
                      break;
                    case 'mascotdesc':
                      c = items[i].dataValues.mascotdesc;
                      break;
                    case 'jargon':
                      c = items[i].dataValues.jargon;
                      break;
                    case 'specsigns':
                      c = items[i].dataValues.specsigns;
                      break;
                    case 'idmarks':
                      c = items[i].dataValues.idmarks;
                      break;
                    case 'nameslist':
                      c = items[i].dataValues.nameslist;
                      break;
                    case 'whatceleb':
                      c = items[i].dataValues.whatceleb;
                      break;
                    case 'relations':
                      c = items[i].dataValues.relations;
                      break;
                    case 'whobest':
                      c = items[i].dataValues.whobest;
                      break;
                    case 'problemdesc':
                      c = items[i].dataValues.problemdesc;
                      break;
                    case 'solution':
                      c = items[i].dataValues.solution;
                      break;
                    case 'events':
                      c = items[i].dataValues.events;
                      break;
                    case 'reactions':
                      c = items[i].dataValues.reactions;
                      break;
                    case 'story':
                      c = items[i].dataValues.story;
                      break;
                    case 'identity':
                      c = items[i].dataValues.identity;
                      break;
                    default:
                      break;
                  }
                  if (c !== '') list.push(c);
                }

                data.chartList = {
                  list
                };
                res.send(JSON.stringify(data));
                break;
              }
              case 'radar': {
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
                    for (let m = 0; m < mT.length; m += 1) {
                      namesRad.push(mT[m]);
                      countsRad.push(0);
                    }
                    for (let i = 0; i < items.length; i += 1) {
                      const c = items[i].dataValues.meetingtime.split(',');
                      for (let ci = 0; ci < c.length; ci += 1) {
                        if (c[ci] !== '') {
                          for (let j = 0; j < namesRad.length; j += 1) {
                            if (c[ci] === namesRad[j]) countsRad[j] += 1;
                          }
                        }
                      }
                    }
                    break;
                  case 'forwhat':
                    labelRad = 'Общее количество отмеченных значений';
                    for (let m = 0; m < iMrks.length; m += 1) {
                      namesRad.push(iMrks[m]);
                      countsRad.push(0);
                    }
                    for (let i = 0; i < items.length; i += 1) {
                      const c = items[i].dataValues.forwhat.split(',');
                      for (let ci = 0; ci < c.length; ci += 1) {
                        if (c[ci] !== '') {
                          if (c[ci].split(':').length === 2) c[ci] = iMrks[iMrks.length - 1];
                          for (let j = 0; j < namesRad.length; j += 1) {
                            if (c[ci] === namesRad[j]) countsRad[j] += 1;
                          }
                        }
                      }
                      if (extra === 'forwhatOther') {
                        const oth = items[i].dataValues.forwhatOther;
                        extrasRadar.push(oth);
                      }
                    }
                    break;
                  case 'problems':
                    labelRad = 'Выбранные значения';
                    for (let m = 0; m < prArr.length; m += 1) {
                      namesRad.push(prArr[m]);
                      countsRad.push(0);
                    }
                    for (let i = 0; i < items.length; i += 1) {
                      let c = items[i].dataValues.problemsExact;
                      if (c !== '') {
                        if (c.split(':').length === 2) c = prArr[prArr.length - 1];
                        if (c === 'Все перечисленное') {
                          for (let j = 0; j < 3; j += 1) {
                            countsRad[j] += 1;
                          }
                        } else {
                          for (let j = 0; j < namesRad.length; j += 1) {
                            if (c === namesRad[j]) countsRad[j] += 1;
                          }
                        }
                      }
                      if (extra === 'problemsOther') {
                        const oth = items[i].dataValues.problemsOther;
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
              }
              default:
                break;
            }
          });
        });
      }
    });
  });

  app.get('/getstatdata/:id', (req, res) => {
    const { id } = req.params;

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

        const answersStart = sequelize.define('answersStart', aS, aSettings);
        const answersListener = sequelize.define('answersListener', aL, aSettings);
        const answersMusician = sequelize.define('answersMusician', aM, aSettings);

        answersStart.sync().then(() => {
          if (id < 0) {
            answersStart.findAll().then((rows = []) => {
              const data = [];
              for (let i = 0; i < rows.length; i += 1) {
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
                  answersMusician.findById(id).then((museItem = null) => {
                    res.send(JSON.stringify({
                      aStart,
                      aMain: museItem.dataValues
                    }));
                  });
                });
              } else {
                answersListener.findById(id).then((listItem = null) => {
                  res.send(JSON.stringify({
                    aStart,
                    aMain: listItem.dataValues
                  }));
                });
              }
            });
          }
        });
      })
      .catch((err = null) => {
        console.error('Connection Error: ', err);
        res.sendStatus(502);
      });
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

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.sendStatus(418);
        return console.log(error);
      }

      res.send(200);
      return console.log('Message sent: ' + info.response);
    });
  });

  app.post('/send', (req, res) => {
    const { dataBase } = req.body;
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

        answersStart.sync().then(() => {
          answersStart.findAll().then((rows = []) => {
            answersStart.create({
              id: rows.length,
              city: aStart.city,
              age: aStart.age,
              gender: aStart.gender,
              edu: aStart.edu,
              eduOther: aStart.eduOther,
              job: aStart.job,
              everPlayed: aStart.everPlayed,
              thanks: aStart.thanks,
              help: aStart.help
            }).then(() => {
              if (dataBase === 'answersListener') {
                answersListener.sync().then(() => {
                  answersListener.create({
                    id: rows.length,
                    interest: aTable.interest,
                    who: aTable.who,
                    money: aTable.money,
                    songs: aTable.songs,
                    sign: aTable.sign,
                    traditions: aTable.traditions,
                    experience: aTable.experience
                  }).then(() => {
                    res.sendStatus(200);
                  });
                });
              } else if (dataBase === 'answersMusician') {
                answersMusician.sync().then(() => {
                  answersMusician.create({
                    id: rows.length,
                    hobbie: aTable.hobbie,
                    hobbieOther: aTable.hobbieOther,
                    howlong: aTable.howlong,
                    rather: aTable.rather,
                    ratherExact: aTable.ratherExact,
                    why: aTable.why,
                    community: aTable.community,
                    communityExact: aTable.communityExact,
                    official: aTable.official,
                    officialOther: aTable.officialOther,
                    wocom: aTable.wocom,
                    howjoin: aTable.howjoin,
                    cookies: aTable.cookies,
                    meetings: aTable.meetings,
                    meetingsExact: aTable.meetingsExact,
                    reasons: aTable.reasons,
                    where: aTable.where,
                    whywhere: aTable.whywhere,
                    meetingtime: aTable.meetingtime,
                    place: aTable.place,
                    descplace: aTable.descplace,
                    time: aTable.time,
                    whatplay: aTable.whatplay,
                    whythisplay: aTable.whythisplay,
                    placeplay: aTable.placeplay,
                    howcome: aTable.howcome,
                    howleave: aTable.howleave,
                    firstmoney: aTable.firstmoney,
                    talk: aTable.talk,
                    mascot: aTable.mascot,
                    mascotdesc: aTable.mascotdesc,
                    jargon: aTable.jargon,
                    specsigns: aTable.specsigns,
                    idmarks: aTable.idmarks,
                    forwhat: aTable.forwhat,
                    forwhatOther: aTable.forwhatOther,
                    celebrations: aTable.celebrations,
                    whatceleb: aTable.whatceleb,
                    relations: aTable.relations,
                    whobest: aTable.whobest,
                    events: aTable.events,
                    reactions: aTable.reactions,
                    story: aTable.story,
                    identity: aTable.identity,
                    names: aTable.names,
                    nameslist: aTable.nameslist,
                    problems: aTable.problems,
                    problemsExact: aTable.problemsExact,
                    problemsOther: aTable.problemsOther,
                    problemdesc: aTable.problemdesc,
                    solution: aTable.solution
                  }).then(() => {
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
      .catch((err = null) => {
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

    console.log(mailOptions);
    res.send(200);
  });

  app.post('/send', (req, res) => {
    const { dataBase } = req.body;
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

        answersStart.sync().then(() => {
          answersStart.findAll().then((rows = []) => {
            answersStart.create({
              id: rows.length,
              city: aStart.city,
              age: aStart.age,
              gender: aStart.gender,
              edu: aStart.edu,
              eduOther: aStart.eduOther,
              job: aStart.job,
              everPlayed: aStart.everPlayed,
              thanks: aStart.thanks,
              help: aStart.help
            }).then(() => {
              if (dataBase === 'answersListener') {
                answersListener.sync().then(() => {
                  answersListener.create({
                    id: rows.length,
                    interest: aTable.interest,
                    who: aTable.who,
                    money: aTable.money,
                    songs: aTable.songs,
                    sign: aTable.sign,
                    traditions: aTable.traditions,
                    experience: aTable.experience
                  }).then(() => {
                    res.sendStatus(200);
                  });
                });
              } else if (dataBase === 'answersMusician') {
                answersMusician.sync().then(() => {
                  answersMusician.create({
                    id: rows.length,
                    hobbie: aTable.hobbie,
                    hobbieOther: aTable.hobbieOther,
                    howlong: aTable.howlong,
                    rather: aTable.rather,
                    ratherExact: aTable.ratherExact,
                    why: aTable.why,
                    community: aTable.community,
                    communityExact: aTable.communityExact,
                    official: aTable.official,
                    officialOther: aTable.officialOther,
                    wocom: aTable.wocom,
                    howjoin: aTable.howjoin,
                    cookies: aTable.cookies,
                    meetings: aTable.meetings,
                    meetingsExact: aTable.meetingsExact,
                    reasons: aTable.reasons,
                    where: aTable.where,
                    whywhere: aTable.whywhere,
                    meetingtime: aTable.meetingtime,
                    place: aTable.place,
                    descplace: aTable.descplace,
                    time: aTable.time,
                    whatplay: aTable.whatplay,
                    whythisplay: aTable.whythisplay,
                    placeplay: aTable.placeplay,
                    howcome: aTable.howcome,
                    howleave: aTable.howleave,
                    firstmoney: aTable.firstmoney,
                    talk: aTable.talk,
                    mascot: aTable.mascot,
                    mascotdesc: aTable.mascotdesc,
                    jargon: aTable.jargon,
                    specsigns: aTable.specsigns,
                    idmarks: aTable.idmarks,
                    forwhat: aTable.forwhat,
                    forwhatOther: aTable.forwhatOther,
                    celebrations: aTable.celebrations,
                    whatceleb: aTable.whatceleb,
                    relations: aTable.relations,
                    whobest: aTable.whobest,
                    events: aTable.events,
                    reactions: aTable.reactions,
                    story: aTable.story,
                    identity: aTable.identity,
                    names: aTable.names,
                    nameslist: aTable.nameslist,
                    problems: aTable.problems,
                    problemsExact: aTable.problemsExact,
                    problemsOther: aTable.problemsOther,
                    problemdesc: aTable.problemdesc,
                    solution: aTable.solution
                  }).then(() => {
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
      .catch((err = null) => {
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
