<template>
    <div class="preloader">
        <div class="sk-spinner sk-spinner-pulse"></div>
    </div>

    <!-- Transaction Detail modal -->
    <div class="modal fade" id="detailTransaction">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Transaction Detail</h4>
                </div>
                <div class="modal-header">
                    <h4>Date : {{ tgl_transaksi }}</h4>
                    <h4>Cashier : {{ nama_user }}</h4>
                    <h4>Table : {{ nomor_meja }}</h4>
                    <h4>Customer's Name : {{ nama_pelanggan }}</h4>
                    <h4>Status : {{ status }}</h4>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <h4>Order</h4>
                        <div>
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <h4>NO</h4>
                                        </th>
                                        <th>
                                            <h4>MENU</h4>
                                        </th>
                                        <th>
                                            <h4>QTY</h4>
                                        </th>
                                        <th>
                                            <h4>SUBTOTAL</h4>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(menu, nomor) in detail" :key="nomor">
                                        <td>{{ nomor + 1 }}</td>
                                        <td>{{ menu.nama_menu }}</td>
                                        <td>{{ menu.qty }}</td>
                                        <td>{{ formatCurrency(menu.subtotal) }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <hr>
                        <h4>Total : {{ formatCurrency(total) }}</h4>
                    </div>
                    <br>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Transaction Detail modal end -->

    <!-- Navigation section -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Transaction Page</a>
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
                <h3 align="center">Transaction List</h3>
                <table class="table table-hover table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>CASHIER</th>
                            <th>CUSTOMER</th>
                            <th>DATE</th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="t in filteredTransactions" :key="t.id_transaksi">
                            <td>{{ t.id_transaksi }}</td>
                            <td>{{ t.nama_user }}</td>
                            <td>{{ t.nama_pelanggan }}</td>
                            <td>{{ t.tgl_transaksi }}</td>
                            <td><button class="btn btn-default" @click="handleMethod(t)" data-toggle="modal"
                                    data-target="#detailTransaction">View Details</button>
                                <button class="btn btn-primary" @click="Payment(t)">Confirm Payment</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios'

export default {
    data() {
        return {
            transaction: [],
            tgl_transaksi: {},
            id_user: {},
            id_meja: {},
            nama_pelanggan: {},
            status: {},
            total: {},

            detail: {},
            id_menu: {},
            qty: {},
            nama_menu: {},
            subtotal: {},
        }
    },
    methods: {
        handleMethod(t) {
            this.DetailTransaction(t)
            this.DTransaction(t)
        },
        formatCurrency(value) {
            return value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
        },
        GetTransaction() {
            axios.get('http://localhost:8000/api/gettransaksi').then(
                ({ data }) => {
                    console.log(data);
                    this.transaction = data
                }
            )
        },
        DetailTransaction(t) {
            axios.get('http://localhost:8000/api/gettransaksi/' + t.id_transaksi).then(
                (response) => {
                    console.log(response.data[0]);
                    this.tgl_transaksi = response.data[0].tgl_transaksi
                    this.nama_user = response.data[0].nama_user
                    this.nomor_meja = response.data[0].nomor_meja
                    this.nama_pelanggan = response.data[0].nama_pelanggan
                    this.status = response.data[0].status
                    this.total = response.data[0].total
                }
            );
        },
        DTransaction(t) {
            axios.get('http://localhost:8000/api/dtransaksi/' + t.id_transaksi).then(
                ({ data }) => {
                    this.detail = data
                    console.log(data)
                }
            );
        },
        Payment: function (t) {
            let data = {
                id_meja: t.id_meja
            }
            axios.put('http://localhost:8000/api/payment/' + t.id_transaksi, data).then(
                (response) => {
                    alert('Success! Your payment process was successful.')
                    this.$router.push('/History')
                    console.log(response)
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },

        Logout() {
            var result = confirm("Are you sure you want to logout?");
            if (result) {
                localStorage.clear()
                setTimeout(() => {
                    location.href = '/'
                }, 500)
            } else {
                alert('Your data is safe!')
            }
        }
    },
    mounted() {
        this.GetTransaction()
    },
    computed: {
        filteredTransactions() {
            const status = 'Pending';
            return this.transaction.filter(t => t.status === status);
        }
    }

}
</script>