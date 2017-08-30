import { TorrentSearchContainer } from './containers/TorrentSearch/TorrentSearchContainer';
import { TorrentSearchDetailContainer } from './containers/TorrentSearchDetail/TorrentSearchDetailContainer';
import { TorrentListContainer } from './containers/TorrentList/TorrentListContainer';
import { TorrentDetailContainer } from './containers/TorrentDetail/TorrentDetailContainer';

export const routes = [{
    path: '/search',
    component: TorrentSearchContainer
}, {
    path: '/search-detail/',
    component: TorrentSearchDetailContainer
}, {
    path: '/list/',
    component: TorrentListContainer
}, {
    path: '/detail',
    component: TorrentDetailContainer
}];