export interface SidebarProps {
    sections: Array<SidebarLink>
}

export interface SidebarLink {
    id: string,
    type: string,
    url: string,
    text: string,
    subtext: string
}