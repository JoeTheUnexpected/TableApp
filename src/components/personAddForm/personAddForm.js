import React from 'react';

export default class PersonAddForm extends React.Component {
    constructor() {
        super();
        this.state = {
            id: '',
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            isValid: false
        }
        this.onValueChange = this.onValueChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.validateInput = this.validateInput.bind(this);
        this.validateForm = this.validateForm.bind(this);
    }

    onValueChange(e) {
        switch(e.target.id) {
            case 'id':
                e.target.value = e.target.value.replace(/\D/, '');
                this.setState({id: e.target.value});
                break;
            case 'firstName':
                e.target.value = e.target.value.replace(/[^A-Z|a-z|а-я|А-Я|Ё|ё]/, '');
                this.setState({firstName: e.target.value});
                break;
            case 'lastName':
                e.target.value = e.target.value.replace(/[^A-Z|a-z|а-я|А-Я|Ё|ё]/, '');
                this.setState({lastName: e.target.value});
                break;
            case 'email':
                this.setState({email: e.target.value});
                break;
            case 'phone':
                e.target.value = e.target.value.replace(/[^\d|+|(|)]/, '');
                this.setState({phone: e.target.value});
                break;
            default:
                break;
        }
    }

    async onSubmit(e) {
        e.preventDefault();
        await this.validateForm();
        if (this.state.isValid) {
            this.props.onAdd(this.state);
            this.setState({
                id: '',
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                isValid: false
            });
        }
    }

    validateInput(e) {
        if (this.state[e.target.id] === '') {
            e.target.classList.add('is-invalid');
            return;
        }

        switch(e.target.id) {
            case 'id':
            case 'firstName':
            case 'lastName':
                if (this.state[e.target.id] !== '') e.target.classList.remove('is-invalid');
                break;
            case 'email':
                const emailRegExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if (!emailRegExp.test(String(this.state[e.target.id]).toLowerCase())) {
                    e.target.classList.add('is-invalid');
                } else {
                    e.target.classList.remove('is-invalid');
                }
                break;
            case 'phone':
                const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
                if (!phoneRegExp.test(String(this.state[e.target.id]).toLowerCase())) {
                    e.target.classList.add('is-invalid');
                } else {
                    e.target.classList.remove('is-invalid');
                }
                break;
            default:
                break;
        }
    }

    validateForm() {
        const inputs = document.getElementsByClassName('is-invalid');
        let isEmpty = false;
        for (let item in this.state) {
            if (this.state[item] === '') {
                isEmpty = true;
                break;
            }
        }
        if (inputs.length === 0 && !isEmpty) {
            this.setState({isValid: true});
        }
        console.log(this.state.isValid);
    }

    render() {
        return (
            <React.Fragment>
                <form
                    className="bottom-panel d-flex mt-3"
                    onSubmit={this.onSubmit}
                >
                    <div className="form-floating flex-fill">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="id" 
                            placeholder="id"
                            onBlur={this.validateInput}
                            onChange={this.onValueChange}
                            value={this.state.id}
                        />
                        <label htmlFor="id">id</label>
                    </div>
                    <div className="form-floating flex-fill">
                        <input 
                            type="text"
                            className="form-control" 
                            id="firstName" 
                            placeholder="firstName"
                            onBlur={this.validateInput}
                            onChange={this.onValueChange}
                            value={this.state.firstName}
                        />
                        <label htmlFor="firstName">firstName</label>
                    </div>
                    <div className="form-floating flex-fill">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="lastName" 
                            placeholder="lastName"
                            onBlur={this.validateInput}
                            onChange={this.onValueChange}
                            value={this.state.lastName}
                        />
                        <label htmlFor="lastName">lastName</label>
                    </div>
                    <div className="form-floating flex-fill">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="email" 
                            placeholder="email"
                            onBlur={this.validateInput}
                            onChange={this.onValueChange}
                            value={this.state.email}
                        />
                        <label htmlFor="email">email</label>
                    </div>
                    <div className="form-floating flex-fill">
                        <input 
                            type="text" 
                            className="form-control" 
                            id="phone" 
                            placeholder="phone"
                            ref="phoneInput"
                            onBlur={this.validateInput}
                            onChange={this.onValueChange}
                            value={this.state.phone}
                        />
                        <label htmlFor="phone">phone</label>
                    </div>
                </form>
                <button
                    className="btn btn-outline-secondary mt-3"
                    onClick={this.onSubmit}
                >
                    Добавить в таблицу
                </button>
            </React.Fragment>
        )
    }
}