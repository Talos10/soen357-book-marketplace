import { createContext, useContext } from 'react';
import { useAuth } from '../Auth';


interface Backend {

}

const BackendContext = createContext<Backend | undefined>(undefined);

interface Props {
  client: string;
  children?: React.ReactNode;
}

export const BackendProvider = ({ client, children }: Props) => {
  const auth = useAuth();

  const validateResponse = (response: Response) => {
    if (response.ok) return;
    switch (response.status) {
      case 401:
        auth.logOut();
        return;
    }
  };

  const backend = {
  };

  return <BackendContext.Provider value={backend}>{children}</BackendContext.Provider>;
};

export const useBackend = () => useContext(BackendContext) as Backend;
