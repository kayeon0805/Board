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
    // 검색한 게시글 불러올 때 페이지
    searchPage: 1,
    setSearchrPage: function (page: number) {
        this.searchPage = page;
    },
});

export default store;
