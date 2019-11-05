import React, { Component } from "react";
import { getDistricts } from "udistricts";
import "./dashboard.css";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: []
    };
  }

  componentDidMount() {
    this.checkForDistricts();
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

  render() {
    const src = "https://placeimg.com/640/480/arch";
    const { array } = this.state;
    console.log(array, "statish");
    return (
      <div>
        {array.length > 0 ? (
          <div className="cards">
            <p className="title sticky">Ugandan Districts</p>
            <ul className="container">
              {array.map((district, i) => (
                <li className="district" key={i}>
                  {district}
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <p>Loading....</p>
        )}
      </div>
    );
  }
}

export default Dashboard;
