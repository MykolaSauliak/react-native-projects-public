
export interface SearchItem {
    id:string,
    title: string,
    searchState: any,
}

export interface SearchState {
    refinementList?: {
        [key:string] : any
    },
    range?: any,
    query?: string,
}