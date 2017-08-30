import React from 'react';
import { Page, Navbar, NavLeft, NavCenter, NavRight, Link, Icon } from 'framework7-react';

export const TorrentSearchDetailPage = (props, context) => {
    return (
        <Page>
            <Navbar>
                <NavLeft backLink onBackClick={props.onBackSelected} sliding></NavLeft>
                <NavCenter></NavCenter>
                <NavRight>
                    <Link onClick={() => props.downloadTorrent(props.torrent)}>
                        <Icon material="file_download"></Icon>
                    </Link>
                </NavRight>
            </Navbar>
            <div dangerouslySetInnerHTML={{ __html: props.html }} />
        </Page>
    );
};
