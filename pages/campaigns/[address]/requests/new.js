import React, { Component } from "react";
import Link from 'next/link';
import Router from "next/router";
import { Form, Button, Message, Input, Container } from 'semantic-ui-react';

import campaign from "../../../../ethereum/campaign";
import web3 from "../../../../ethereum/web3";

class RequestNew extends Component {

    constructor(props) {
        super(props);

        this.state ={
            value: 0,
            description: '',
            recipient: '',
            errorMessage: '',
            successMessage: '',
            loading: false
        }
    }

    static async getInitialProps(props){
        const {address} = props.query;
    
        return {address}
    }

    formSubmit = async (event) =>{
        event.preventDefault();
        const theCampaign = campaign(this.props.address);
        const {description, value, recipient} = this.state;
        this.setState({errorMessage: '', successMessage: '', loading: true});
        try {
            const accounts = await web3.eth.getAccounts();
            await theCampaign.methods
            .createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
            .send({ from: accounts[0] });
            this.setState({successMessage: 'Request successfully created !'})
        } catch (error) {
            console.log(error);
            this.setState({errorMessage: error?.message});
        }
        this.setState({loading: false})
    }

    onValueChange = (event) =>{
        this.setState({errorMessage: '', successMessage: '', value: event.target.value})
    }

    onRecipientChange = (event) =>{
        this.setState({errorMessage: '', successMessage: '', recipient: event.target.value})
    }

    onDescriptionChange = (event) =>{
        this.setState({errorMessage: '', successMessage: '', description: event.target.value})
    }

    render(){
        return (
            <Container>
                <h3>Create a new spending request</h3>
            <Form onSubmit={this.formSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                <Form.Field>
                    <label>Description</label>
                    <Input required value={this.state.description} onChange={this.onDescriptionChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Value (Ether)</label>
                    <Input required type="number" value={this.state.value} onChange={this.onValueChange}/>
                </Form.Field>
                <Form.Field>
                    <label>Recipient (ETH address)</label>
                    <Input required value={this.state.recipient} onChange={this.onRecipientChange}/>
                </Form.Field>
                <Button primary loading={this.state.loading}>Create</Button>
                <Message
                error
                header='Request creation failed'
                content={this.state.errorMessage}
                />
                <Message
                success
                header='Spending request created !'
                content={this.state.successMessage}
                />
            </Form>
            </Container>
        )
    }
}
export default RequestNew;