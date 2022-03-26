import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import Pagination from "react-js-pagination";
import { pageStore, postStore } from "../store";

const Paging = ({ page }) => {
    const handlePageChange = (page) => {
        pageStore.setPage(page);
    };

    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={10}
            totalItemsCount={toJS(postStore.posts.length)}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
        />
    );
};
export default observer(Paging);
