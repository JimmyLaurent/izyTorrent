const _ = require('lodash');
const TorrentSearchApi = require('torrent-search-api');
const config = require('../services/config');

const torrentSearch = new TorrentSearchApi();

_.forEach(config.torrentProviders, (value, key) => {
    if(value) {
        torrentSearch.enableProvider(key, ...value);
    }
    else {
        torrentSearch.enableProvider(key);
    }
});

module.exports = torrentSearch;