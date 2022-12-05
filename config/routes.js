export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    icon: 'smile',
    component: './Dashboard',
  },
  // {
  //   path: '/welcome',
  //   name: 'welcome',
  //   icon: 'smile',
  //   component: './Welcome',
  // },
  // {
  //   path: '/admin',
  //   name: 'admin',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   component: './Admin',
  //   routes: [
  //     {
  //       path: '/admin/sub-page',
  //       name: 'sub-page',
  //       icon: 'smile',
  //       component: './Welcome',
  //     },
  //     {
  //       component: './404',
  //     },
  //   ],
  // },
  // {
  //   name: 'list.table-list',
  //   icon: 'table',
  //   path: '/list',
  //   component: './TableList',
  // },
  {
    path: '/categories',
    name: 'Categories',
    icon: 'AppstoreAddOutlined',
    component: './CategoryTableList',
  },
  {
    name: 'Question',
    path: '/questions',
    icon: 'BookOutlined',
    component: './QuestionTableList',
  },
  {
    name: 'Model Question',
    path: '/model-question',
    icon: 'ProfileOutlined',
    component: './ModelQuestionTableList',
  },
  {
    name: 'Quiz Question',
    path: '/quiz-question',
    icon: 'BulbOutlined',
    component: './ModelQuestionTableList',
  },
  {
    name: 'Staffs',
    path: '/staffs',
    icon: 'UserOutlined',
    access: 'canAdmin',
    component: './StaffList',
  },
  // {
  //   name: 'Users',
  //   path: '/users',
  // },
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    component: './404',
  },
];

// export default [
//   {
//     path: '/user',
//     layout: false,
//     routes: [
//       {
//         path: '/user',
//         routes: [
//           {
//             name: 'login',
//             path: '/user/login',
//             component: './user/Login',
//           },
//         ],
//       },
//       {
//         component: './404',
//       },
//     ],
//   },
//   {
//     path: '/welcome',
//     name: 'welcome',
//     icon: 'smile',
//     component: './Welcome',
//   },
//   {
//     path: '/admin',
//     name: 'admin',
//     icon: 'crown',
//     access: 'canAdmin',
//     component: './Admin',
//     routes: [
//       {
//         path: '/admin/sub-page',
//         name: 'sub-page',
//         icon: 'smile',
//         component: './Welcome',
//       },
//       {
//         component: './404',
//       },
//     ],
//   },
//   {
//     name: 'list.table-list',
//     icon: 'table',
//     path: '/list',
//     component: './TableList',
//   },
//   {
//     path: '/',
//     redirect: '/welcome',
//   },
//   {
//     component: './404',
//   },
// ];
