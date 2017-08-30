const express = require('express');
const router = express.Router();

const config = require('../services/config');
const path = require('path');
const uuidV4 = require('uuid/v4');
const _ = require('lodash');
const sanitize = require("sanitize-filename");

const torrentSearch = require('../services/torrent-search');
const utClient = require('../services/utorrent-client');

router.get('/search/providers', (req, res) => {
  res.send(torrentSearch.getActiveProviders());
});

router.post('/search/details', (req, res, next) => {
  torrentSearch.getTorrentDetails(req.body)
    .then(r => res.send(r))
    .catch(next);
});

router.get('/search/:query', (req, res, next) => {
  let args = !!req.query.providers ? [req.query.providers.split(',')] : [];
  args = [...args, req.params.query, req.query.category, req.query.limit];

  torrentSearch.search(...args)
    .then(results => {
      res.send(results);
    })
    .catch(next);
});

router.get('/list', (req, res) => {
  utClient.call('list', { 'cid': req.query.cid }, (err, torrentsList) => {
    if (err) { res.send(err); return; }
    res.json(torrentsList);
  });
});

router.get('/do', (req, res) => {
  utClient.call(req.query.action, req.query, (err, data) => {
    if (err) { res.send(err); return; }
    res.send(data);
  });
});

router.post('/add', function (req, res, next) {
  if(req.body.magnet) {
    utClient.call('add-url', { 's': req.body.magnet }, (err, data) => {
        if (err) { res.send(err); return; }
        res.send(data);
      });
  }
  else {
    torrentSearch.downloadTorrent(req.body)
    .then(torrentFileBuffer => {
      utClient.call('add-file', { 'torrent_file': torrentFileBuffer }, (err, data) => {
        if (err) { res.send(err); return; }
        res.send(data);
      });
    })
    .catch(next);
  }
});

router.use((err, req, res, next) => {
  // handle error
  res.send(500, err);
})

module.exports = router;