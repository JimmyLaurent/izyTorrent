const utorrentCfg = require('../services/config').utorrent;
const Client = require('utorrent-api');
const utorrent = new Client(utorrentCfg.host, utorrentCfg.port);
utorrent.setCredentials(utorrentCfg.login, utorrentCfg.password);

module.exports = utorrent;