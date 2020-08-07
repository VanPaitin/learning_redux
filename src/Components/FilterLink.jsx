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

export default connect(mapStateToProps, mapDispatchToProps)(Link)
