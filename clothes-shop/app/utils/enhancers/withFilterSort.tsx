import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  setSortedBy, 
  toggleFilter,
  toggleSort,
  resetSort,
  resetFilter,
  applyFilters,
  applySort
} from '../../features/filtersort/actions';
import {sort} from '../../features/filtersort/operations';
import {
  getSortedBy, 
  getAppliedFilters,
  getNotAppliedFilters,
  getAppliedSort,
  getNotAppliedSort
} from '../../features/filtersort/selectors';

const withFilterSort = ({listName = 'default'}) => BaseComponent => props => {
  const dispatch = useDispatch();
  // let sortedBy = useSelector((state: any) => getSortedBy(state, listName));
  let appliedFilters = useSelector((state: any) => getAppliedFilters(state)) || {}
  let notAppliedFilters = useSelector((state: any) => getNotAppliedFilters(state)) || {}
  let appliedSort = useSelector((state: any) => getAppliedSort(state)) || {}
  let notAppliedSort = useSelector((state: any) => getNotAppliedSort(state)) || {}
  return (
    <BaseComponent
      {...props}
      // sortedBy={sortedBy}
      appliedFilters={appliedFilters}
      notAppliedFilters={notAppliedFilters}
      appliedSort={appliedSort}
      notAppliedSort={notAppliedSort}
      isSortActive={(item : string) => notAppliedSort[item]}
      sortBy={items => sort(items, sortedBy)} // return array
      setSortedBy={sortBy => dispatch(setSortedBy(sortBy, listName))}
      toggleFilter={(field : string, value : string | number) : void => dispatch(toggleFilter(field, value))}
      toggleSort={(field : string) : void => dispatch(toggleSort(field))}
      resetFilter={() : void => dispatch(resetFilter())}
      resetSort={() : void => dispatch(resetSort())}
      applyFilters={() : void => dispatch(applyFilters())}
      applySort={() : void => dispatch(applySort())}
    />
  );
};

export default withFilterSort;
