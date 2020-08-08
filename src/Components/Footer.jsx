const Link = ({ active, children, onClick }) => {
  return active ? <span>{children}</span> :
    <a
      href='#'
      onClick={e => {
        e.preventDefault();
        onClick()
      }} >
      {children}
    </a>
}

const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter
})

const mapStateToProps = (state, { filter }) => ({
  active: filter === state.visibilityFilter
})

const mapDispatchToProps = (dispatch, { filter }) => ({
  onClick: () => dispatch(setVisibilityFilter(filter))
})

const { connect } = ReactRedux;

const FilterLink = connect(mapStateToProps, mapDispatchToProps)(Link)

export default () =>
  <p>
    Show:
    {'  '}
    <FilterLink filter='SHOW_ALL'>All</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_ACTIVE'>Active</FilterLink>&nbsp;&nbsp;
    <FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>&nbsp;&nbsp;
  </p>
