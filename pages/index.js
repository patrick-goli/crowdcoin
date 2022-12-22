import React, { Component } from "react";
import factory from '../ethereum/factory';

class CampaignIndex extends Component {

  async componentDidMount(){

    const capaingns = await factory.methods.getDeployedCampaigns().call();
    console.log(capaingns);

  }

  render(){
    return <div>Campaign</div>
  }
}

export default CampaignIndex;