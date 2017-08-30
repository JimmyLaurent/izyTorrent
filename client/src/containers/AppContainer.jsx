import React, { Component } from 'react';

import {
	Framework7App
} from 'framework7-react';


import { routes } from '../routes';
import { Provider } from 'react-redux'
import { store, framework7StateKernel } from '../store';

import { Views, View, Pages, Page } from 'framework7-react';
import { navigateTo } from 'framework7-redux';

import { TorrentSearchContainer } from '../containers/TorrentSearch/TorrentSearchContainer';
import { LeftPanelContainer } from '../containers/LeftPanel/LeftPanelContainer';
import { TorrentListContainer } from '../containers/TorrentList/TorrentListContainer';
import { loadTorrentList } from '../containers/TorrentList/TorrentListActions';

let framework7;
export const getFramework7 = () => framework7;

export class AppContainer extends Component {

	componentDidMount() {
		//store.dispatch(navigateTo('/search',true))
		store.dispatch(loadTorrentList());
		this.loadTorrentListInterval = setInterval(() => { store.dispatch(loadTorrentList()); }, 1000);
	}

	render() {
		return <Provider store={store}>
			<Framework7App
				themeType="material"
				routes={routes}
				router={false}
				stateKernel={framework7StateKernel}
				onFramework7Init={f7 => framework7 = f7}
			>
				<LeftPanelContainer></LeftPanelContainer>
				<Views>
					<View id="main-view" navbarThrough main url="/list">
						<Pages>
							<TorrentListContainer/>
						</Pages>
					</View>
				</Views>
			</Framework7App>
		</Provider>
	}
}