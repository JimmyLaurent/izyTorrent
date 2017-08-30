const STATUS = {
    STATE_STARTED: 1,
    STATE_CHECKING: 2,
    STATE_ERROR: 16,
    STATE_PAUSED: 32,
    STATE_QUEUED: 64
}

export const getStatusLabel = (status, percentProgress) => {
    let label = '';
    if (status & STATUS.STATE_PAUSED) {
        if (status & STATUS.STATE_CHECKING) {
            label = 'Checking';
        }
        else {
            label = 'Paused';
        }
    }
    else {
        if (status & STATUS.STATE_STARTED) {
            label = (percentProgress == 1000) ? 'Seeding' : 'Downloading';
        }
        else {
            if (status & STATUS.STATE_CHECKING) {
                label = 'Checking';
            }
            else {
                if (status & STATUS.STATE_ERROR) {
                    label = 'Error';
                }
                else {
                    if (status & STATUS.STATE_QUEUED) {
                        label = 'Queued';
                    }
                    else {
                        if (percentProgress == 1000) {
                            label = 'Finished';
                        }
                        else {
                            label = 'Stopped';
                        }
                    }
                }
            }
        }
    }
    return label;
}

// 0 = Don't Download
// 1 = Low Priority
// 2 = Normal Priority
// 3 = High Priority

export const getPriorityLabel = (priority) => {
    if (priority === 0) {
        return 'skip';
    }
    else if (priority === 1) {
        return 'low';
    }
    else if (priority === 2) {
        return 'normal';
    }
    else if (priority === 3) {
        return 'high';
    }
};

export const humanizeSize = (bytes) => {
    let val;
    let uom;

    if (bytes < 1024) {
        val = bytes;
        uom = 'B';
    } else if (bytes < 1048576) {
        val = (bytes / 1024).toFixed(1);
        uom = 'KB';
    } else if (bytes < 1073741824) {
        val = (bytes / 1048576).toFixed(1);
        uom = 'MB';
    } else {
        val = (bytes / 1073741824).toFixed(1);
        uom = 'GB';
    }
    return [val, uom].join(' ');
};


const iv = (val) => {
    var v = (val == null) ? 0 : parseInt(val + "");
    return (isNaN(v) ? 0 : v);
}

export const humanizeTime = (tm, noRound) => {
    let ret = '';
    if ((noRound == null) && (tm >= 2419200))
        return "\u221e";
    //		var val = tm % (604800 * 52);
    var val = tm;
    var w = iv(val / 604800);
    val = val % 604800;
    var d = iv(val / 86400);
    val = val % 86400;
    var h = iv(val / 3600);
    val = val % 3600;
    var m = iv(val / 60);
    val = iv(val % 60);
    var v = 0;
    if (w > 0) {
        ret = w + 'w ';
        v++;
    }
    if (d > 0) {
        ret += d + 'd ';
        v++;
    }
    if ((h > 0) && (v < 2)) {
        ret += h + 'h ';
        v++;
    }
    if ((m > 0) && (v < 2)) {
        ret += m + 'm ';
        v++;
    }
    if (v < 2)
        ret += val + 's ';
    return (ret.substring(0, ret.length - 1));
}

const isLabelIncludedInFilter = (label, filter) => {
    if ((filter === 'all') ||
        (filter === 'downloading' && label === 'Downloading') ||
        (filter === 'seeding' && label === 'Seeding') ||
        (filter === 'active' && ['Checking', 'Downloading'].includes(label)) ||
        (filter === 'inactive' && ['Paused', 'Error', 'Finished', 'Stopped', 'Queued'].includes(label))
    ) {
        return true;
    }
    return false;
}

const filterTorrent = (torrent, filter) => {
    let label = getStatusLabel(torrent.status, torrent.percentProgress);
    return isLabelIncludedInFilter(label, filter);
}

export const filterTorrents = (torrents, filter) => {
    let filteredTorrents = {};
    if (torrents) {
        return Object.keys(torrents)
            .filter(key => filterTorrent(torrents[key], filter))
            .map(key => torrents[key]);
    }
    else {
        return torrents;
    }
}

export const calculateDownloadSpeed = (torrents) => {
    let downloadSpeed = 0;
    Object.keys(torrents)
        .map(key => downloadSpeed += torrents[key].downloadSpeed);
    return downloadSpeed;
}

export const calculateUploadSpeed = (torrents) => {
    let uploadSpeed = 0;
    Object.keys(torrents)
        .map(key => uploadSpeed += torrents[key].uploadSpeed);
    return uploadSpeed;
}
