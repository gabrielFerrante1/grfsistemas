import { Api } from "./Api"

type CommentDate = {
    date: number,
    date_type: string
}

type CommentUser = {
    avatar: string,
    name: string
}

export type CommentEdit = {
    stars: number,
    body: string
}

export type OneComment = {
    id: number,
    stars: number,
    body: string,
    date: CommentDate,
    countLikes: number,
    countDisLikes: number,
    user: CommentUser,
    likedUser: boolean,
    dislikedUser: boolean 
}

export interface ApiPropsComments extends Api {
    countComments: number,
    comments: OneComment[],
    newComment: boolean,
    editComment: CommentEdit
}