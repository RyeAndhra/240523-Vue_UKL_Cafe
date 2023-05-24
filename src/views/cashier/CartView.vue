<template>
    <div class="preloader">
        <div class="sk-spinner sk-spinner-pulse"></div>
    </div>

    <!-- Create transaction modal -->
    <div class="modal fade" id="checkout">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Checkout</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="Checkout">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Cashier</label>
                                <select class="form-control" v-model="checkout.id_user">
                                    <option v-for="kasir in filteredCashier" :key="kasir.id_user" :value="kasir.id_user">
                                        {{ kasir.nama_user }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Table</label>
                                <select class="form-control" v-model="checkout.id_meja">
                                    <option v-for="nomor in filteredTable" :key="nomor.id_meja" :value="nomor.id_meja">
                                        Table {{ nomor.nomor_meja }}
                                    </option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Customer's Name</label>
                                <input type="text" class="form-control" v-model="checkout.nama_pelanggan">
                            </div>
                        </div>
                        <br>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="submit" class="btn btn-primary">Save data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Create transaction modal end -->

    <!-- Navigation section -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Cart Page</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/Cashier">Menu</a></li>
                    <li><a href="/Cart">Cart</a></li>
                    <li><a href="/Transaction">Transaction</a></li>
                    <li><a href="/History">History</a></li>
                    <li><a href="#" @click="Logout()">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>

    <div class="container">
        <div class="card">
            <div class="card-body">
                <h3 align="center">Cart List</h3>
                <div v-if="cartItem.length > 0">
                    <table class="table table-hover table-striped">
                        <thead>
                            <tr>
                                <th>MENU</th>
                                <th>PRICE</th>
                                <th>QTY</th>
                                <th>SUBTOTAL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cart in cartItem" :key="cart.id_menu">
                                <td>{{ cart.nama_menu }}</td>
                                <td>{{ cart.harga }}</td>
                                <td>{{ cart.quantity }}</td>
                                <td>{{ productSubtotal(cart.harga, cart.quantity) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <hr>
                    <h4>Cart Total : {{ formatCurrency(cart_total) }}</h4>
                    <hr>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#checkout">Checkout</button>
                </div>
                <div v-else>
                    <hr>
                    <p align="center">Your cart is empty.</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            cart: [],
            user: [],
            role: {},
            table: [],
            status: {},
            checkout: {},
        }
    },
    methods: {
        productSubtotal(harga, quantity) {
            return harga * quantity;
        },
        formatCurrency(value) {
            return value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
        },
        Checkout() {
            var data = {
                // datapost: this.$store.getters.cartItems
                cart: this.$store.getters.cartItems,
                id_user: this.checkout.id_user,
                id_meja: this.checkout.id_meja,
                nama_pelanggan: this.checkout.nama_pelanggan
            }
            axios.post('http://localhost:8000/api/createtransaksi', data).then(response => {
                if (response.data.status) {
                    alert('Success! Your checkout process was successful.')
                    this.$router.push('/Transaction')
                    this.$store.commit('reset')
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                } else {
                    alert('Failed to create transaction. Please try again.')
                }
            }).catch(error => {
                alert('An error occurred while creating the transaction. Please try again.')
                console.error(error);
            });
        },
        GetUser() {
            axios.get('http://localhost:8000/api/getuser').then(
                ({ data }) => {
                    this.user = data
                }
            )
        },
        GetTable() {
            axios.get('http://localhost:8000/api/getmeja').then(
                ({ data }) => {
                    this.table = data
                }
            )
        },

        Logout() {
            var result = confirm("Are you sure you want to logout?");
            if (result) {
                localStorage.removeItem('token')
                localStorage.removeItem('role')
                setTimeout(() => {
                    location.href = '/'
                }, 500)
            } else {
                alert('Your data is safe!')
            }
        }
    },
    mounted() {
        this.GetUser()
        this.GetTable()
    },
    computed: {
        cartItem() {
            return this.$store.getters.cartItems
        },
        cart_total() {
            return this.$store.getters.cartTotal
        },
        filteredCashier() {
            const role = 'Kasir';
            return this.user.filter(kasir => kasir.role === role);
        },
        filteredTable() {
            const status = 'Tersedia';
            return this.table.filter(nomor => nomor.status === status);
        }
    },
}
</script>