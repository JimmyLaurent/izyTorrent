import React from 'react';
import {
	Panel, View, Navbar, Pages, Page, ContentBlockTitle, List, ListItem, ListItemContent, Link, ListButton, Badge
} from 'framework7-react';

import { navigateTo } from 'framework7-redux';


export const LeftPanel = (props, context) => (
	<Panel left reveal>
		<View id="left-panel-view" navbarThrough dynamicNavbar="true">
			<Pages>
				<Page>
					<Navbar title="izyTorrent" />
					<ContentBlockTitle>Torrents</ContentBlockTitle>
					<List>
						{
							props.torrentCategories.map(c => 
								<ListItem link linkClosePanel title={c.label} onClick={() => props.filterAndNavigateToTorrentList(c.filter)}></ListItem>
							)
						}
					</List>
					<ContentBlockTitle>Other</ContentBlockTitle>
					<List>
						<ListItem link linkClosePanel title="Search torrent" onClick={() => props.navigateTo('/search/')}></ListItem>
					</List>
				</Page>
			</Pages>
		</View>
	</Panel>
);