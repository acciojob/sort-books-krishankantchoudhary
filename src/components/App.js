import React from "react";
import "./../styles/App.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectSortedBooks } from "./selectors.js";
import { fetchBooks, setSortBy, setOrder } from "./bookSlice.js";

const App = () => {
  const dispatch = useDispatch();
  const books = useSelector(selectSortedBooks);
  const { loading, error } = useSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error</p>;
  }

  return (
    <div>
      <select onChange={(e) => dispatch(setSortBy(e.target.value))}>
        <option value="title">Title</option>
        <option value="author">Author</option>
        <option value="publisher">Publisher</option>
      </select>

      <select onChange={(e) => {console.log(e.target.value);
        dispatch(setOrder(e.target.value))}}
        >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>

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
          {books.map((book) => (
            <tr key={book.primary_isbn13}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publisher}</td>
              <td>{book.primary_isbn13}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
