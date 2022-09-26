import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from 'src/constants';
import { Article, ArticlesState } from './types';

const initialState: ArticlesState = {
  articles: [],
  loading: false,
  error: '',
};

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    addArticles: (state, action: PayloadAction<Article[]>) => {
      state.articles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.pending, (state) => {
      state.loading = true;
      state.error = '';
    });
    builder.addCase(
      fetchData.fulfilled,
      (state, action: PayloadAction<Article[]>) => {
        state.articles = action.payload;
        state.loading = false;
      }
    );
    builder.addCase(fetchData.rejected, (state, action: { error: any }) => {
      state.error = action.error.message;
      state.loading = false;
    });
  },
});

// Thunk
export const fetchData = createAsyncThunk('artiles/fetchArticles', async () => {
  const response = await fetch(`${api}/v3/articles`);
  return response.json();
});

export const { addArticles } = articlesSlice.actions;
export const articlesReducer = articlesSlice.reducer;
