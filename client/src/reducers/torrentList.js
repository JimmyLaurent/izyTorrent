const getTorrentFromArray = (t) => {
    // HASH (string),
    // STATUS (integer),
    // NAME (string),
    // SIZE (integer in bytes),
    // PERCENT PROGRESS (integer in per mils),
    // DOWNLOADED (integer in bytes),
    // UPLOADED (integer in bytes),
    // RATIO (integer in per mils),
    // UPLOAD SPEED (integer in bytes per second),
    // DOWNLOAD SPEED (integer in bytes per second),
    // ETA (integer in seconds),
    // LABEL (string),
    // PEERS CONNECTED (integer),
    // PEERS IN SWARM (integer),
    // SEEDS CONNECTED (integer),
    // SEEDS IN SWARM (integer),
    // AVAILABILITY (integer in 1/65535ths),
    // TORRENT QUEUE ORDER (integer),
    // REMAINING (integer in bytes)
    return {
        hash: t[0],
        status: t[1],
        name: t[2],
        size: t[3],
        percentProgress: t[4],
        downloaded: t[5],
        uploaded: t[6],
        ratio: t[7],
        uploadSpeed: t[8],
        downloadSpeed: t[9],
        eta: t[10],
        label: t[11],
        peersConnected: t[12],
        peersInSwarm: t[13],
        seedsConnected: t[14],
        seedsInSwarm: t[15],
        availability: t[16],
        torrentQueueOrder: t[17],
        remaining: t[18]
    }
};

const getTorrents = (torrentsArray) => {
    return torrentsArray.map(t => getTorrentFromArray(t));
}

const getTorrentsObject = (torrentsArray) => {
    let torrents = {};
    getTorrents(torrentsArray).map((t) => {
        torrents[t.hash] = t;
    });
    return torrents;
};

const removeProp = (obj, prop) => {
    let res = Object.assign({}, obj);
    delete res[prop];
    return res;
}

export default (state = { filter: 'all' }, payload) => {
    switch (payload.type) {
        case 'LOAD_TORRENT_LIST_SUCCESS':
            let torrentListResponse = payload.item;
            if (torrentListResponse.build === undefined) {
                return Object.assign({}, state, { connected: false, torrents: [] });
            }
            let cacheId = torrentListResponse.torrentc;
            let newState = Object.assign({}, state, {
                connected: true,
                cacheId: cacheId,
                torrents: Object.assign({}, state.torrents)
            });

            if (torrentListResponse.torrents) {
                Object.assign(newState.torrents, getTorrentsObject(torrentListResponse.torrents));
            }

            if (torrentListResponse.torrentp) {
                Object.assign(newState.torrents, getTorrentsObject(torrentListResponse.torrentp));
            }

            torrentListResponse.torrentm && torrentListResponse.torrentm.map(hash => {
                newState.torrents = removeProp(newState.torrents, hash);
            });
            return newState;
        case 'SET_TORRENT_LIST_FILTER':
            console.log(payload);
            return Object.assign({}, state, { filter: payload.item });
        case 'SET_CURRENT_TORRENT_HASH':
            return Object.assign({}, state, {
                currentTorrentHash: payload.item,
            });
        case 'LOAD_TORRENT_FILES_SUCCESS':
            return Object.assign({}, state, {
                currentTorrentFiles: payload.item.files[1]
            });
        case 'CLEAR_TORRENT_FILES':
            return Object.assign({}, state, {
                currentTorrentFiles: null
            });
        default:
            return state;
    }
};