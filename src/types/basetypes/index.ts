import { ReactNode } from "react"

export type PageMetaType = {
    label: string
    path: string
    children?: PageMetaType[]
    default?: boolean
    content?: ReactNode
}