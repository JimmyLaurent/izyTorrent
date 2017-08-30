import { connect } from 'react-redux';
import { TorrentDetailPage } from './TorrentDetailPage';
import { goToDetail, backSelected, loadTorrentFiles, setFilePriority } from './TorrentDetailActions';

const mapDispatchToProps = dispatch => {
    return {
        onBackSelected: () => dispatch(backSelected()),
        loadTorrentFiles: () => dispatch(loadTorrentFiles()),
        setFilePriority: (hash, fileIndex, priority) => dispatch(setFilePriority(hash, fileIndex, priority))
    };
};

const mapStateToProps = (state) => ({
    torrent: state.torrentList.torrents[state.torrentList.currentTorrentHash],
    files: state.torrentList.currentTorrentFiles
});

export const TorrentDetailContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TorrentDetailPage);