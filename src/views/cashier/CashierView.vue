<template>
    <div class="preloader">
        <div class="sk-spinner sk-spinner-pulse"></div>
    </div>

    <!-- Add to cart modal v3.3.5-->
    <div class="modal fade bs-addCart-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel">
        <div class="modal-dialog modal-sm">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title text-center">{{ nama_menu }}</h4>
                    <h4 class="modal-title text-center">{{ formatCurrency(harga) }}</h4>
                </div>
                <div class="modal-body">
                    <div class="card-body text-center" v-if="menu_total">
                        <h4>In Cart</h4>
                        <h4>{{ menu_total }}</h4>
                    </div>
                    <div class="card-body text-center" v-else>
                        <h4>In Cart</h4>
                        <h4>0</h4>
                    </div>
                    <br>
                    <div class="button-container" style="display: flex; justify-content: center;">
                        <button type="button" class="btn btn-default" @click="RemoveItem()"><i
                                class="fa fa-minus"></i></button>
                        <button type="button" class="btn btn-default" @click="AddToCart()"><i
                                class="fa fa-plus"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Add to cart modal end -->

    <!-- Navigation section -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Cashier Page</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#menu" class="smoothScroll">Menu</a></li>
                    <li><a href="/Cart">Cart</a></li>
                    <li><a href="/Transaction">Transaction</a></li>
                    <li><a href="/History">History</a></li>
                    <li><a href="#" @click="Logout()">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>

    <!-- Menu section -->
    <section id="menu" class="parallax-section">
        <div class="container">
            <div class="row">

                <div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                    <div class="wow fadeInUp section-title" data-wow-delay="0.3s">
                        <h2>Menu Section</h2>
                        <h4>Explore Our Delectable Food & Beverage Selection</h4>
                    </div>
                </div>

                <div v-for="m in menu" :key="m.id_menu" class="col-md-6 col-sm-12">
                    <div class="media wow fadeInUp" data-wow-delay="0.6s">
                        <div class="media-object pull-left">
                            <img :src="'http://localhost/Laravel_Cafe/public/Menu/' + m.gambar" class="fluid-img"
                                :alt="m.nama_menu + ' Image'">
                            <span class="menu-price">{{ formatCurrency(m.harga) }}</span>
                        </div>
                        <div class="media-body">
                            <h3>{{ m.nama_menu }}</h3>
                            <p>{{ m.deskripsi }}</p>
                            <ul class="social-icon">
                                <li><a href="#" @click="DetailMenu(m.id_menu)" class="fa fa-plus-square" data-toggle="modal"
                                        data-target=".bs-addCart-sm"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>
</template>

<script>

import axios from 'axios'
import store from '@/store'

export default {
    data() {
        return {
            menu: [],
            id_menu: '',
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: '',
            harga: '',
        }
    },
    methods: {

        // MENU
        GetMenu: function () {
            axios.get('http://localhost:8000/api/getmenu').then(
                ({ data }) => {
                    this.menu = data
                }
            )
        },
        DetailMenu(id_menu) {
            axios.get('http://localhost:8000/api/getmenu/' + id_menu).then(
                (response) => {
                    // this.id_menu = response.data[0].id_menu
                    // this.nama_menu = response.data[0].nama_menu
                    // this.jenis = response.data[0].jenis
                    // this.deskripsi = response.data[0].deskripsi
                    // this.gambar = response.data[0].gambar
                    // this.harga = response.data[0].harga

                    // this.menu = response.data[0]

                    const menu = response.data[0]
                    this.id_menu = menu.id_menu
                    this.nama_menu = menu.nama_menu
                    this.jenis = menu.jenis
                    this.deskripsi = menu.deskripsi
                    this.gambar = menu.gambar
                    this.harga = menu.harga
                }
            );
        },
        formatCurrency(value) {
            return value.toLocaleString('id-ID', {
                style: 'currency',
                currency: 'IDR',
                minimumFractionDigits: 0,
            });
        },

        // CART
        AddToCart() {
            const cartItem = {
                id_menu: this.id_menu,
                nama_menu: this.nama_menu,
                jenis: this.jenis,
                deskripsi: this.deskripsi,
                gambar: this.gambar,
                harga: this.harga,
                quantity: 1
            };
            store.commit('addToCart', cartItem)
        },
        RemoveItem() {
            const cartItem = {
                id_menu: this.id_menu,
                nama_menu: this.nama_menu,
                jenis: this.jenis,
                deskripsi: this.deskripsi,
                gambar: this.gambar,
                harga: this.harga,
                quantity: 1
            };
            store.commit('removeItem', cartItem)
        },

        Logout() {
            var result = confirm("Are you sure you want to logout?");
            if (result) {
                localStorage.clear()
                setTimeout(() => {
                    location.href = '/'
                }, 500)
            }
        }
    },
    mounted() {
        this.GetMenu()
        this.DetailMenu(this.$route.params.id)
    },
    computed: {
        menu_total() {
            const cartItem = {
                id_menu: this.id_menu,
                nama_menu: this.nama_menu,
                jenis: this.jenis,
                deskripsi: this.deskripsi,
                gambar: this.gambar,
                harga: this.harga,
                quantity: 1
            };
            return this.$store.getters.menuQty(cartItem)
        }
    },
}
</script>

<style>
button {
    padding: 10px;
    border-radius: 5px;
    margin: 0 5px 50px 5px;
}
</style>