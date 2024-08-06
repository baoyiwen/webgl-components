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

// 基础设置，项目的基本配置。如：标题、title、copyright等
export const baseSetting = {
    projectName: 'WebGL Components',
    projectTitle: 'My Three.js Library',
    projectCopyright: 'My Three.js Library ©2024'
}

// 左侧菜单的基本配置。
export const themeStyle: themeStyle = {
    menuTheme: 'dark',
    menuMode: 'horizontal',
    rightMenuModel: 'inline',
    slideWidth: 240,
    menuInlineIndent: 10,
    rightMenuTheme: 'light'
}

// 默认选中的菜单。
export const defaultActiveMenu = ['test-01']

// 二级菜单的配置映射表。
export const SubmenuMeta: SubmenuMetaMap = {
    webgl: {
        label: 'webgl', // label 需要与page中包名相同，不然会引起查找错误的情况。
        title: 'WebGL',
        path: '',
        icon: 'CodeSandboxOutlined'
    },
    map: {
        label: 'map demo',
        title: 'Map 实例',
        path: '',
        icon: 'CodeSandboxOutlined'
    }
}