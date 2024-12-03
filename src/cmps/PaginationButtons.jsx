

export function PaginationButtons({ pageIdx, setPageIdx, toysLength }) {
  return (
    <div className="pagination">
      <button onClick={() => setPageIdx(pageIdx - 1)} disabled={pageIdx === 0}>
        Previous
      </button>
      {pageIdx + 1}
      <button onClick={() => setPageIdx(pageIdx + 1)} disabled={toysLength < 3}>
        Next
      </button>
    </div>
  )
}
