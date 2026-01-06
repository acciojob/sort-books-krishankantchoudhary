import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks, setSortBy, setOrder } from "./bookSlice";
import { selectSortedBooks } from "./selectors";

const BooksList = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectSortedBooks);
  const { loading, error } = useSelector(state => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error</p>;

  return (
    <>
      {/* SORT DROPDOWNS */}
      <select onChange={(e) => dispatch(setSortBy(e.target.value))}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <select onChange={(e) => dispatch(setOrder(e.target.value))}>
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>

      {/* BOOKS TABLE */}
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Publisher</th>
            <th>ISBN</th>
          </tr>
        </thead>
        <tbody>
          {books.map(book => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default BooksList;
