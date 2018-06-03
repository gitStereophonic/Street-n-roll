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
  identity:       { type: Sequelize.TEXT },
  names:          { type: Sequelize.STRING },
  nameslist:      { type: Sequelize.STRING }
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
                console.log('ROW: ======//======');
                console.log(row);
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
                    identity:       aTable.identity,
                    names:          aTable.names,
                    nameslist:      aTable.nameslist
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
                    identity:       aTable.identity,
                    names:          aTable.names,
                    nameslist:      aTable.nameslist
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
