import React, { Component } from "react";
import { Table, Button } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import campaign from "../ethereum/campaign";

class RequestRow extends Component {

    constructor(props) {
        super(props);
    }

    approveRequest = async ()=>{
        const accounts = await web3.eth.getAccounts();
        const camp = campaign(this.props.address);
        try {
            await camp.methods.approveRequest(this.props.id).send(
                {from: accounts[0]}
            );
            
        } catch (error) {
            console.log(error)
        }
    }

    finalizeRequest = async ()=>{
        const accounts = await web3.eth.getAccounts();
        const camp = campaign(this.props.address);
        try {
            await camp.methods.finalizeRequest(this.props.id).send(
                {from: accounts[0]}
            );
            
        } catch (error) {
            console.log(error)
        }
    }

    render(){
        const {Row, Cell} = Table;
        const {id, request, contributorsCount} = this.props;
        const readyToFinalize = request.approvalCount > (contributorsCount/2.0)
        return (
        <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
            <Cell>{id}</Cell>
            <Cell>{request.description}</Cell>
            <Cell>{web3.utils.fromWei(request.value, 'ether') + " ether"}</Cell>
            <Cell>{request.recipient}</Cell>
            <Cell>{request.approvalCount + "/" + contributorsCount}</Cell>
            <Cell>
                {request.complete? null : (
                <Button color="green" basic onClick={this.approveRequest}>Approve</Button>
                )}
            </Cell>
            <Cell>
                {request.complete? null : (
                <Button primary onClick={this.finalizeRequest}>Finalize</Button>
                )}
            </Cell>
        </Row>)
    }
}
export default RequestRow;