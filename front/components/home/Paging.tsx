import { observer } from "mobx-react";
import React from "react";
import { PaginationWrapper } from "./styled";
import Pagination from "react-js-pagination";
import { pageStore } from "../../store";

type PageingProps = {
    page: number;
    length: number;
};

const Paging = ({ page, length }: PageingProps) => {
    const handlePageChange = (page: number) => {
        pageStore.setPage(page);

        // 사용자별 게시글
        pageStore.setUserPage(page);
        // 검색한 게시글
        pageStore.setUserPage(page);
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
