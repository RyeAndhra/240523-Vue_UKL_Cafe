<template>
    <div class="preloader">
        <div class="sk-spinner sk-spinner-pulse"></div>
    </div>

    <!-- Create user modal -->
    <div class="modal fade" id="addUser">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add User</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="AddUser">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="user.nama_user">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Role</label>
                                </div>
                                <select class="form-control" v-model="user.role">
                                    <option value="Kasir">Cashier</option>
                                    <option value="Manajer">Manager</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control" v-model="user.username">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" v-model="user.password">
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
    <!-- Create user modal end -->

    <!-- Update user modal -->
    <div class="modal fade" id="updateUser">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Update User</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="UpdateUser">
                        <div class="card-body">
                            <input type="hidden" v-model="id_user">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="nama_user">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Role</label>
                                </div>
                                <select class="form-control" v-model="role">
                                    <option value="Kasir">Cashier</option>
                                    <option value="Manajer">Manager</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Username</label>
                                <input type="text" class="form-control" v-model="username">
                            </div>
                            <div class="form-group">
                                <label>Password</label>
                                <input type="password" class="form-control" v-model="password">
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
    <!-- Update user modal end -->

    <!-- Create menu modal v3.3.5-->
    <div class="modal fade" id="addMenu">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Menu</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="AddMenu">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="menu.nama_menu">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Menu Type</label>
                                </div>
                                <!-- <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label class="btn btn-secondary">
                                        <input type="radio" value="makanan" v-model="menu.jenis"> Food
                                    </label>
                                    <label class="btn btn-secondary">
                                        <input type="radio" value="minuman" v-model="menu.jenis"> Beverage
                                    </label>
                                </div> -->
                                <select class="form-control" v-model="menu.jenis">
                                    <option value="Makanan">Food</option>
                                    <option value="Minuman">Beverage</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea rows="2" class="form-control" v-model="menu.deskripsi"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file" id="gambar" class="form-control-file" @change="UploadImage($event)">
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="number" class="form-control" v-model="menu.harga">
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
    <!-- Create menu modal end -->

    <!-- Update menu modal -->
    <div class="modal fade" id="updateMenu">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Update Menu</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="UpdateMenu">
                        <div class="card-body">
                            <input type="hidden" v-model="id_menu">
                            <div class="form-group">
                                <label>Name</label>
                                <input type="text" class="form-control" v-model="nama_menu">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Menu Type</label>
                                </div>
                                <select class="form-control" v-model="jenis">
                                    <option value="Makanan">Food</option>
                                    <option value="Minuman">Beverage</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Description</label>
                                <textarea rows="2" class="form-control" v-model="deskripsi"></textarea>
                            </div>
                            <div class="form-group">
                                <label>Price</label>
                                <input type="number" class="form-control" v-model="harga">
                            </div>
                        </div>
                        <br>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-default" @click="DetailMenu(id_menu)" data-dismiss="modal"
                                data-toggle="modal" data-target="#updatePhoto">Update Photo</button>
                            <button type="submit" class="btn btn-primary">Save data</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    <!-- Update menu modal end -->

    <!-- Update photo modal -->
    <div class="modal fade" id="updatePhoto">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Update Menu's Photo</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="UpdatePhoto">
                        <div class="card-body">
                            <input type="hidden" v-model="id_menu">
                            <div class="form-group">
                                <label>Image</label>
                                <input type="file" id="gambar" class="form-control-file" @change="UploadImage($event)">
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
    <!-- Update photo modal end -->

    <!-- Create table modal -->
    <div class="modal fade" id="addTable">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Add Table</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="AddTable">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Table Number</label>
                                <input type="text" class="form-control" v-model="table.nomor_meja">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Table Max</label>
                                </div>
                                <select class="form-control" v-model="table.max">
                                    <option value="1-2">1-2 Person</option>
                                    <option value="2-4">2-4 Person</option>
                                </select>
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
    <!-- Create table modal end -->

    <!-- Update table modal -->
    <div class="modal fade" id="updateTable">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Table Menu</h4>
                </div>
                <div class="modal-body">
                    <form @submit.prevent="UpdateTable">
                        <div class="card-body">
                            <div class="form-group">
                                <label>Table Number</label>
                                <input type="text" class="form-control" v-model="nomor_meja">
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Table Max</label>
                                </div>
                                <select class="form-control" v-model="max">
                                    <option value="1-2">1-2 Person</option>
                                    <option value="2-4">2-4 Person</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <div>
                                    <label>Table Status</label>
                                </div>
                                <select class="form-control" v-model="status">
                                    <option value="Tersedia">Available</option>
                                    <option value="Dipakai">Unavailable</option>
                                </select>
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
    <!-- Update table modal end -->

    <!-- Navigation section -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">

            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Admin Page</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="#feature" class="smoothScroll">Home</a></li>
                    <li><a href="#team" class="smoothScroll">User</a></li>
                    <li><a href="#gallery" class="smoothScroll">Menu</a></li>
                    <li><a href="#menu" class="smoothScroll">Table</a></li>
                    <li><a href="#" @click="Logout()">Logout</a></li>
                </ul>
            </div>

        </div>
    </div>

    <!-- Feature section -->
    <section id="feature" class="parallax-section">
        <div class="container">
            <div class="row">

                <div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                    <div class="wow fadeInUp section-title" data-wow-delay="0.6s">
                        <h2>Admin Feature</h2>
                        <h4>Manage user, table, food & beverage data </h4>
                    </div>
                </div>

                <div class="clearfix"></div>

                <div class="col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="feature-thumb">
                        <div class="feature-icon" data-toggle="modal" data-target="#addUser">
                            <span><i class="fa fa-user"></i></span>
                        </div>
                        <h3>Manage User</h3>
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.6s">
                    <div class="feature-thumb">
                        <div class="feature-icon" data-toggle="modal" data-target="#addMenu">
                            <span><i class="fa fa-cutlery"></i></span>
                        </div>
                        <h3>Manage Menu</h3>
                    </div>
                </div>

                <div class="col-md-4 col-sm-6 wow fadeInUp" data-wow-delay="0.9s">
                    <div class="feature-thumb">
                        <div class="feature-icon" data-toggle="modal" data-target="#addTable">
                            <span><i class="fa fa-book"></i></span>
                        </div>
                        <h3>Manage Table</h3>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Team section -->
    <section id="team" class="parallax-section">
        <div class="container">
            <div class="row">

                <div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                    <div class="wow fadeInUp section-title" data-wow-delay="0.3s">
                        <h2>User Section</h2>
                        <h4>Manage User</h4>
                    </div>
                </div>

                <div class="clearfix"></div>

                <div v-for="u in user" :key="u.id_user" class="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="0.9s">
                    <div class="team-thumb">
                        <img v-if="u.role == 'Admin'" src="frontend/images/admin-img.jpg" class="img-responsive" alt="Team">
                        <img v-else-if="u.role == 'Manajer'" src="frontend/images/manager-img.jpg" class="img-responsive"
                            alt="Team">
                        <img v-else src="frontend/images/cashier-img.jpg" class="img-responsive" alt="Team">
                        <div class="team-des">
                            <h3>{{ u.nama_user }}</h3>
                            <h4>{{ u.username }} - {{ u.role }}</h4>
                            <ul class="social-icon">
                                <li><a href="#" @click="DetailUser(u.id_user)" class="fa fa-pencil" data-toggle="modal"
                                        data-target="#updateUser"></a></li>
                                <li><a href="#" @click="DeleteUser(u)" class="fa fa-trash"></a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div class="clearfix"></div>

                <div class="col-md-3 col-sm-6 wow fadeInUp" data-wow-delay="1.1s">
                    <div class="join-team">
                        <i class="fa fa-plus"></i>
                        <p>Create, Read, Update, Delete for User's Data.</p>
                        <a href="#" data-toggle="modal" data-target="#addUser"
                            class="btn btn-default hvr-bounce-to-bottom">CREATE USER</a>
                    </div>
                </div>

            </div>
        </div>
    </section>

    <!-- Menu section -->
    <section id="gallery" class="parallax-section">
        <div class="container">
            <div class="row">

                <div class="col-md-12">

                    <div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                        <div class="wow fadeInUp section-title" data-wow-delay="0.3s">
                            <h2>Menu Section</h2>
                            <h4>Manage Menu</h4>
                        </div>
                    </div>

                    <!-- iso section -->
                    <div class="iso-section wow fadeInUp" data-wow-delay="0.6s">

                        <ul class="filter-wrapper clearfix" style="text-align: right;">
                            <li><a href="#" class="btn opc-main-bg" data-toggle="modal" data-target="#addMenu">
                                    Create Menu <i class="fa fa-plus"></i>
                                </a></li>
                        </ul>
                        <!-- <ul class="filter-wrapper clearfix">
                            <li><a href="#" data-filter="*" class="selected opc-main-bg">All</a></li>
                            <li><a href="#" class="opc-main-bg" data-filter=".food">Food</a></li>
                            <li><a href="#" class="opc-main-bg" data-filter=".beverage">Beverage</a></li>
                        </ul> -->

                        <!-- iso box section -->
                        <div class="iso-box-section wow fadeInUp" data-wow-delay="0.9s">
                            <div class="iso-box-wrapper col4-iso-box">

                                <div v-for="m in menu" :key="m.id_menu" class="iso-box col-md-4 col-sm-6">
                                    <!-- <div v-for="m in menu" :key="m.id_menu" :class="['iso-box col-md-4 col-sm-6', {'food': m.jenis === 'Makanan', 'beverage': m.jenis === 'Minuman'}]"> -->
                                    <div class="gallery-thumb">
                                        <img :src="'http://localhost/Laravel_Cafe/public/Menu/' + m.gambar"
                                            class="fluid-img" :alt="m.nama_menu + ' Image'">
                                        <div class="gallery-overlay">
                                            <div class="gallery-item">
                                                <ul class="social-icon">
                                                    <li><a href="#" @click="DetailMenu(m.id_menu)" class="fa fa-pencil"
                                                            data-toggle="modal" data-target="#updateMenu"></a></li>
                                                    <li><a href="#" @click="DeleteMenu(m)" class="fa fa-trash"></a></li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                    <h3>{{ m.nama_menu }}</h3>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </div>
    </section>

    <!-- Table section -->
    <section id="menu" class="parallax-section">
        <div class="container">
            <div class="row">

                <div class="col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10">
                    <div class="wow fadeInUp section-title" data-wow-delay="0.3s">
                        <h2>Table Section</h2>
                        <h4>Manage Table</h4>
                    </div>
                </div>

                <div v-for="t in table" :key="t.id_meja" class="col-md-6 col-sm-12">
                    <div class="media wow fadeInUp" data-wow-delay="0.6s">
                        <div class="media-object pull-left">
                            <img v-if="t.max == '1-2'" src="frontend/images/table-img-1.jpg" class="img-responsive"
                                alt="Table Images">
                            <img v-else src="frontend/images/table-img-2.jpg" class="img-responsive" alt="Table Images">
                            <span class="menu-price">{{ t.nomor_meja }}</span>
                        </div>
                        <div class="media-body">
                            <h3 v-if="t.status == 'Tersedia'" class="media-heading">Available</h3>
                            <h3 v-else class="media-heading" style="color: Red;">Unavailable</h3>
                            <p>Suitable for {{ t.max }} person.</p>
                            <ul class="social-icon">
                                <li><a href="#" @click="DetailTable(t.id_meja)" class="fa fa-pencil" data-toggle="modal"
                                        data-target="#updateTable"></a></li>
                                <li><a href="#" @click="DeleteTable(t)" class="fa fa-trash"></a></li>
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

