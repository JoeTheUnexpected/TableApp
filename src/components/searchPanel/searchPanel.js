import React from 'react'

export default class SearchPanel extends React.Component {
    constructor() {
        super();
        this.state = {
            term: ''
        }
        this.onUpdateSearch = this.onUpdateSearch.bind(this);
        this.onSearch = this.onSearch.bind(this);
    }

    onSearch(e) {
        this.props.onSearch(this.state.term);
    }

    onUpdateSearch(e) {
        const term = e.target.value;
        this.setState({term});
    }

    render() {
        return (
            <div className="input-group mb-3 mt-3">
                 <div className="input-group-prepend">
                    <button 
                        className="btn btn-outline-primary"
                        onClick={this.onSearch}
                    >Search</button>
                </div>
                <input 
                    type="text" 
                    className="form-control search-input"
                    onChange={this.onUpdateSearch}
                />
            </div>
        )
    }
}