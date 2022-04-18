export type UserType = {
    email: string;
    nickname: string;
};

export type CommentType = {
    PostId: number;
    User: UserType;
    UserId: number;
    content: string;
    createdAt: string;
    date: string;
    id: number;
    updatedAt: string;
};

export type ImageType = {
    id: number;
    src: string;
    PostId: number;
    createdAt: string;
    updatedAt: string;
};

export type PostType = {
    Comments: CommentType;
    User: UserType;
    UserId: number;
    content: string;
    count: number;
    date: string;
    id: number;
    title: string;
    Images: ImageType;
    createdAt: string;
    updatedAt: string;
};
