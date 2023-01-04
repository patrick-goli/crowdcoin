import React from "react";
import { Menu } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

const Header = () => {
   function handleItemClick(){

    }
    return <Menu style={{marginTop: '20px'}}>
        <Menu.Item
        name='home'
        content='Home'
        onClick={handleItemClick}
        />

        <Menu.Item
        name='reviews'
        content='Reviews'
        onClick={handleItemClick}
        />

        <Menu.Item
        name='upcomingEvents'
        content='Upcoming Events'
        onClick={handleItemClick}
        />
    </Menu>

};
export default Header;