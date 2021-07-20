/* eslint-disable prettier/prettier */
export const Routes = {
  OUTSIDE_STACK: 'Outside Stack',
  ...{
    LOGIN: 'Login',
    OTPVERIFICATION: 'OtpVerification',
  },
  INSIDE_STACK: 'Inside Stack',
  ...{
    BOTTOM_TAB_STACKS: 'Dashboard',
    ...{
      LANDINGSCREEN: 'Landing Screen',
      ACCOUNT: 'Account',
      ADMIN: 'Admin',
      INVEST: 'Invest',
      PORTFOLIO: 'Portfolio',
    },
  },
};
