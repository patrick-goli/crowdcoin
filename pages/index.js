import React, { Component } from "react";
import { Card, Button, Container } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";
import factory from "../ethereum/factory";

class CampaignIndex extends Component {
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    console.log("campaigns:", campaigns);
    return { campaigns };
  }

  renderCampaigns() {
    const items = this.props.campaigns?.map((address) => {
      return {
        header: address,
        description: <a>View campaign</a>,
        fluid: true,
      };
    });
    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Container>
        <h3>Available CrowdFunding Campaigns</h3>
        <Button content="Create Campaign" icon="add circle" primary floated="right" />
        {this.renderCampaigns()}
      </Container>
    );
  }
}

export default CampaignIndex;
