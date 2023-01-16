import React, { Component } from "react";
import { Form, Button, Input, Message } from 'semantic-ui-react';

import Campaign from "../ethereum/campaign"
import web3 from "../ethereum/web3";

class ContributeForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            amountContribution: 0,
            errorMessage: '',
            successMessage: '',
            loading: false
        };
        this.contribute = this.contribute.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async contribute(event) {
        event.preventDefault();
        this.setState({errorMessage: '', successMessage: '', loading: true});
        try {
            const accounts = await web3.eth.getAccounts();
            const campaign = Campaign(this.props.address);
            console.log("address: ", this.props.address);
            console.log("contribution: ", this.state.amountContribution);
            // send in Wei
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.amountContribution, 'ether')
            });
            this.setState({successMessage: 'Contribution sent.'})
            // setTimeout(()=> { Router.push("/"); }, 3000);

        } catch (error) {
            console.log(error);
            this.setState({errorMessage: error?.message})
        }
        this.setState({loading: false})
    }

    onChange(event) {
        this.setState({errorMessage: '', successMessage: '', amountContribution: event.target.value})
    }

    render(){
        return <Form onSubmit={this.contribute} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
            <Form.Field>
                <label>Amount to contribute</label>
                <Input type="number" value={this.state.amountContribution} onChange={this.onChange} label="ether" labelPosition="right"/>
            </Form.Field>
            <Button primary>Contribute</Button>
            <br></br>
            <Message
            error
            header='Contribution failed'
            content={this.state.errorMessage}
            />
            <Message
            success
            header='Many thanks !'
            content={this.state.successMessage}
            />
        </Form>
    }
}
export default ContributeForm;