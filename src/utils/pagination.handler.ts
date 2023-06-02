export const paginationHandler = (
  currPage: number,
  lastPage: number,
  pageName: string,
) => {
  const pageNumberList: number[] = [];
  let addFirstPageNumber = false;
  let addLastPageNumber = false;

  if (currPage > 4) {
    pageNumberList.push(currPage - 2, currPage - 1, currPage);
    addFirstPageNumber = true;
  } else {
    for (let i = 1; i <= currPage; i++) {
      pageNumberList.push(i);
    }
  }

  if (currPage + 3 < lastPage) {
    pageNumberList.push(currPage + 1, currPage + 2);
    addLastPageNumber = true;
  } else {
    for (let i = currPage + 1; i <= lastPage; i++) {
      pageNumberList.push(i);
    }
  }

  return {
    currPage,
    lastPage,
    pageNumberList,
    addFirstPageNumber,
    addLastPageNumber,
    pageName,
  };
};
