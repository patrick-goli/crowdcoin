import React, { Component } from "react";
import { Container, Form, Button, Input } from 'semantic-ui-react';

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class NewCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {minContribution: 0, message: ''};
        this.onSubmit = this.onSubmit.bind(this);

      }

    async onSubmit(event) {
        event.preventDefault();
        try {
            const accounts = await web3.eth.getAccounts();
            //create new campaign
            await factory.methods.createCampaign(this.state.minContribution).send({
                from: accounts[0]
            });
            this.setState({message: 'Campaign creatiion submited'})
        } catch (error) {
            console.log(error);
            this.setState({message: 'Campaign creatiion failed: ' + error?.message})
        }

    }

    render(){
        return <Container>
        <h3>Create a new crowdfunding campaign</h3>
        <Form onSubmit={this.onSubmit}>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                type="number"
                label='Wei'
                labelPosition='right'
                placeholder='100'
                value={this.state.minContribution}
                onChange={event => this.setState({minContribution: event.target.value})}
                />
            </Form.Field>
        <Button type='submit' primary>Create</Button>
        <br></br>
        <label><strong>{this.state.message}</strong></label>
        </Form>
        </Container>
    }
}

export default NewCampaign;