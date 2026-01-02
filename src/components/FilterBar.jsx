function FilterBar({
  filter,
  setFilter,
  sortOrder,
  setSortOrder,
  onClearAll,
}) {
  return (
    <div className="controls">
      <label>
        Filter:
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="All">All</option>
          <option value="Applied">Applied</option>
          <option value="Interview">Interview</option>
          <option value="Rejected">Rejected</option>
        </select>
      </label>

      <label>
        Sort:
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="latest">Latest</option>
          <option value="oldest">Oldest</option>
        </select>
      </label>

      <button onClick={onClearAll}>Clear All</button>
    </div>
  );
}

export default FilterBar;
