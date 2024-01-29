import ReactPaginate from 'react-paginate';
import styles from './Pagination.module.scss';
import { FC } from 'react';

type PaginationProps = {
  currentPage: number;
  onChangePage: (page: number) => void;
};

const Pagination: FC<PaginationProps> = ({ currentPage, onChangePage }) => {
  return (
    <ReactPaginate
      className={styles['pagination']}
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onChangePage(event.selected + 1)}
      pageRangeDisplayed={4}
      pageCount={3}
      forcePage={currentPage - 1}
    />
  );
};

export default Pagination;
