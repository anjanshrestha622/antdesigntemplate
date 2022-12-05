// @ts-ignore

/* eslint-disable */
import { request } from 'umi';
/** 获取当前的用户 GET /api/v1/currentUser */

export async function currentUser(options) {
  return request('/api/v1/currentUser', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 退出登录接口 GET /api/v1/admin/logout */

export async function outLogin(options) {
  return request('/api/v1/admin/logout', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 登录接口 POST /api/v1/admin/login */

export async function loginAdmin(body, options) {
  return request('/api/v1/admin/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
/** 此处后端没有提供注释 GET /api/v1/notices */

export async function getNotices(options) {
  return request('/api/v1/notices', {
    method: 'GET',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/v1/rule */

export async function rule(params, options) {
  return request('/api/v1/rule', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/v1/rule */

export async function updateRule(options) {
  return request('/api/v1/rule', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/v1/rule */

export async function addRule(options) {
  return request('/api/v1/rule', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/v1/rule */

export async function removeRule(options) {
  return request('/api/v1/rule', {
    method: 'DELETE',
    ...(options || {}),
  });
}
/** 获取规则列表 GET /api/v1/category */

export async function category(params, options) {
  return request('/api/v1/category', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
/** 新建规则 PUT /api/v1/category */

export async function updateCategory(options) {
  return request('/api/v1/category', {
    method: 'PUT',
    ...(options || {}),
  });
}
/** 新建规则 POST /api/v1/category */

export async function addCategory(options) {
  return request('/api/v1/category', {
    method: 'POST',
    ...(options || {}),
  });
}
/** 删除规则 DELETE /api/v1/category */

export async function removeCategory(options) {
  return request('/api/v1/category', {
    method: 'DELETE',
    ...(options || {}),
  });
}

/** 获取规则列表 GET /api/v1/questions */

export async function question(params, options) {
  return request('/api/v1/questions/admin', {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}
