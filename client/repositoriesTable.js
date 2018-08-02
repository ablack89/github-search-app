'use strict';

class RepositoriesTable extends React.Component {
  render() {
    if(this.props.searchResult) {
      var resultRows = this.props.searchResult.repositories.map((respository, index) =>
        <tr key={index}><td>{respository.name}</td><td>{respository.stars}</td><td>{respository.forks}</td><td><a href={respository.url} class="badge badge-primary" target="_blank">Open</a></td></tr>
      );
    }
    return (
      <div className="shopping-list">
        <table class="table">
          <tbody>
            <tr><th>Name</th><th>Stars</th><th>Forks</th><th>Link</th></tr>
            {resultRows}
          </tbody>
        </table>
      </div>
    );
  }
}
