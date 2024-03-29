import React, { Component } from "react";
import { getDistricts } from "udistricts";
import "./dashboard.css";
import Loader from "../Loader/Spinner.js";
import Search from "../Search/Search.js";
import { Paginator } from "../Pagination/pagination.js";
import { numberPages } from "../Pagination/pageNumbers.js";
import { headerRender } from "../Header/Header.js";
import { ListItems } from "../ListItems/list.js";
class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      search: "",
      currentPage: 1,
      perPage: 8
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

  handleClick = event => {
    this.setState(
      {
        currentPage: Number(event.target.id)
      },
      () => {
        console.log(this.state, "statis");
      }
    );
  };

  updateSearch = event => {
    this.setState({ search: event.target.value.substr(0, 20), currentPage: 1 });
  };

  addItem = event => {
    event.preventDefault();
    let name = this.refs.name.value;
    if (!name) return;
    this.setState({ array: [name, ...this.state.array] });
    this.refs.name.value = "";
  };

  deleteItem = event => {
    const { array } = this.state;
    const newArray = array.filter((d, key) => event.target.value !== d);
    this.setState({ array: [...newArray] });
  };

  render() {
    const { array, search, currentPage, perPage } = this.state;

    //returns filtered districts array depending on search term.
    let filteredDistricts = Search(array, search);

    //to handle pagination
    const indexOfLastItem = currentPage * perPage;
    const indexOfFirstItem = indexOfLastItem - perPage;
    // console.log("last item index", indexOfLastItem, "first", indexOfFirstItem);

    const currentItems = filteredDistricts.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    const renderItems = ListItems(currentItems, this.deleteItem)

    let pageNumbers = numberPages(perPage, array);
    //to display items.
    return (
      <div>
        {array.length > 0 ? (
          <div className="cards">
            <p className="title sticky">Ugandan Districts</p>
            {headerRender(search, this.updateSearch, this.addItem)}
            <ul className="container">{renderItems}</ul>
            <ul id="page-numbers">
              {Paginator(pageNumbers, this.state.currentPage, this.handleClick)}
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
