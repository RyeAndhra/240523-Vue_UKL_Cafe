<template>
    <div class="not-found">
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for could not be found.</p>
        <a href="#" @click="Back()">Go to Home</a>
    </div>
</template>

<script>
export default {
    methods: {
        Back() {
            if (localStorage.getItem('role') === 'Admin') {
                location.href = '/Admin'
            } else if (localStorage.getItem('role' === 'Kasir')) {
                location.href = '/Cashier'
            } else if (localStorage.getItem('role') === 'Manajer') {
                location.href = '/Manager'
            }
        }
    }
}
</script>

<style>
.not-found {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    text-align: center;
}

h1 {
    font-size: 72px;
    margin-bottom: 10px;
}

h2 {
    font-size: 36px;
    margin-bottom: 20px;
}

p {
    font-size: 18px;
    margin-bottom: 20px;
}

router-link {
    color: #000;
    text-decoration: underline;
}
</style>