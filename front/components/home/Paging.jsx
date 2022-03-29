import { toJS } from "mobx";
import { observer } from "mobx-react";
import React from "react";
import { PaginationWrapper } from "./styled";
import Pagination from "react-js-pagination";
import { pageStore } from "../../store";

const Paging = ({ page, length }) => {
    const handlePageChange = (page) => {
        pageStore.setPage(page);
    };

    return (
        <PaginationWrapper>
            <Pagination
                activePage={page}
                itemsCountPerPage={10}
                totalItemsCount={length}
                pageRangeDisplayed={5}
                prevPageText="‹"
                nextPageText="›"
                onChange={handlePageChange}
            />
        </PaginationWrapper>
    );
};
export default observer(Paging);
