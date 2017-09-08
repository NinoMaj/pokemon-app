import React from 'react';

import {
  Footer,
  Section,
  Link,
} from './style';

export default () => (
  <Footer>
    <Section>
      This a footer
    </Section>
    <p>Sewed by <Link href="https://ninomajder.herokuapp.com/" target="_blank" rel="noopener noreferrer ">Nino Majder</Link></p>
  </Footer>
);