const API = 'https://test-users-api.herokuapp.com/';
// const API = 'https://jsonplaceholder.typicode.com/'
// let users = [];


const getUsers = () => {
	return fetch(API + 'users').then(res => {
		return res.json();
	}).then(user => {
    return user.data;
    })
	.catch(err => {
		console.log('couldnt get users', err);
		return [];
	})
};

const renderUsers = (users) => {
	const container = document.querySelector('.users');

	users.forEach(item => {
		const userElement = document.createElement('div');
		userElement.classList.add('user');
		userElement.innerHTML = `
		<h4>${item.name}</h4>
		<h5>${item.name}</h5>
		`;
		container.append(userElement);
	})

}

const loadUsers = async () => {
	const users = await getUsers();
	console.log(users)
	renderUsers(users);
};

document.addEventListener('DOMContentLoaded', () => {
	const loadBtn = document.querySelector('.load');
	loadBtn.addEventListener('click',loadUsers);
})


