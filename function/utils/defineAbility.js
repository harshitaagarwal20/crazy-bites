
export const canView = (user, LicenceNo) => {
  const role = user.role;

  return (
    role === 'Super-Admin' ||
    (role === 'Admin' && user.LicenceNo === society)
  );
};


export const canUpdate = (user, LicenceNo) => {
  const role = user.role;

  return (
    role === 'Super-Admin' ||
    (
      role === 'Admin' && user.LicenceNo === LicenceNo
    ) ||
    (Array.isArray(LicenceNo.user) && LicenceNo.user.includes(user.id))
  );
};
