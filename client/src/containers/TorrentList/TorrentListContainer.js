import { connect } from 'react-redux';
import { TorrentListPage } from './TorrentListPage';
import { loadTorrentList, toggleTorrentState, removeTorrent, removeTorrentAndDatas, goToDetail } from './TorrentListActions';
import { getStatusLabel, calculateDownloadSpeed, calculateUploadSpeed, filterTorrents } from '../../utils/utils';

const mapDispatchToProps = dispatch => {
    return {
        loadTorrentList: () => dispatch(loadTorrentList()),
        toggleTorrentState: (hash) => dispatch(toggleTorrentState(hash)),
        removeTorrent: (hash) => dispatch(removeTorrent(hash)),
        removeTorrentAndDatas: (hash) => dispatch(removeTorrentAndDatas(hash)),
        goToDetail: (hash) => dispatch(goToDetail(hash))
    };
};

const mapStateToProps = (state) => ({
    torrents: filterTorrents(state.torrentList.torrents, state.torrentList.filter),
    downloadSpeed: state.torrentList.torrents ? calculateDownloadSpeed(state.torrentList.torrents) : undefined,
    uploadSpeed: state.torrentList.torrents ? calculateUploadSpeed(state.torrentList.torrents) : undefined,
    filter: state.torrentList.filter,
    connected: state.torrentList.connected
});

export const TorrentListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TorrentListPage);