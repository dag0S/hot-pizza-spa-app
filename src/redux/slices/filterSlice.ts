import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SortItem {
  name: string;
  sort: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
}

export interface FilterSliceState {
  categoryId: number;
  currentPage: number;
  searchValue: string;
  sort: SortItem;
}

const initialState: FilterSliceState = {
  categoryId: 0,
  currentPage: 1,
  searchValue: '',
  sort: {
    name: 'популярности ↑',
    sort: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSort(state, action: PayloadAction<SortItem>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<FilterSliceState>) {
      state.currentPage = +action.payload.currentPage;
      state.sort = action.payload.sort;
      state.categoryId = +action.payload.categoryId;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload
    }
  },
});

export const { setCategoryId, setSort, setCurrentPage, setFilters, setSearchValue } = filterSlice.actions;

export default filterSlice.reducer;
