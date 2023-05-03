const Pagination = ({ birthdaysPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / birthdaysPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav className="pagination text-center">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <a onClick={() => paginate(number)} href="!#" className="page-link">
            {number}
          </a>
        </li>
      ))}
    </nav>
  );
};

export default Pagination;
