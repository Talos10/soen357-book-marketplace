import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Button,
  InputBase,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Card, Progress, ReturnButton } from '../../components';


export const UserSettings = () => {

  return false ? (
    <Progress />
  ) : (
    <div>
      <Card>
        <div>
          User info not available when logged in as <strong>Guest</strong>.
        </div>
      </Card>
    </div>
  )
};

export default UserSettings;
