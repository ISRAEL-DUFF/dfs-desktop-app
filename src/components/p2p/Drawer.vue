<template>
    <div class="drawer">
        <span><i class="fe fe-home text-muted"></i><br/><span class='drawer-text text-muted'>Home</span></span>
        <span class = 'text-muted'>
            <router-link to="/dashboard/market"> 
                <i class="fe fe-shopping-cart text-muted"></i><br/><span class='drawer-text  text-muted'>Markets</span>
            </router-link>
        </span>
        <!-- <div class="menu-btn"><i class="fas fa-plus"></i><br/></div> -->
        <span class = 'text-muted'>
            <router-link to="/dashboard">
                <i class="fe fe-pocket text-muted"></i> <br/><span class='drawer-text text-muted'>Wallet</span>
            </router-link>
        </span>
        <span class = 'text-muted'>
            <router-link to="/dashboard/profile">
                <i class="fe fe-user text-muted"></i> <br/><span class='drawer-text text-muted'>Profile</span>
            </router-link>
        </span>
    </div>
</template>

<style scoped>
    .drawer {
    display:flex;
    background-color: #1F2630;
    height:80px;
    position:fixed;
    bottom: 0px;
    width: 99%;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    z-index: 5;
    justify-content: space-evenly;
    align-items: center;
    }


    .drawer span {
    display: inline-block;
    font-size: 1.2rem;
    color: #FFC168;
    transition: all 0.4s;
    cursor: pointer;
    }

    .drawer span a {
        align-items: center;
    }

    .drawer span i:hover {
    transform: scale(1.2);
    border-bottom: 2px solid orange;
    }

    .drawer span i {
    transition: all 0.3s ease;
    padding-bottom: 4px;
    }

    .drawer-text {
        font-size: .8rem !important;
    }

    .menu-btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 50px;
    background-color: #FFC168;
    color: white;
    top: -25px;
    position: absolute;
    transform: rotate(-45deg);
    border-radius: 10px;
    box-shadow: 5px 5px 25px 0px rgba(0,0,0,0.2);
    cursor: pointer;
    transition: all 0.1s;
    opacity: 0.9;
    }

    .menu-btn:hover {
    box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
    }

    .menu-btn i{
    font-size: 1.1em;
    transform: rotate(45deg);
    
    }

    @media screen and (min-width: 0px) and (max-width: 500px) {
     .drawer{ display: flex; }  /* show it on smaller screen */
    }
    @media screen and (min-width: 501px) {
    .drawer{ display: none; }   /* hide it on larger screens */
    }
</style>