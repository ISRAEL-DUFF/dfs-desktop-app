<template>
    <nav class="topnav navbar navbar-light fixed-top p2p-nav-bg">
        <button type="button" class="navbar-toggler text-muted mt-2 p-0 mr-3 collapseSidebar">
          <i class="fe fe-menu navbar-toggler-icon"></i>
        </button>
        <form class="form-inline mr-auto searchform text-muted">
          <input class="form-control mr-sm-2 bg-transparent border-0 pl-4 text-muted" type="search" placeholder="Type something..." aria-label="Search">
        </form>
        <ul class="nav">
          <!-- <li class="nav-item">
            <a class="nav-link text-muted my-2" href="#" id="modeSwitcher" data-mode="dark">
              <i class="fe fe-sun fe-16"></i>
            </a>
          </li> -->
          <!-- <li class="nav-item">
            <router-link class="nav-link text-muted my-2" to="/dashboard">
              <span class="fe fe-grid fe-16"></span>
            </router-link>
          </li> -->
          <li class="nav-item nav-notif">
            <a class="nav-link text-muted my-2" @click = 'openNotif'>
              <span class="fe fe-bell fe-16"></span>
              <span class="dot dot-md bg-success"></span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle text-muted pr-0" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span class="avatar avatar-sm mt-2">
                <img src="/static/assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
              </span>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownMenuLink">
              <router-link to ="/dashboard/profile" class="dropdown-item">Profile</router-link>
              <router-link class="dropdown-item" to="/dashboard/profile">Settings</router-link>
              <button  class="dropdown-item" @click = "logout">Logout</button>
            </div>
          </li>
        </ul>
      </nav>
</template>

<script>
import socketMixin from "@/mixins/socket";

  export default {
    data() {
      return {}
    },

    methods: {
      openNotif() {
        this.$eventHub.$emit("openNotif")
      },
      closeNotif () {},
      logout() {
        sessionStorage.removeItem('active_profile')
        const socket = this.getSocket()
        if (socket) socket.close()
        this.$store.commit('resetState')
        this.$router.push('/login')
      },
    },
    mixins: [socketMixin]
  }
</script>

<style scoped>
  .p2p-nav-bg {
    background-color: #1F2630 !important
  }
</style>