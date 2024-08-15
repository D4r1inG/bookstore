import { Pagination } from '@/UI';
import type { PaginationProps } from '@/UI';
import { memo } from 'react';

interface IPagination {
  total: number;
  page: number;
  setPage: () => void;
}

const PaginationComponent = ({ total, page, setPage }: IPagination) => {
  const itemRender: PaginationProps['itemRender'] = (_, type, originalElement) => {
    if (type === 'prev') {
      return (
        <div className="rounded border border-solid px-3 border-primary">
          <span>Prev</span>
        </div>
      );
    }
    if (type === 'next') {
      return (
        <div className="rounded border border-solid px-3 border-primary">
          <span>Next</span>
        </div>
      );
    }
    return originalElement;
  };

  return (
    <div className="pagination-container">
      <Pagination
        className="gsx-pagination"
        itemRender={itemRender}
        onChange={setPage}
        current={page}
        total={total}
        pageSize={10}
      />
    </div>
  );
};
export default memo(PaginationComponent);
