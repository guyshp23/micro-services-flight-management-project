import React from 'react'
import { ApplicationStore } from '../state';
import { useStoreState } from 'easy-peasy';

export default function Can({permissionKeys, children}: {permissionKeys: string[], children: React.ReactNode}) {

    const userState = useStoreState((state: ApplicationStore) => state!.user!);

    // Check if the user has a certain permission
    function checkPermission(permissionsToCheck: string[]): boolean {
	
	if (userState.data) {
        	if (userState.data!.permissions) {
           	 // Check if the user has all the required permissions
           	 return permissionsToCheck.every((p) => userState.data!.permissions.includes(p));
        	}
	}

        return false;
    }

  return (
    <>
    {
      checkPermission(permissionKeys) && children
    }
    </>
  )
}
