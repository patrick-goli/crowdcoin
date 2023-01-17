import React from 'react';
import Link from 'next/link';
import { Card, Grid, Button } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign"
import ContributeForm from '../../../components/ContributeForm';
import web3 from '../../../ethereum/web3';

const ShowCampaign = (props) => {
    const {address, minContribution, balance, requestsCount, contributorsCount, manager} = props;
    const items = [{
        header: manager,
        meta: "Address of Manager",
        description: "Manager created this campaign and can create requests to withdraw money",
        style: { overflowWrap: "break-word" }
      },
      {
        header: web3.utils.fromWei(minContribution, 'ether') + " ether",
        meta: `Minumum contribution (${minContribution} Wei)`,
        description: "Amount to contribute"
      },
      {
        header: web3.utils.fromWei(balance, 'ether') + " ether",
        meta: "Total current balance",
        description: "Money available so far"
      },
      {
        header: requestsCount,
        meta: "number of outgoing requests",
        description: "Spending requests mabe by manager"
      },
      {
        header: contributorsCount,
        meta: "number of contributors",
        description: "People who have donated to this campaign"
      }
    ];
    const requests=`/campaigns/${props.address}/requests`;
    return (
    <div>
        <h3>Crowd-funding campaign</h3>
    <Grid>
        <Grid.Row>
            <Grid.Column width={10}>
                <Card.Group items={items}/>
            </Grid.Column>
            <Grid.Column width={6}>
                <ContributeForm address={address} />
            </Grid.Column>
        </Grid.Row>
        <Grid.Row>
            <Grid.Column>
                <Link href={requests}>
                    <a className="item">
                        <Button primary>View requests</Button>
                    </a>
                </Link>
            </Grid.Column>
        </Grid.Row>
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