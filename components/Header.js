import React from "react";
import { useRouter } from "next/router";
import Link from 'next/link';
import { Menu, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

const Header = () => {

    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link href='/'>
                <a className="item">Home</a>
            </Link>
            
            <Menu.Menu position="right">
                <Menu.Item>
                    <Link href="#">
                            <a className="item">News</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="#">
                            <a className="item">Carrers</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/">
                            <a className="item">Campaigns</a>
                    </Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/campaigns/new">
                        <a className="item"><Icon name="add circle" /></a>
                    </Link>
                </Menu.Item>
            </Menu.Menu>
        </Menu>
    )

};
export default Header;