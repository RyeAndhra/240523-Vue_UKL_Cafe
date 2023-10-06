<template>
    <div class="preloader">
        <div class="sk-spinner sk-spinner-pulse"></div>
    </div>

    <!-- Filter Income modal -->
    <div class="modal fade" id="filterIncome">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title">Filter Income</h4>
                </div>
                <div class="modal-body">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="dateFilter">Filter by Date:</label>
                            <input type="date" class="form-control" id="dateFilter" v-model="selectedDate">
                        </div>
                        <div class="form-group">
                            <label for="monthFilter">Filter by Month:</label>
                            <input type="month" class="form-control" id="monthFilter" v-model="selectedMonth">
                        </div>
                    </div>
                    <br>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                        <button type="button" class="btn btn-primary" @click="filterIncome">Filter</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Filter Income modal end -->

    <!-- Navigation section -->
    <div class="navbar navbar-default navbar-static-top" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <button class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                    <span class="icon icon-bar"></span>
                </button>
                <a href="#" class="navbar-brand">Manager Page</a>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav navbar-right">
                    <li><a href="/Manager">Home</a></li>
                    <li><a href="/Filter">Transaction</a></li>
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
                        <h2>Manager Feature</h2>
                        <h4>Exploring Transaction Data</h4>
                    </div>
                </div>

                <div class="clearfix"></div>

                <div class="col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="feature-thumb">
                        <div class="feature-icon">
                            <span><i class="fa fa-line-chart"></i></span>
                        </div>
                        <h3>Today's Income</h3>
                        <p v-if="totalIncome > 0">{{ formatCurrency(totalIncome) }}</p>
                        <p v-else>No Transactions Recorded Today</p>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="feature-thumb">
                        <div class="feature-icon" data-toggle="modal" data-target="#filterIncome">
                            <span><i class="fa fa-filter"></i></span>
                        </div>
                        <h3>Filter Income</h3>
                        <p v-if="filteredIncome > 0">{{ formatCurrency(filteredIncome) }}</p>
                        <p v-else-if="filteredIncome === 0">No income found</p>
                        <p v-else>Loading...</p>
                    </div>
                </div>
                <!-- <div class="col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="feature-thumb">
                        <h3>Print Daily Report</h3>
                        <button class="btn btn-default" @click="printDailyReport()">Print</button>
                    </div>
                </div>
                <div class="col-md-6 col-sm-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="feature-thumb">
                        <h3>Print Monthly Report</h3>
                        <button class="btn btn-default" @click="printMonthlyReport()">Print</button>
                    </div>
                </div> -->
                <br>
                <div class="col-md-12 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="feature-thumb">
                        <div class="text-center mt-4">
                            <div style="display: inline-block; width: 350px; height: 350px;">
                                <canvas id="piechart"></canvas>
                            </div>
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
            transaction: [],
            tgl_transaksi: {},
            id_user: {},

            detail: {},
            id_menu: {},
            qty: {},
            nama_menu: {},
            total: {},

            totalIncome: 0,
            selectedDate: '',
            selectedMonth: '',
            filteredIncome: null,
        }
    },
    methods: {
        formatCurrency(value) {
            const numericValue = Number(value);
            return numericValue.toLocaleString('id-ID', {
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
        GetTotalIncomeToday() {
            const currentDate = new Date().toISOString().split('T')[0];
            axios.get('http://localhost:8000/api/incomeToday/' + currentDate)
                .then(response => {
                    this.totalIncome = response.data.total_income_today;
                })
                .catch(error => {
                    console.error(error);
                });
        },
        filterIncome() {
            const filters = {};
            if (this.selectedDate) {
                filters.date = this.selectedDate;
            }
            if (this.selectedMonth) {
                const [selectedYear, selectedMonth] = this.selectedMonth.split('-');
                filters.year = selectedYear;
                filters.month = selectedMonth;
            }
            axios.get('http://localhost:8000/api/filterIncome', { params: filters })
                .then(response => {
                    this.filteredIncome = response.data.total_income;
                })
                .catch(error => {
                    console.error(error);
                });
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
        this.GetTransaction()
        this.GetTotalIncomeToday()
        axios.get('http://localhost:8000/api/getmenu')
            .then(
                (response) => {
                    console.log(response)
                    const data = response.data.map(item => item.jumlah_pesan)
                    const nama_menu = response.data.map(item => item.nama_menu)

                    let colors = []
                    for (let i = 0; i < data.length; i++) {
                        let color = '#' + Math.floor(Math.random() * 16777215).toString(16)
                        colors.push(color)
                    }

                    const chartData = {
                        labels: nama_menu,
                        datasets: [{
                            data: data,
                            backgroundColor: colors
                        }]
                    }

                    new window.Chart(document.getElementById('piechart'), {
                        type: 'doughnut',
                        labels: 'Data Menu',
                        data: chartData,
                        options: {
                            responsive: true,
                            title: {
                                display: true,
                                text: 'My Chart Title'
                            },
                            legend: {
                                position: 'right' // or 'left'
                            }
                        }
                    })
                })
    }
}
</script>