export default {
    data() {
        return {
            user: [],
            nama_user: '',
            role: '',
            username: '',
            password: '',

            menu: [],
            nama_menu: '',
            jenis: '',
            deskripsi: '',
            gambar: '',
            harga: '',

            table: [],
            nomor_meja: '',
            max: '',
            status: '',

        }
    },
    mounted() {
        this.GetUser()
        this.GetMenu()
        this.GetTable()
    },
    methods: {

        // USER
        AddUser() {
            let form = new FormData()
            form.append("nama_user", this.user.nama_user)
            form.append("role", this.user.role)
            form.append("username", this.user.username)
            form.append("password", this.user.password)
            axios.post('http://localhost:8000/api/createuser', form).then(
                ({ data }) => {
                    alert('Success! User added successfully.')
                    this.$router.push('/Admin')
                    this.user = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        GetUser: function () {
            axios.get('http://localhost:8000/api/getuser').then(
                ({ data }) => {
                    this.user = data
                }
            )
        },
        DetailUser(u) {
            axios.get('http://localhost:8000/api/getuser/' + u).then(
                (response) => {
                    console.log(response.data[0]);
                    this.id_user = response.data[0].id_user
                    this.nama_user = response.data[0].nama_user
                    this.role = response.data[0].role
                    this.username = response.data[0].username
                    this.password = response.data[0].password
                }
            );
        },
        UpdateUser: function () {
            let data =
            {
                id_user: this.id_user,
                nama_user: this.nama_user,
                role: this.role,
                username: this.username,
                password: this.password,
            }
            axios.put('http://localhost:8000/api/updateuser/' + this.id_user, data).then(
                ({ data }) => {
                    alert('Your data has been updated!')
                    this.$router.push('/Admin')
                    this.user = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        DeleteUser(u) {
            var result = confirm("Are you sure you want to delete this data?");
            if (result) {
                axios.delete('http://localhost:8000/api/deleteuser/' + u.id_user)
                setTimeout(() => {
                    location.reload()
                }, 1000)
            } else {
                alert('Your data is safe!')
            }
        },

        // MENU
        UploadImage(e) {
            this.menu.gambar = e.target.files[0]
        },
        AddMenu() {
            let form = new FormData()
            form.append("gambar", this.menu.gambar)
            form.append("nama_menu", this.menu.nama_menu)
            form.append("jenis", this.menu.jenis)
            form.append("deskripsi", this.menu.deskripsi)
            form.append("harga", this.menu.harga)
            axios.post('http://localhost:8000/api/createmenu', form).then(
                ({ data }) => {
                    alert('Success! Menu added successfully.')
                    this.$router.push('/Admin')
                    this.menu = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        GetMenu: function () {
            axios.get('http://localhost:8000/api/getmenu').then(
                ({ data }) => {
                    this.menu = data
                }
            )
        },
        DetailMenu(m) {
            axios.get('http://localhost:8000/api/getmenu/' + m).then(
                (response) => {
                    console.log(response.data[0]);
                    this.id_menu = response.data[0].id_menu
                    this.nama_menu = response.data[0].nama_menu
                    this.jenis = response.data[0].jenis
                    this.deskripsi = response.data[0].deskripsi
                    this.gambar = response.data[0].gambar
                    this.harga = response.data[0].harga
                }
            );
        },
        UpdateMenu: function () {
            let data =
            {
                id_menu: this.id_menu,
                nama_menu: this.nama_menu,
                jenis: this.jenis,
                deskripsi: this.deskripsi,
                gambar: this.gambar,
                harga: this.harga
            }
            axios.put('http://localhost:8000/api/updatemenu/' + this.id_menu, data).then(
                ({ data }) => {
                    alert('Your data has been updated!')
                    this.$router.push('/Admin')
                    this.menu = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        UpdatePhoto() {
            let form = new FormData()
            form.append("gambar", this.menu.gambar)
            axios.post('http://localhost:8000/api/updatephoto/' + this.id_menu, form).then(
                ({ data }) => {
                    alert('Your data has been updated!')
                    this.$router.push('/Admin')
                    this.menu = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        DeleteMenu(m) {
            var result = confirm("Are you sure you want to delete this data?");
            if (result) {
                axios.delete('http://localhost:8000/api/deletemenu/' + m.id_menu)
                setTimeout(() => {
                    location.reload()
                }, 1000)
            } else {
                alert('Your data is safe!')
            }
        },

        // TABLE
        AddTable() {
            let form = new FormData()
            form.append("nomor_meja", this.table.nomor_meja)
            form.append("max", this.table.max)
            axios.post('http://localhost:8000/api/createmeja', form).then(
                ({ data }) => {
                    alert('Success! Table added successfully.')
                    this.$router.push('/Admin')
                    this.table = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        GetTable: function () {
            axios.get('http://localhost:8000/api/getmeja').then(
                ({ data }) => {
                    this.table = data
                }
            )
        },
        DetailTable(t) {
            axios.get('http://localhost:8000/api/getmeja/' + t).then(
                (response) => {
                    console.log(response.data[0]);
                    this.id_meja = response.data[0].id_meja
                    this.nomor_meja = response.data[0].nomor_meja
                    this.max = response.data[0].max
                    this.status = response.data[0].status
                }
            );
        },
        UpdateTable: function () {
            let data =
            {
                id_meja: this.id_meja,
                nomor_meja: this.nomor_meja,
                max: this.max,
                status: this.status
            }
            axios.put('http://localhost:8000/api/updatemeja/' + this.id_meja, data).then(
                ({ data }) => {
                    alert('Your data has been updated!')
                    this.$router.push('/Admin')
                    this.table = data
                    setTimeout(() => {
                        location.reload()
                    }, 1000)
                }
            )
        },
        DeleteTable(t) {
            var result = confirm("Are you sure you want to delete this data?");
            if (result) {
                axios.delete('http://localhost:8000/api/deletemeja/' + t.id_meja)
                setTimeout(() => {
                    location.reload()
                }, 1000)
            } else {
                alert('Your data is safe!')
            }
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
    }
}
</script>
<!-- 
<style scoped>
@import '@/../public/frontend/css/style.css'
</style> -->