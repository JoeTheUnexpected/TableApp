import React from 'react';
import Table from '../table/table.js';
import LoadingIndicator from '../loadingIndicator/loadingIndicator.js';
import RowDetails from '../rowDetails/rowDetails.js';
import ModeSelector from '../modeSelector/modeSelector.js';
import ReactPaginate from 'react-paginate';
import SearchPanel from '../searchPanel/searchPanel.js';
import PersonAddForm from '../personAddForm/personAddForm.js';

export default class App extends React.Component {
    constructor() {
        super();
        this.state = {
            data: [],
            isLoading: false,
            sortType: 'asc',
            sortField: 'id',
            selectedRow: null,
            isModeSelected: false,
            currentPage: 0,
            term: '',
            isAdding: false
        };
        this.onSort = this.onSort.bind(this);
        this.sortByField = this.sortByField.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.showAddForm = this.showAddForm.bind(this);
        this.addPerson = this.addPerson.bind(this);
    }

    async fetchData(url) {
        const response = await fetch(url);
        const data = await response.json();
        const dataSorted = data.sort(this.sortByField('id', 'asc'));
        this.setState({
            isLoading: false,
            data: dataSorted
        })
    }

    onSort(sortField) {
        this.setState(({data, sortType}) => {
            const newSortType = sortType === 'asc' ? 'desc' : 'asc';
            const newArr = data.sort(this.sortByField(sortField, newSortType));

            return {
                data: newArr,
                sortType: newSortType,
                sortField: sortField
            }
        })
    }

    sortByField(field, type) {
        if (field === 'id') {
            if (type === 'asc') {
                return (a, b) => parseInt(a[field]) - parseInt(b[field]);
            } else {
                return (a, b) => parseInt(b[field]) - parseInt(a[field]);
            }
        }
        else {
            if (type === 'asc') {
                return (a, b) => a[field].toLowerCase() < b[field].toLowerCase() ? -1 : 1;
            }
            else {
                return (a, b) => a[field].toLowerCase() > b[field].toLowerCase() ? -1 : 1;
            }
        }
    }

    onSelectRow = row => (
        this.setState({
            selectedRow: row
        })
    )

    onSelectMode = url => {
        this.setState({
            isModeSelected: true,
            isLoading: true
        })
        this.fetchData(url)
    }

    handlePageClick = ({selected}) => (
        this.setState({currentPage: selected})
    )

    chunckData = (data, pageSize) => {
        const subarray = [];

        for (let i = 0; i < Math.ceil(data.length / pageSize); i++) {
            subarray[i] = data.slice((i * pageSize), (i * pageSize) + pageSize);
        }

        return subarray;
    }

    onSearch(term) {
        this.setState({term});
    }

    searchData(data, term) {
        if (term.length === 0) {
            return data
        }

        return data.filter(item => {
            return item['id'].toString().includes(term.toLowerCase())
                || item['firstName'].toLowerCase().includes(term.toLowerCase())
                || item['lastName'].toLowerCase().includes(term.toLowerCase())
                || item['email'].toLowerCase().includes(term.toLowerCase())
                || item['phone'].toLowerCase().includes(term.toLowerCase())
          })
    }

    showAddForm() {
        const isAdding = !this.state.isAdding;
        this.setState({
            isAdding
        })
    }

    addPerson({id, firstName, lastName, email, phone}) {
        const newPerson = {
            id,
            firstName,
            lastName,
            email,
            phone
        }

        this.setState(({data}) => {
            const newArr = [newPerson, ...data];
            return {
                data: newArr
            }
        });
    }

    render() {
        const pageSize = 50;
        const filteredData = this.searchData(this.state.data, this.state.term);
        const displayedData = this.chunckData(filteredData, pageSize)[this.state.currentPage];
        const pageCount = Math.ceil(filteredData.length / pageSize);

        if (!this.state.isModeSelected) {
            return (
                <div className="container">
                    <ModeSelector onSelectMode={this.onSelectMode} />
                </div>
            )
        }

        return (
            <div className="container">
                {
                    this.state.isLoading
                    ? <LoadingIndicator />
                    :   <React.Fragment>
                        <SearchPanel 
                            onSearch={this.onSearch}
                        />
                        <button
                            className="btn btn-outline-primary"
                            onClick={this.showAddForm}
                        >Добавить</button>
                        {
                            this.state.isAdding
                            ? <PersonAddForm
                                onAdd={this.addPerson}
                            />
                            : null
                        }
                        <Table 
                            data={displayedData}
                            onSort={this.onSort}
                            sortType={this.state.sortType}
                            sortField={this.state.sortField}
                            onSelectRow={this.onSelectRow}
                        />
                    </React.Fragment> 
                }
                {
                    this.state.data.length > pageSize
                    ? <ReactPaginate
                        previousLabel={'<'}
                        nextLabel={'>'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        activeClassName={'active'}
                        pageClassName="page-item"
                        pageLinkClassName="page-link"
                        previousClassName="page-item"
                        nextClassName="page-item"
                        previousLinkClassName="page-link"
                        nextLinkClassName="page-link"
                        forcePage={this.state.currentPage}
                    />
                    : null
                }
                {this.state.selectedRow ? <RowDetails person={this.state.selectedRow}/> : null}
            </div>
        )
    }
}