import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { PaginationWrapper } from "./styled";
import Pagination from "react-js-pagination";
import { pageStore, postStore } from "../../store";

const Paging = ({ page }) => {
    const handlePageChange = (page) => {
        pageStore.setPage(page);
    };

    return (
        <PaginationWrapper>
            <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={toJS(postStore.posts.length)}
                pageRangeDisplayed={5}
                prevPageText="‹"
                nextPageText="›"
                onChange={handlePageChange}
            />
        </PaginationWrapper>
    );
};
export default observer(Paging);
