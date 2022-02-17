import React, { createContext, useEffect, useState } from 'react';

import { userService } from 'services';
import userStore from 'stores/user';

export const CurrentUserContext = createContext<ICurrentUserContext>({
  currentUser: null,
});

interface ICurrentUserContext {
  currentUser: any;
}

export const CurrentUserProvider: React.FC<{ userId: string }> = ({
  children,
  userId,
}) => {
  const { user: currentUser } = userStore(userId);

  return (
    <CurrentUserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </CurrentUserContext.Provider>
  );
};
