import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import { useNavigate } from 'react-router-dom';
import customData from '../../assets/menuTemp/json menu.json';

function MainMenu () {

    const [itemsMenu, setItemsMenu] = useState([]);
    const navigate = useNavigate();

    const menuData = customData;

    const createMenuItems = () => {
        const createItemsMenu = menuData.map((item) => ({
            label: item?.title,
            key: item?.url,
            url: item?.url,
            children:item?.submenu.map((subMenu) => ({
                label: subMenu.title,
                key: subMenu?.url,
                url: subMenu?.url,
            }))
        }))
        setItemsMenu(createItemsMenu);
    };

    const onClick = (e) => {
        navigate(e.key, { replace: true });
      };

    useEffect(() => {
        createMenuItems();
    },[]);

    return (
        <Menu
            mode='horizontal'
            items = {itemsMenu}
            onClick={onClick}
            expandIcon
            // items={[
            //     {
            //         label: 'Opcion 1',
            //         key: 'Opcion 1'
            //     },
            //     {
            //         label: 'Opcion 2',
            //         key: 'Opcion 3'
            //     },
            // ]}
         />
    )
}

export default MainMenu;