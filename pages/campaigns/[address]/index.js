import React from 'react';
import { Card, Grid } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign"
import ContributeForm from '../../../components/ContributeForm';

const ShowCampaign = (props) => {
    const {address, minContribution, balance, requestsCount, contributorsCount, manager} = props;
    const items = [{
        header: manager,
        meta: "Address of Manager",
        description: "Manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" }
      },
      {
        header: minContribution + " Wei",
        meta: "minumum contribution",
        description: "min to contribute"
      },
      {
        header: balance + " Wei",
        meta: "total current balance",
        description: "a"
      },
      {
        header: requestsCount,
        meta: "number of outgoing requests",
        description: "b"
      },
      {
        header: contributorsCount,
        meta: "number of contributors",
        description: "c"
      }
    ];
    
    return (
    <div>
        <h3>Crowd-funding campaign</h3>
    <Grid>
        <Grid.Column width={10}>
            <Card.Group items={items}/>
        </Grid.Column>
        <Grid.Column width={6}>
            <ContributeForm address={address} />
        </Grid.Column>
    </Grid>
    </div>
    );
};

ShowCampaign.getInitialProps = async (props)=>{

    const campaign = Campaign(props?.query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
        address: props?.query.address,
        minContribution: summary[0],
        balance: summary[1],
        requestsCount: summary[2],
        contributorsCount: summary[3],
        manager: summary[4]
    }
}

export default ShowCampaign;