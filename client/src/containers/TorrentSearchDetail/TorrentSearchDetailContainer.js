import {connect} from 'react-redux';
import {TorrentSearchDetailPage} from './TorrentSearchDetailPage';
import {backSelected} from './TorrentSearchDetailActions';
import {downloadTorrent} from '../TorrentSearch/TorrentSearchActions';

const mapDispatchToProps = dispatch => {
	return {
		onBackSelected: () => dispatch(backSelected()),
    downloadTorrent: (torrent) => dispatch(downloadTorrent(torrent)),
	};
};

const mapStateToProps = (state) => ({
  html: state.torrentSearch.torrentDetailRawHtml,
  torrent: state.torrentSearch.currentSearchTorrent
});

export const TorrentSearchDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TorrentSearchDetailPage);