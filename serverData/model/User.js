let data = [

]

let User = {
	find: () => new Promise((resolve, reject) => resolve(data)),
	findOne: ({ email }) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.email === email)
			if (index < 0) reject({ error: 'Not found user email ja: ' + email })
			else resolve(data[index])
		})
	},
	findName: (name) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.name === name)
			if (index < 0) reject({ error: 'Not found user name: ' + name })
			else resolve(data[index])
		})
	},
	findByRefreshToken: (token) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.refreshToken === token)
			if (index < 0) reject({ error: 'Not found user with token: ' + token })
			else resolve(data[index])
		})
	},
	findAndUpdate: (email, user, updateUser = true) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.email === email)
			if (index < 0)
				if (!updateUser) reject({ error: 'Not found user: ' + email })
				else {
					data.push(user)
					resolve(data[data.length - 1])
				}
			else {
				user = { ...data[index], ...user }
				data.splice(index, 1, user)
				resolve(data[index])
			}
		})
	},
	insert: (user) => {
		return new Promise((resolve, reject) => {
			if (!user.id) {
				const uuid = Math.random().toString(36).substring(2, 9)
				user = { id: uuid, ...user }
			}
			data.push(user)
			resolve(data[data.length - 1])
		})
	},
	delete: (id) => {
		return new Promise((resolve, reject) => {
			let index = data.findIndex((e) => e.id === id)
			if (index < 0) return reject('Not found user: ' + id)
			data.splice(index, 1)
			resolve(1)
		})
	},
}

export default User
