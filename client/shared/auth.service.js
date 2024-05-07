import { AUTH_URL } from "./api.config";

class AuthService {
    isAuth() {
        const id = window.localStorage.getItem("id");

        if (id) {
            return true;
        } else {
            return false;
        }
    }

    async login(email, password) {
        return new Promise(async (resolve, reject) => {
            const requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            const result = await fetch(
                `${AUTH_URL}?email=${email}&password=${password}`,
                requestOptions
            );
            if (result.status === 404) {
                resolve("NO_USER");
            } else if (result.status === 401) {
                resolve("PASSWORD_ERROR");
            } else {
                const id = await result.json();
                
                window.localStorage.setItem('id', id)

                resolve("OK");
            }
        });
    }

    async requestCode(email) {
        
    }
}

export default AuthService = new AuthService();
