import { MenuTheme } from 'antd'

type MenuMode = 'horizontal' | 'vertical' | 'inline';
type themeStyle = {
    menuTheme: MenuTheme
    menuMode: MenuMode
    rightMenuModel: MenuMode
    slideWidth: number
    rightMenuTheme: MenuTheme
}


export const baseSetting = {
    projectName: 'WebGL Components',
    projectTitle: 'My Three.js Library',
    projectCopyright: 'My Three.js Library ©2024'
}

export const themeStyle: themeStyle = {
    menuTheme: 'dark',
    menuMode: 'horizontal',
    rightMenuModel: 'inline',
    slideWidth: 200,
    rightMenuTheme: 'light'
}

export const defaultActiveMenu = ['test-01']