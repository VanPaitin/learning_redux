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

export default class FilterLink extends React.Component {
  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.forceUpdate())
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const { filter, children } = this.props;
    const { visibilityFilter } = store.getState();

    return (
      <Link
        active={
          filter === visibilityFilter
        }
        onClick={() => store.dispatch({ type: 'SET_VISIBILITY_FILTER', filter: filter })}>
        {children}
      </Link>
    )
  }
}
