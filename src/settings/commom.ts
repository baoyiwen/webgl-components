import { MenuTheme } from 'antd'
import { PageMetaType } from '../types'

export type SubmenuMetaMap = {[key: string]: PageMetaType}

type MenuMode = 'horizontal' | 'vertical' | 'inline';
type themeStyle = {
    menuTheme: MenuTheme
    menuMode: MenuMode
    rightMenuModel: MenuMode
    slideWidth: number
    rightMenuTheme: MenuTheme,
    menuInlineIndent: number
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
    slideWidth: 240,
    menuInlineIndent: 10,
    rightMenuTheme: 'light'
}

export const defaultActiveMenu = ['test-01']

export const SubmenuMeta: SubmenuMetaMap = {
    webgl: {
        label: 'webgl', // label 需要与page中包名相同，不然会引起查找错误的情况。
        title: 'WebGL',
        path: '',
        icon: 'CodeSandboxOutlined'
    },
    webglDemo: {
        label: 'webglDemo',
        title: 'WebGL 实例',
        path: '',
        icon: 'CodeSandboxOutlined'
    }
}