import React from "react";
import { useRouter } from "next/router";
import { Menu, Icon } from 'semantic-ui-react';
import Link from 'next/link';
import 'semantic-ui-css/semantic.min.css'

const Header = () => {
    const router = useRouter();

    return (
        <Menu style={{ marginTop: '10px' }}>
            <Link href='/'>
                <a className="item">CrowdFundme</a>
            </Link>
            
            <Menu.Menu position="right">
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