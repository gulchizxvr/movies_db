export interface IProfile {
    avatar: {
        tmdb: {
            avatar_path:string
        }
    } | null
    username: string | null
}