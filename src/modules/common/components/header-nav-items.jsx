import React from 'react';
import Anchor from 'grommet/components/Anchor';
import { ZooniverseLogo } from 'zooniverse-react-components';
import { config } from '../../../constants/config';

export const LogoHomeLink = (
  <Anchor className="zoo-header__link" href={`${config.zooniverseURL}`}>
    <ZooniverseLogo height="1.25em" width="1.25em" />
  </Anchor>);

export const MainHeaderNavList = [
  <Anchor className="zoo-header__link--small" href={`${config.zooniverseURL}/projects`} label="Projects" />,
  <Anchor className="zoo-header__link--small" href={`${config.zooniverseURL}/about`} label="About" />,
  <Anchor className="zoo-header__link--small" href={`${config.zooniverseURL}/get-involved`} label="Get Involved" />,
  <Anchor className="zoo-header__link--small" href={`${config.zooniverseURL}/talk`} label="Talk" />,
  <Anchor className="zoo-header__link--small" href="/" label="Build" />
];
