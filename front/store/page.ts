import { observable } from "mobx";

const store = observable({
    page: 1,
    setPage: function (page: number) {
        this.page = page;
    },
    // 사용자별 게시글 불러올 때 페이지
    userPage: 1,
    setUserPage: function (page: number) {
        this.userPage = page;
    },
});

export default store;
