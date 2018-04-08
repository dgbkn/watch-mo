import React, { Component } from "react";
import theMovieDb from "themoviedb-javascript-library";
import Content from "../../hoc/ContentWrapper";
import Loader from "../../components/Loader";
import NoDataFound from "../../components/NoDataFound";
import SearchResults from "./SearchResults";
import ListItem from "./ListItem";
import SearchStyles from "../../assets/css/search.css";
import _ from "lodash";

class SearchHome extends Component {
	constructor(props){
		super(props);
		this.state = {
			searchResults: '',
			loader: false,
			disabled: false
		}
	}

    successCB = data => {
		const fetchedData = JSON.parse(data);
        this.setState({
			loader: false,
            searchResults: fetchedData
        });
    };

	errorCB = data => {
		if (data){
	        this.setState({
				loader: false,
				tmdbResponse: JSON.parse(data).status_message
	        });
		} else {
			this.setState({
				searchResults: '',
				disabled: true,
				loader: false
	        });
		}
    };

	handleSearch = (queryString) => {
		queryString.persist();
		this.delayedCallback(queryString);
	}

	// handleItemClick = (itemID,itemName) => {
	//     this.props.history.push({pathname: '/'+itemID+'/'+itemName});
	// }

	componentDidMount = () => {
		this.delayedCallback = _.debounce((queryString) => {
			this.setState({
				loader: true
			});
			theMovieDb.search.getMovie({ query: queryString.target.value },
				this.successCB,
				this.errorCB
			);
     	}, 1000);
	}

    render() {
		const {
            searchResults,
			tmdbResponse,
			loader,
			disabled
        } = this.state;

		let allResults = '';
		let dataLoaded = '';
        if (searchResults.total_results > 0) {
			allResults = searchResults.results.map((k, index) => {
				return (
					<ListItem key={k.id} id={k.id} name={k.title} image={k.poster_path} />
				);
			});
            dataLoaded = (
				<SearchResults list={allResults} />
            );
        }  else if (tmdbResponse) {
            dataLoaded = (
                <NoDataFound
                    alignCenter
                    spaceTop
                    message={tmdbResponse}
                />
            );
        } else if (searchResults == '' && disabled) {
			dataLoaded = (
                <NoDataFound
                    alignCenter
                    spaceTop
                    message="Perhaps a communications breakdown!"
                />
            );
        } else {
			dataLoaded = (
                <NoDataFound
                    spaceTop
                    message="No results found! Something different may be!"
                />
            );
		}

        return (
            <div className="content all-smooth">
                <section className="movies-section">
                    <div className="container">
                        <div className="row">
                            <div className="col-sm-8 offset-sm-2">
                                <input
									disabled={disabled}
                                    autoFocus="true"
                                    className="form-control mb-4"
                                    placeholder="Search for Movies"
									onChange={queryString => this.handleSearch(queryString)}
                                />
								{loader ? <Loader spaceTop /> : dataLoaded}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}

export default SearchHome;