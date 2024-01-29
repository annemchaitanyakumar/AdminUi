import React from "react";
import "./Pagination.css";

function Pagination({
  usersPerPage,
  totalUsers,
  currentPage,
  handlePageChange,
}) {
  const pageNumbers = [];
  const totalPages = Math.ceil(totalUsers / usersPerPage);

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      <ul>
        <li>
          <button
            class="pagebuttons"
            onClick={() => handlePageChange(1)}
            className={currentPage === 1 ? "active" : ""}
          >
            First Page
          </button>
        </li>
        <li>
          <button
            class="pagebuttons"
            onClick={() => handlePageChange(currentPage - 1)}
            className={currentPage === 1 ? "disabled" : ""}
          >
            &laquo;
          </button>
        </li>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              class="pagebuttons"
              onClick={() => handlePageChange(number)}
              className={currentPage === number ? "active" : ""}
            >
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            class="pagebuttons"
            onClick={() => handlePageChange(currentPage + 1)}
            className={currentPage === totalPages ? "disabled" : ""}
          >
            &raquo;
          </button>
        </li>
        <li>
          <button
            class="pagebuttons"
            onClick={() => handlePageChange(totalPages)}
            className={currentPage === totalPages ? "active" : ""}
          >
            Last Page
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
