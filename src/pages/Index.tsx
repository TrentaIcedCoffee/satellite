import React, { useContext, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from '@emotion/styled';
import produce from 'immer';
import { Button, Dropdown, Input, Segment } from 'semantic-ui-react';
import { RootContext } from '../context';
import envs from '../.envs.json';
import * as clients from '../clients';

const Wrapper = styled('div')`
  background-color: black;
  height: 100vh;
`;

const StyledSegment = styled(Segment)`
  top: 40vh;
`;

const StyledInput = styled(Input)`
  width: 50%;
  border: 2px white;
`;

const localeOptions = [
  { key: 'en', value: 'en', flag: 'us' },
  { key: 'zh', value: 'zh', flag: 'cn' }
];

const Index: React.FC = () => {
  const { t, i18n } = useTranslation();
  const { rootState, setRootState } = useContext(RootContext);
  const [passcode, setPasscode] = useState('');

  const onChangeLanguage = (locale?: any) => {
    if (typeof locale === 'string' && i18n.languages.includes(locale)) {
      i18n.changeLanguage(locale + '');
      return;
    }
    // push error.
    setRootState(
      produce(rootState, (rootStateCopy) => {
        rootStateCopy.errors.push({
          uuid: clients.newUuid(),
          message: `Language preference must be within [${i18n.languages}], had ${locale}.`
        });
        return rootStateCopy;
      })
    );
  };

  const onConfirm = () => {
    clients.auth
      .signInWithEmailAndPassword(envs.EMAIL, passcode)
      .then((user) => {
        setRootState(
          produce(rootState, (rootStateCopy) => {
            rootStateCopy.user = user;
          })
        );
      })
      .catch((err) => {
        let errorMsg: string = `unknown error, ${err.code}`;
        if (err.code === 'auth/wrong-password') {
          errorMsg = t('password.wrong');
        }
        setRootState(
          produce(rootState, (rootStateCopy) => {
            rootStateCopy.errors.push({
              uuid: clients.newUuid(),
              message: t('password.wrong')
            });
            return rootStateCopy;
          })
        );
      });
  };

  return (
    <Wrapper>
      <StyledSegment basic textAlign="center">
        <StyledInput
          focus
          label={
            <Dropdown
              options={localeOptions}
              defaultValue={i18n.language}
              onChange={(_, e) => onChangeLanguage(e.value)}
            />
          }
          placeholder={t('passcode')}
          onChange={(e) => {
            setPasscode(e.target.value);
          }}
          value={passcode}
          action={<Button onClick={(e) => onConfirm()}>{t('confirm')}</Button>}
        />
      </StyledSegment>
    </Wrapper>
  );
};

export default Index;
