import ReactPaginate from "react-paginate";
import type { ReactPaginateProps } from "react-paginate";
import css from "@/components/Pagination/Pagination.module.css";

interface PaginationProps {
  pageCount: number;
  currentPage: number;
  onPageChange: (selectedPage: number) => void;
}
const PaginationProps: ReactPaginateProps = {
  pageCount: 0,
  pageRangeDisplayed: 5,
  marginPagesDisplayed: 2,
  previousLabel: "<",
  nextLabel: ">",
  breakLabel: "...",
  containerClassName: css.pagination,
  activeClassName: css.active,
};
export const Pagination = ({
  pageCount,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  return (
    <ReactPaginate
      forcePage={currentPage - 1}
      pageCount={pageCount}
      onPageChange={(event: { selected: number }) =>
        onPageChange(event.selected + 1)
      }
      containerClassName={css.pagination}
      activeClassName={css.active}
      previousLabel="<"
      nextLabel=">"
    />
  );
};

export default Pagination;
