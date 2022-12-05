/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.access === 'admin',
    canStaff: currentUser && (currentUser.access === 'admin' || currentUser.access === 'staff'),
  };
}
