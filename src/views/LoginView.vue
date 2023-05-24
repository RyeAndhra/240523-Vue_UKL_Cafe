<template>
    <div class="login-container">
        <div class="modal-header">
            <h4 class="modal-title">Login</h4>
        </div>
        <div class="modal-body">
            <form @submit.prevent="Login" class="login-form">
                <div class="card-body">
                    <div class="form-group">
                        <label>Username</label>
                        <input type="text" class="form-control" v-model="username">
                    </div>
                    <div class="form-group">
                        <label>Password</label>
                        <input type="password" class="form-control" v-model="password">
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary">Save data</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            username: '',
            password: '',
        }
    },
    methods: {
        Login() {
            let data = {
                username: this.username,
                password: this.password
            }
            axios.post('http://localhost:8000/api/login', data)
                .then(
                    (response) => {
                        localStorage.setItem('token', response.data.token)
                        localStorage.setItem('role', response.data.role)
                        if (response.data.role === "Admin") {
                            location.href = '/Admin'
                        } else if (response.data.role === "Manajer") {
                            location.href = '/Manager'
                        } else if (response.data.role === 'Kasir') {
                            location.href = '/Cashier'
                        }
                    }
                )
                .catch(
                    (error) => {
                        console.log(error)
                    }
                )
        }
    }
}
</script>

<style>
.login-container {
    max-width: 300px;
    position: relative;
    margin: 0 auto;
    margin-top: 100px;
    padding: 10px 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.login-form {
    max-width: 300px;
    width: 100%;
}
</style>