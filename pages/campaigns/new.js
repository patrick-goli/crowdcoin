import React, { Component } from "react";
import Router from "next/router";
import { Container, Form, Button, Input, Message } from 'semantic-ui-react';

import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";

class NewCampaign extends Component {
    constructor(props) {
        super(props);
        this.state = {
            minContribution: 0,
            errorMessage: '',
            successMessage: '',
            loading: false
        };
        this.createCompaign = this.createCompaign.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    async createCompaign(event) {
        event.preventDefault();

        this.setState({errorMessage: '', successMessage: '', loading: true})
        try {
            const accounts = await web3.eth.getAccounts();
            //create new campaign
            await factory.methods.createCampaign(this.state.minContribution).send({
                from: accounts[0]
            });
            this.setState({successMessage: 'Campaign created.'})
            setTimeout(()=> { Router.push("/"); }, 3000);

        } catch (error) {
            console.log(error);
            this.setState({errorMessage: error?.message})
        }
        this.setState({loading: false})

    }

    onChange(event) {
        this.setState({errorMessage: '', successMessage: '', minContribution: event.target.value})
    }

    render(){
        return <Container>
        <h3>Create a new CrowdFundMe campaign</h3>
        <Form onSubmit={this.createCompaign} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
            <Form.Field>
                <label>Minimum Contribution</label>
                <Input
                type="number"
                label='Wei'
                labelPosition='right'
                placeholder='100'
                value={this.state.minContribution}
                onChange={this.onChange}
                />
            </Form.Field>
        <Button type='submit' primary loading={this.state.loading} >Create</Button>
        <br></br>
        <Message
        error
        header='Campaign creation failed'
        content={this.state.errorMessage}
        />
        <Message
        success
        header='Success !'
        content={this.state.successMessage}
        />
        </Form>
        </Container>
    }
}

export default NewCampaign;