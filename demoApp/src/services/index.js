/* eslint-disable prettier/prettier */
import axios from 'axios';
export const getUserLogin = async data => {
  return await axios.post(
    ' http://dev.technotackle.com/parvathys/admin/web/v1/customers/login',
    data,
  );
};

export const verifyOtp = async data => {
  return await axios.post(
    ' http://dev.technotackle.com/parvathys/admin/web/v1/customers/verify-otp',
    data,
  );
};
