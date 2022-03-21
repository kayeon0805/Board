import { observer } from "mobx-react";
import React, { useState } from "react";
import Pagination from "react-js-pagination";
import { postStore } from "../store";

const Paging = ({ page, setPage }) => {
    const handlePageChange = (page) => {
        setPage(page);
    };

    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={5}
            totalItemsCount={postStore.posts.length}
            pageRangeDisplayed={5}
            prevPageText="‹"
            nextPageText="›"
            onChange={handlePageChange}
        />
    );
};
export default observer(Paging);
