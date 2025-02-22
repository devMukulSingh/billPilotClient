

export type TDomain = {
    id:string ,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    name: string,
    user_id: string
}

export type TDistributor = {
    id: string,
    created_at: string,
    updated_at: string,
    deleted_at: string,
    name: string,
    user_id: string
    domain_id : string,
}