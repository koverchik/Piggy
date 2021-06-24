import * as React from 'react';

interface Pagination extends React.HTMLAttributes<HTMLDivElement>{
    arrayNumber : number[],
    activeNumber: number,
    callbackPaginationArray(event: Event| null): void;
    callbackPaginationLeft(): void;
    callbackPaginationRight(): void;
}
export default Pagination;
