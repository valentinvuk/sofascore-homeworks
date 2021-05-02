import React from "react";
import useShow from "../hooks/useShow";

function Filters({ filter, setFilter }) {
  const [show, setShow] = useShow(false);

  const handleFilter = React.useCallback((i) => setFilter(i), [setFilter]);

  return (
    <div className="filters-container">
      <button onClick={setShow} className="filter-button">
        # SHOW FILTERS
      </button>
      {show ? (
        <div className="filters">
          <button
            onClick={() => handleFilter(0)}
            className={filter === 0 ? "active filter-button" : "filter-button"}
          >
            ALL
          </button>
          <button
            onClick={() => handleFilter(1)}
            className={filter === 1 ? "active filter-button" : "filter-button"}
          >
            COMPLETED
          </button>
          <button
            onClick={() => handleFilter(2)}
            className={filter === 2 ? "active filter-button" : "filter-button"}
          >
            NOT COMPLETED
          </button>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Filters;
