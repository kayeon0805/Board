import { observable } from "mobx";

const store = observable({
    page: 1,
    setPage: function (page) {
        this.page = page;
    },
});

export default store;
