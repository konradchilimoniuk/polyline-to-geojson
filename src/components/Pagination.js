import React, { useState } from 'react'

const range = (start, end) => {
    return new Array(end - start + 1).fill().map((_, index) => start + index);
}

const createPagination = (pageNeighbours, totalPages, currentPage) => {
    const innerPages = pageNeighbours * 2 + 3;
    const visiblePages = innerPages + 2;

    if(totalPages > visiblePages) {
        const startPage = Math.max(2, currentPage - pageNeighbours);
        const endPage = Math.min(totalPages - 1, currentPage + pageNeighbours);

        let pages = range(startPage, endPage);

        const hiddenLeftPages = startPage > 2;
        const hiddenRightPages = (totalPages - endPage) > 1;
        const pagesOffset = innerPages - (pages.length + 1);

        switch(true) {
            case (!hiddenLeftPages && hiddenRightPages): {
                let extraPages = range(endPage + 1, endPage + pagesOffset);
                pages = [...pages, ...extraPages, 'RIGHT']
                break;
            }

            case (hiddenLeftPages && !hiddenRightPages): {
                let extraPages = range(startPage - pagesOffset, startPage - 1);
                pages = ['LEFT', ...extraPages, ...pages]
                break;
            }

            case (hiddenLeftPages && hiddenRightPages):
            default: {
                pages = ['LEFT', ...pages, 'RIGHT'];
                break;
            }
        }

        return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
}

const handleJumpTo = (e, setPage, setJumpToPage, totalPages) => {
    console.log(e.type)
    e.preventDefault();
    var value = parseInt(e.target.value);

    if(e.type === 'blur' || e.key === 'enter') {
        if(value > totalPages) value = totalPages;
        if(value < 1) value = 1;
        !isNaN(value) && setPage(value);
        setJumpToPage('');
        return;
    }

    console.log(value);
    !isNaN(value) ? setJumpToPage(value) : setJumpToPage('');
}

export default function Pagination({ currentPage, totalPages, rowsPerPage, setPage, setRowsPerPage }) {
    const [pageNeighbours] = useState(1);
    const [jumpToPage, setJumpToPage] = useState('');
    const pages = createPagination(pageNeighbours, totalPages, currentPage);

    return (
        <div className="pagination">
            {pages.map(page => {
                if(page === 'LEFT') return <button className="arrow" onClick={() => setPage(currentPage - pageNeighbours - 1)} key={page}>←</button>
                if(page === 'RIGHT') return <button className="arrow" onClick={() => setPage(currentPage + pageNeighbours + 1)} key={page}>→</button>
                return <button className={page === currentPage ? 'active' : undefined} onClick={() => setPage(page)} key={page}>{page}</button>
            })}
            <div className="select-wrapper fit-content">
                <select value={rowsPerPage} onChange={e => setRowsPerPage(parseInt(e.target.value))}>
                    <option value={20}>20/page</option>
                    <option value={50}>50/page</option>
                    <option value={100}>100/page</option>
                </select>
            </div>
            <span className="desc">Jump To:</span>
            <input type="number" min={1} max={totalPages} value={jumpToPage} onChange={e => handleJumpTo(e, setPage, setJumpToPage, totalPages)} onBlur={e => handleJumpTo(e, setPage, setJumpToPage, totalPages)} />
        </div>
    )
}
