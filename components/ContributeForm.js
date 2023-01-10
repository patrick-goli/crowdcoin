import React from "react";
import { Form, Button, Input } from 'semantic-ui-react';

const ContributeForm = () => {
    return <Form>
        <Form.Field>
            <label>Amount to contribute</label>
            <Input type="number" label="ether" labelPosition="right"/>
        </Form.Field>
        <Button primary>Contribute</Button>
    </Form>
};
export default ContributeForm;