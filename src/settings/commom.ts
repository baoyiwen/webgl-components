import { MenuTheme } from 'antd'

type MenuMode = 'horizontal' | 'vertical' | 'inline';
type themeStyle = {
    menuTheme: MenuTheme
    menuMode: MenuMode
}


export const baseSetting = {
    projectName: 'WebGL Components'
}

export const themeStyle: themeStyle = {
    menuTheme: 'dark',
    menuMode: 'horizontal'
}

export const defaultActiveMenu = ['test-01']