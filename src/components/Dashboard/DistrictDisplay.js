import React, { Component } from "react";
import { getDistricts } from "udistricts";
import "./dashboard.css";
import Loader from "../Loader/Spinner.js";
import Search from '../Search/Search.js'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      search: ""
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.checkForDistricts();
    }, 2000);
  }
  checkForDistricts = async () => {
    return getDistricts
      .then(districts =>
        this.setState({
          array: [...districts]
        })
      )
      .catch(error => console.log(error));
  };

  updateSearch = (event) => {
      this.setState({search: event.target.value.substr(0, 20)})
  };

  render() {
    const { array, search } = this.state;
    let filteredDistricts = Search(array, search)
    return (
      <div>
        {array.length > 0 ? (
          <div className="cards">
            <p className="title sticky">Ugandan Districts</p>
            <input type="text" value={search}  onChange={this.updateSearch}/>
            <ul className="container">
              {filteredDistricts.map((district, i) => (
                <li className="district" key={i}>
                  {district}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <Loader />
        )}
      </div>
    );
  }
}

export default Dashboard;
