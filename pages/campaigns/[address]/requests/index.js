import React, { Component } from "react";
import Link from 'next/link';
import { Container, Button } from 'semantic-ui-react';

class RequestIndex extends Component {

    constructor(props) {
        super(props);
    }

    static async getInitialProps(props){
        const {address} = props.query;
    
        return {address}
    }

    render(){
        return (
        <Container>
            <h3>Requests</h3>
            <Link href={`/campaigns/${this.props.address}/requests/new`}>
                <a className="item">
                    <Button primary>New request</Button>
                </a>
            </Link>
        </Container>)
    }
}
export default RequestIndex;