
export function validate(password: string, rePassword: string) {
  if (password === rePassword) {
    return true;
  }
  return false;
}
