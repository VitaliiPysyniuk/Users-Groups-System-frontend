class UsersServices {
    API_URL = `${process.env.REACT_APP_API_URL}/users`

    async getAllUsers(params = {}) {
        const url = new URL(this.API_URL)
        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))

        const response = await fetch(url, {
            method: 'GET'
        })
        return  {
            data: await response.json(),
            status: response.status
        }
    }

    async addUser(data) {
        const url = this.API_URL;
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return  {
            data: await response.json(),
            status: response.status
        }
    }

    async editUser(id, data) {
        const url = this.API_URL + `/${id}`;
        const response = await fetch(url, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        return  {
            data: await response.json(),
            status: response.status
        }
    }

    async deleteUser(id) {
        const url = this.API_URL + `/${id}`;
        const response = await fetch(url, {
            method: 'DELETE'
        })
        return  {
            status: response.status
        }
    }
}

export const usersServices = new UsersServices();