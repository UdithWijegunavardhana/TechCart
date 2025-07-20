import {RootState} from '../../../redux/store';

export const selectHomeProducts = (state: RootState) => state.home.items;
export const selectHomeLoading = (state: RootState) => state.home.loading;
export const selectHomeError = (state: RootState) => state.home.error;
