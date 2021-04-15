import { Dispatch } from 'react';
import { Button, Portal } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import ProfileIcon from '../../../../assets/profile-icon.jpg';
import './ProfileOptions.scss';

interface Props {
  setProfileOption: Dispatch<boolean>;
}

export default function ProfileOptions({ setProfileOption }: Props) {
  //const name = localStorage.getItem('name');
  const name = "Guest";

  const history = useHistory();

  const closeModal = () => {
    setProfileOption(false);
  };

  const manageUser = () => {
    history.push('/')
  };

  return (
    <div className="ProfileOptions">
      <img className="profile-icon" src={ProfileIcon} alt="Profile" />
      <p className="name">{name}</p>
      <Button onClick={manageUser} variant="outlined">
        Log Out
      </Button>

      <Portal>
        <button onClick={closeModal} className="ProfileOptions-shadow" />
      </Portal>
    </div>
  );
}
