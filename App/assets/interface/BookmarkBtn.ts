export interface IBookmarkList {
    text: string,
    element: JSX.Element,
    isActive?: boolean
}
export interface IBookmarkEl extends IBookmarkList {
    setActive: (any:any)=> void
}