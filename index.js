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

const deleteUser = async (userId, userElement) => {
	try {
		const res = await fetch(API + 'users/' + userId, {method: 'DELETE'});
		console.log(res)
		userElement.remove();

	} catch(err){
		console.log('couldnt delete user',err);
	}
}

// const createUser = () =>{	
// 	fetch(API + 'users/', {
// 		method: 'POST',
// 		body: JSON.stringify({name: name,age: age}),
// 	}).then(res => {
// 		return (res.json());
// 	}).catch(err => {
// 		console.log(`Can't create user`, err);
// 	})	
// }

const createCard = () => {
	const name = document.querySelector(`#name`).value;
	const age = document.querySelector(`#age`).value;
	const user = {name, age};
	users.push(user);
	renderUsers();
}

const renderUsers = (users) => {
	const container = document.querySelector('.users');

	users.forEach(item => {
		const userElement = document.createElement('div');
		userElement.classList.add('user');
		userElement.innerHTML = `
		<h4>${item.name}</h4>
		<h5>${item.name}</h5>
		`;
		const removeButton = document.createElement('button');
		removeButton.classList.add('user_remove');
		removeButton.textContent = 'X';
		removeButton.type = 'button';
		removeButton.addEventListener('click', () =>{
			deleteUser(item.id, userElement)
		})
		userElement.append(removeButton);
		container.append(userElement);
	})
}

const loadUsers = async () => {
	const users = await getUsers();
	console.log(users)
	renderUsers(users);
};

const createUser = () => {
	const name = document.querySelector('#name').value;
	const age = document.querySelector('#age').value;
	if ((name.length === 0) || (age.length === 0)) {
		return;
	}
	console.log(name)
	console.log(age)
	 	fetch(API + 'users/', {
		method: 'POST',
		body: JSON.stringify({name: name, age: age}),
	}).then(res => {
		return (res.json());
	}).then(data => {
		const user = {
			name,
			age,
			id: data.id
		}
		renderUsers([user])
	}).catch(err => {
		console.log(`Can't create user`, err);
	})	
}


document.addEventListener('DOMContentLoaded', () => {
	const loadBtn = document.querySelector('.load');
	loadBtn.addEventListener('click',loadUsers);

	const createBtn = document.querySelector('.create_user');
	createBtn.addEventListener('click', createUser)
	
})


