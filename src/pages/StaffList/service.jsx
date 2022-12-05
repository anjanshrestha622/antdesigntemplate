import { request } from 'umi';

export function getStaffs(params, options) {
  return request('/api/v1/admin/staffs', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
export function addStaff(params, options) {
  return request('/api/v1/admin/', {
    method: 'POST',
    data: { ...params },
    ...(options || {}),
  });
}
