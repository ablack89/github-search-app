'use strict';

const e = React.createElement;


function performSearch(query) {
  var request = new XMLHttpRequest();
  request.open('GET', '/api/search?q=' + encodeURI(query), true);
  request.onload = function () {
    const updatedResultsTable = <RepositoriesTable searchResult={JSON.parse(this.response)}/>
    ReactDOM.render(updatedResultsTable, document.querySelector('#main-container'));
  }
  request.send();
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    performSearch(this.state.value);
    event.preventDefault();
  }

  render() {
    return (
      <form class="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit}>
        <input class="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" value={this.state.value} onChange={this.handleChange} />
        <input type="submit" value="Search"  class="btn btn-outline-success my-2 my-sm-0" type="submit"/>
      </form>
    );
  }
}

const searchForm = document.querySelector('#search-form');
ReactDOM.render(e(SearchForm),searchForm);
