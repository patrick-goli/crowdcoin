import React, { Component } from "react";
import Link from 'next/link';
import { Container, Button, Table } from 'semantic-ui-react';
import campaign from "../../../../ethereum/campaign";
import RequestRow from "../../../../components/RequestRow";

class RequestIndex extends Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps(props){
        const {address} = props.query;
        const camp = campaign(address);
        const requestsCount = await camp.methods.requestsCount().call();
        const contributorsCount = await camp.methods.contributorsCount().call();
        // get all spending requests in parallel
        // can be done efficiently with new version of Solidity : get Arry of requests
        const requests = await Promise.all(
            Array(parseInt(requestsCount))
                .fill()
                .map((element, index)=>{
                    return camp.methods.requests(index).call()
                })
        );
        // console.log(requests)
        // console.log(requestsCount)
        return {address, requests, requestsCount, contributorsCount}
    }

    renderRows(){
        return this.props.requests.map((request, index) =>{
            return <RequestRow
            key={index} 
            id = {index}
            request = {request}
            address = {this.props.address}
            contributorsCount = {this.props.contributorsCount} />
        })
    }

    render(){
        const {Header, Row, HeaderCell, Body} = Table;
        return (
        <Container>
            <h3>{ this.props.requestsCount} Spending Requests</h3>
            <Link href={`/campaigns/${this.props.address}/requests/new`}>
                <a className="item">
                    <Button primary floated="right" style={{marginBottom: 10}}>New request</Button>
                </a>
            </Link>
            <Table celled>
                <Header>
                <Row>
                    <HeaderCell>ID</HeaderCell>
                    <HeaderCell>Description</HeaderCell>
                    <HeaderCell>Amount</HeaderCell>
                    <HeaderCell>Recipient</HeaderCell>
                    <HeaderCell>Approvals</HeaderCell>
                    <HeaderCell>Approve</HeaderCell>
                    <HeaderCell>Finalize</HeaderCell>
                </Row>
                </Header>
                <Body>
                {this.renderRows()}
                </Body>
            </Table>

        </Container>)
    }
}
export default RequestIndex;