

import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap';

const Page = ({ children, title, columns = 1 }) =>
  (<div>
    <Grid columns={columns} padded>
      <Row>
        {title}
        {children}
      </Row>
    </Grid>
  </div>);
  

export default Page;