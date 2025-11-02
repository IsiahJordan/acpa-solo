
export function getRoleLevel(role: string) {
  if (role === "admin") {
    return 3;
  }
  else if (role === "proctor") {
    return 2;
  }
  return 1;
}
