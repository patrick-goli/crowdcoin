import React, { Component } from "react";
import factory from '../ethereum/factory';

class CampaignIndex extends Component {
  
  static async getInitialProps(){

    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log(campaigns);
    return {campaigns};

  }

  render(){
    return <div>
      Campaigns : {this.props.campaingns}
      </div>
  }
}

export default CampaignIndex;