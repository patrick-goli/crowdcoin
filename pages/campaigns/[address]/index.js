import React from 'react';
import { Card } from "semantic-ui-react";
import Campaign from "../../../ethereum/campaign"
import ContributeForm from '../../../components/ContributeForm';

const ShowCampaign = ({minContribution, balance, requestsCount, contributorsCount, manager}) => {
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
        <Card.Group items={items}/>
        <ContributeForm></ContributeForm>
        </div>

    );
};

ShowCampaign.getInitialProps = async ({query})=>{

    const campaign = Campaign(query.address);
    const summary = await campaign.methods.getSummary().call();
    return {
        "minContribution": summary[0],
        "balance": summary[1],
        "requestsCount": summary[2],
        "contributorsCount": summary[3],
        "manager": summary[4]
    }
}

export default ShowCampaign;