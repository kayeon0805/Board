import { observer } from "mobx-react";
import React from "react";
import { PaginationWrapper } from "./styled";
import Pagination from "react-js-pagination";
import { pageStore } from "../../store";

const Paging = ({ page, length, allPost }) => {
    const handlePageChange = (page) => {
        // 전체 게시글을 불러오는지 확인
        if (allPost) {
            pageStore.setPage(page);
        } else {
            // 사용자별 게시글
            pageStore.setUserPage(page);
        }
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
