import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBooks = createAsyncThunk("books/fetchBooks", () => {
  return fetch(
    "https://api.nytimes.com/svc/books/v3/lists/overview.json?api-key=ITpCHamAdAqHI4wsoPTxWfnJMXyrYr3uJDv0f8GyEBwF688m"
  )
    .then((response) => response.json())
    .then((data) => data.results.lists[0].books.slice(0, 15));
});

const bookSlice = createSlice({
  name: "books",
  initialState: {
    sortBy: "title",
    order: "ascending",
    books: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSortBy(state, action) {
      state.sortBy = action.payload;
    },
    setOrder(state, action) {
      state.order = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBooks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.loading = false;
        state.books = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSortBy, setOrder } = bookSlice.actions;
export default bookSlice.reducer;
