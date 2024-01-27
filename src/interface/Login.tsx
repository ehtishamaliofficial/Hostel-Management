type LoginFormValues = {
  usernameOrPhoneNumber: string;
  password: string;
};

interface LoginServiceResponse {
  token: string;
  user: User;
}
