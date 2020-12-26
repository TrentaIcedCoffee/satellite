import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { Input, Menu } from 'semantic-ui-react';

const Wrapper = styled('div')`
  margin: 5px;
`;

const Header: React.FC = () => {
  const location = useLocation();
  const history = useHistory();

  return (
    <Wrapper>
      <Menu pointing>
        <Menu.Item
          name="Project Satellite"
          active={false}
          onClick={() => history.push('/')}
        />
        <Menu.Item
          name="Roadmap"
          active={location.pathname === '/roadmap'}
          onClick={() => history.push('/roadmap')}
        />
        <Menu.Item
          name="Backlog"
          active={location.pathname === '/backlog'}
          onClick={() => history.push('/backlog')}
        />
        <Menu.Item
          name="Sprint"
          active={location.pathname === '/sprint'}
          onClick={() => history.push('/sprint')}
        />
        <Menu.Menu position="right">
          <Menu.Item>
            <Input icon="search" placeholder="Search..." />
          </Menu.Item>
        </Menu.Menu>
      </Menu>
    </Wrapper>
  );
};

export default Header;
