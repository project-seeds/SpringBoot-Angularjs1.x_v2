'use strict';

angular.module('myApp')

.value('MenuService', [{
    title: 'manage_users',
    role: ['ROLE_ADMIN'],
    link: '/users'
}, {
    title: 'week_list',
    role: ['ROLE_USER'],
    link: '/weeklist',
    subLinks: ['/weeklist/edit/']
}, {
    title: 'add_new_week',
    role: ['ROLE_USER'],
    link: '/weeklist/add'
}])
.value('LandingPageService', [{
	role: 'ROLE_ADMIN',
	link: '/home'
},
{
	role: 'ROLE_USER',
	link: '/weeklist'
}
]);