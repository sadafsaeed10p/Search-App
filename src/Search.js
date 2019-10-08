import React, { Component } from "react";

class Search extends Component {
    searchAPI = 'https://www.themealdb.com/api/json/v1/1/search.php';
    state = {
        searchValue: '',
        isSearchPerformed: false,
        meals: []
    };

    onSearchChange = event => {
        this.setState({ searchValue: event.target.value });
    };

    search = () => {
        this.fetchMeal(this.state.searchValue);
    };

    clearSearch = () => {
        this.setState({ searchValue: '' });
    };

    fetchMeal = searchInput => {
        const searchUrl = `${this.searchAPI}?s=${searchInput}`;
        fetch(searchUrl)
            .then(response => {
                return response.json();
            })
            .then(jsonData => {
                this.setState({ meals: jsonData.meals || [], isSearchPerformed: true });
            });
    };

    render() {
        return (
            <div>
                <h1>Meal Search App</h1>
                <input
                    name="text"
                    type="text"
                    placeholder="Enter something to search"
                    onChange={event => this.onSearchChange(event)}
                    value={this.state.searchValue}
                />
                <button onClick={this.search}>Search</button>
                <button onClick={this.clearSearch}>Clear Search</button>
                <div>
                    {this.state.meals.map((meal, index) => (
                        <div key={index}>
                            <h2>{meal.strMeal}</h2>
                            <img src={meal.strMealThumb} />
                        </div>
                    ))}
                </div>
                <p>{this.state.meals.length === 0 && this.state.isSearchPerformed === true ? 'No data found' : ''}</p>
            </div>
        );
    }
}

export default Search;