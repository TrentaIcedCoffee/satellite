import React, { useContext } from 'react';
import { Message } from 'semantic-ui-react';
import { RootContext } from '../context';
import styled from '@emotion/styled';

const StyledDiv = styled('div')`
  position: absolute;
  width: 100%;
  padding: 5px 5px;
  top: 0px;
  z-index: 1;
`;

const StyledMessage = styled(Message)`
  background-color: rgba(255, 232, 230, 0.7) !important;
`;

const Error: React.FC = () => {
  const { rootState, setRootState } = useContext(RootContext);

  const onCloseError = (uuid: string) => {
    setRootState({
      ...rootState,
      errors: rootState.errors.filter((error) => error.uuid != uuid)
    });
  };

  return (
    <StyledDiv>
      {rootState.errors.map((error, idx) => (
        <StyledMessage
          key={idx}
          onDismiss={() => onCloseError(error.uuid)}
          content={error.message}
          color="red"
        />
      ))}
    </StyledDiv>
  );
};

export default Error;
