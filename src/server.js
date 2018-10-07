'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fallback = require('express-history-api-fallback');
const pkgJson = require('../package.json');
const Sequelize = require('sequelize');
const nodemailer = require('nodemailer');

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

function startBuildServer() {
  const app = express();
  const root = __dirname;
  app.use(express.static(root));

  app.use(express.static(__dirname));

  app.use(bodyParser.json());

  // Get stat by question
  app.get('/getstatbyquestion/:id/:field/:type/:extra', (req, res) => {
    const { id, field, type, extra } = req.params;

    const data = {};

    const sequelize = new Sequelize('StreetnrollDB', 'sergey.chinkov', 'RRica29081BhA5', {
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

    sequelize.authenticate().then(() => {
      console.log('Get connection at "getstatbyquestion" to DB established');

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
              for (let i = 0; i < items.length; i += 1) {
                const c = items[i].dataValues.city.toUpperCase();
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
                for (let i = 0; i < items.length; i += 1) {
                  let c = 0;
                  if (field === 'interest') {
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
                  labels: names
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
                    for (let i = 0; i < items.length; i += 0) {
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

  // Display Stat
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

      storage: path.join(__dirname, 'StreetnrollDB.db'),

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
            answersStart.findAll().then((rows) => {
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
                  answersMusician.findById(id).then((museItem) => {
                    res.send(JSON.stringify({
                      aStart,
                      aMain: museItem.dataValues
                    }));
                  });
                });
              } else {
                answersListener.findById(id).then((listItem) => {
                  res.send(JSON.stringify({
                    aStart,
                    aMain: listItem.dataValues
                  }));
                });
              }
            });
          }
        });
      }).catch((err = null) => {
        console.error('Connection Error: ', err);
        res.sendStatus(502);
      });
  });
  // !Display Stat

  app.use(fallback('index.html', { root }));

  app.post('/sendFeedback', (req, res) => {
    const data = req.body;

    const mailOptions = {
      from: '"Street-n-roll Feedbacker" <richardelfsheep@gmail.com>',
      to: 'pozhivi.s.moe@gmail.com, sergey.chinkov@yandex.ru',
      subject: 'Feedback from Street\'n\'roll',
      text: `${data.thanks} \n ${data.help}`,
      html: `<h3> С сайта street-n-roll.ru было выслано сообщение с обратной связью </h3>
        <h4> Благодарности: </h4>
        <p> ${data.thanks} </p>
        </br>
        <h4> Предложения по улучшению: </h4>
        <p> ${data.help} </p>`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        res.send(418);
        return console.log(error);
      }

      res.send(200);
      return console.log(`Message sent: ${info.response}`);
    });
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

      storage: path.join(__dirname, 'StreetnrollDB.db'),

      operatorsAliases: false
    });

    sequelize
      .authenticate()
      .then(() => {
        console.log('Connection to DB established');

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

startBuildServer();
