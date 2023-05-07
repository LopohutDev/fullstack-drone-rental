import React from "react";

interface ComponentProps {
  currentPage: number;
  totalCount: number;
  siblingCount?: number;
  pageSize: number;
  onPageChange: (value: number) => void;
  label?: string;
  className?: string;
  children?: JSX.Element | JSX.Element[];
}

export const PaginationContainer: React.FC<ComponentProps> = ({
  children,
  totalCount,
  siblingCount = 1,
  pageSize,
  currentPage,
  onPageChange,
  label = "Custom label",
  className,
}) => {
  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  return (
    <div className={className}>
      <div className={""}>{children}</div>
      {currentPage === 0 || paginationRange.length < 2 ? null : (
        <div className={"flex justify-between"}>
          <span className={""}>
            Total number of {label}: {totalCount}
          </span>
          <ul className={"flex items-center"}>
            {currentPage > 1 && (
              <li
                className={`${"p-4 text-[#F4511E]"} cursor-pointer`}
                onClick={onPrevious}
              >
                Prev
              </li>
            )}
            <div className={"flex"}>
              {paginationRange &&
                paginationRange.map((pageNumber) => {
                  if (pageNumber === DOTS) {
                    return (
                      <li className={`${""}`} key={pageNumber}>
                        <div className={""}>
                          <span>&#8230;</span>
                        </div>
                      </li>
                    );
                  }
                  const numLength = pageNumber.toString().length;
                  let numStyle = { width: 32 };
                  if (numLength > 2) numStyle = { width: 32 + numLength * 8 };
                  return (
                    <li
                      className={`${"mx-1"}`}
                      onClick={() => onPageChange(pageNumber)}
                      key={pageNumber}
                    >
                      <div
                        className={`${"border rounded-full px-2 py-1 flex items-center justify-center cursor-pointer"} ${
                          parseInt(pageNumber, 10) === currentPage &&
                          "bg-[#F4511E] text-white"
                        }`}
                        style={numStyle}
                      >
                        <span>{pageNumber}</span>
                      </div>
                    </li>
                  );
                })}
            </div>
            {currentPage <= totalCount / pageSize && (
              <li
                className={`${"p-4 text-[#F4511E]"} ${"cursor-pointer"}`}
                onClick={onNext}
              >
                Next
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export const DOTS = "...";

const range = (start: any, end: any) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

const usePagination = ({
  totalCount,
  pageSize,
  siblingCount = 1,
  currentPage,
}: {
  totalCount: number;
  pageSize: number;
  siblingCount: number;
  currentPage: number;
}) => {
  const paginationRange = React.useMemo(() => {
    const totalPageCount = Math.ceil(totalCount / pageSize);

    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPageCount) {
      return range(1, totalPageCount);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(
      currentPage + siblingCount,
      totalPageCount
    );

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPageCount - 2;

    const firstPageIndex = 1;
    const lastPageIndex = totalPageCount;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = range(1, leftItemCount);

      return [...leftRange, DOTS, totalPageCount];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = range(
        totalPageCount - rightItemCount + 1,
        totalPageCount
      );
      return [firstPageIndex, DOTS, ...rightRange];
    }

    if (shouldShowLeftDots && shouldShowRightDots) {
      const middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
    }
    return [];
  }, [totalCount, pageSize, siblingCount, currentPage]);

  return paginationRange;
};
