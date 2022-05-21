import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { ReducerType } from '../app/rootReducer';

export const useTypedSelector: TypedUseSelectorHook<ReducerType> = useSelector;
