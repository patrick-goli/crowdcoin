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
            recipient: ''
        }
    }

    static async getInitialProps(props){
        const {address} = props.query;
    
        return {address}
    }

    render(){
        return (
            <Container>
                <h3>Create a new spending request</h3>
            <Form>
                <Form.Field>
                    <label>Description</label>
                    <Input value={this.state.description} onChange={event =>{this.setState({description: event.target.value})}}/>
                </Form.Field>
                <Form.Field>
                    <label>Value (Ether)</label>
                    <Input type="number" value={this.state.value} onChange={event =>{this.setState({value: event.target.value})}}/>
                </Form.Field>
                <Form.Field>
                    <label>Recipient (ETH address)</label>
                    <Input value={this.state.recipient} onChange={event =>{this.setState({recipient: event.target.value})}}/>
                </Form.Field>
                <Button primary>Create</Button>
            </Form>
            </Container>
        )
    }
}
export default RequestNew;