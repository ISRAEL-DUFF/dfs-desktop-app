<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="h3 mb-4 page-title">Profile</h2>
        <div class="row mt-5 align-items-center">
          <div class="col-md-3 text-center mb-5">
            <div class="avatar avatar-xl">
              <img src="/static/assets/avatars/face-1.jpg" alt="..." class="avatar-img rounded-circle">
            </div>
          </div>
          <div class="col">
            <div class="row align-items-center">
              <div class="col-md-7">
                <h4 class="mb-1">Brown, Asher</h4>
                <p class="small mb-3"><span class="badge badge-dark">New York, USA</span></p>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col-md-7">
                <p class="text-muted"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus. In hac habitasse platea dictumst. Cras urna quam, malesuada vitae risus at, pretium blandit sapien. </p>
              </div>
              <div class="col">
                <p class="small mb-0 text-muted">Nec Urna Suscipit Ltd</p>
                <p class="small mb-0 text-muted">P.O. Box 464, 5975 Eget Avenue</p>
                <p class="small mb-0 text-muted">(537) 315-1481</p>
              </div>
            </div>
          </div>
        </div>
        <div class="row my-4">
          <div class="col-md-4">
            <div class="card mb-4 shadow">
              <div class="card-body my-n3">
                <div class="row align-items-center">
                  <div class="col-3 text-center">
                    <span class="circle circle-lg bg-light">
                      <i class="fe fe-user fe-24 text-primary"></i>
                    </span>
                  </div> <!-- .col -->
                  <div class="col">
                    <a href="#">
                      <h3 class="h5 mt-4 mb-1">Personal</h3>
                    </a>
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
                  </div> <!-- .col -->
                </div> <!-- .row -->
              </div> <!-- .card-body -->
              <div class="card-footer">
                <a href="" class="d-flex justify-content-between text-muted"><span>Account Settings</span><i class="fe fe-chevron-right"></i></a>
              </div> <!-- .card-footer -->
            </div> <!-- .card -->
          </div> <!-- .col-md-->
          <div class="col-md-4">
            <div class="card mb-4 shadow">
              <div class="card-body my-n3">
                <div class="row align-items-center">
                  <div class="col-3 text-center">
                    <span class="circle circle-lg bg-light">
                      <i class="fe fe-shield fe-24 text-primary"></i>
                    </span>
                  </div> <!-- .col -->
                  <div class="col">
                    <a href="#">
                      <h3 class="h5 mt-4 mb-1">Security</h3>
                    </a>
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
                  </div> <!-- .col -->
                </div> <!-- .row -->
              </div> <!-- .card-body -->
              <div class="card-footer">
                <a href="" class="d-flex justify-content-between text-muted"><span>Security Settings</span><i class="fe fe-chevron-right"></i></a>
              </div> <!-- .card-footer -->
            </div> <!-- .card -->
          </div> <!-- .col-md-->
          <div class="col-md-4">
            <div class="card mb-4 shadow">
              <div class="card-body my-n3">
                <div class="row align-items-center">
                  <div class="col-3 text-center">
                    <span class="circle circle-lg bg-light">
                      <i class="fe fe-bell fe-24 text-primary"></i>
                    </span>
                  </div> <!-- .col -->
                  <div class="col">
                    <a href="#">
                      <h3 class="h5 mt-4 mb-1">Notifications</h3>
                    </a>
                    <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
                  </div> <!-- .col -->
                </div> <!-- .row -->
              </div> <!-- .card-body -->
              <div class="card-footer">
                <a href="" class="d-flex justify-content-between text-muted"><span>Notification Settings</span><i class="fe fe-chevron-right"></i></a>
              </div> <!-- .card-footer -->
            </div> <!-- .card -->
          </div> <!-- .col-md-->
        </div> <!-- .row-->
        <h3>Subscription</h3>
        <p class="text-muted">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris blandit nisl ullamcorper, rutrum metus in, congue lectus.</p>
        <div class="card-deck my-4">
          <div class="card mb-4 shadow">
            <div style='height: 300px; overflow: scroll' class="card-body text-center my-4" ref='subs'>
              <ul>
                <li v-for='(item, i) in items' :key = 'i'>
                  <span>{{i}}: </span> <span>{{item}}</span>
                </li>
              </ul>
            </div> <!-- .card-body -->
          </div> <!-- .card -->
          <div class="card mb-4">
            <div class="card-body text-center my-4">
              <router-link to="/dashboard/upload" class="btn mb-2 btn-primary btn-lg">Upload Verification doc</router-link>
            </div> <!-- .card-body -->
          </div> <!-- .card -->
        </div> <!-- .card-group -->
      </div> <!-- /.col-12 -->
    </div> <!-- .row -->
  </div> <!-- .container-fluid -->
</template>

<script>
  export default {
    data() {
      return {
        items: []
      }
    },

    methods: {
      addMoreData() {
        console.log('adding more data')
        let n = this.items.length;
        for(let i = n; i <= n + 50; i++) {
          this.items.push(i * 2);
        }
      }
    },

    mounted() {
      this.$addScrollListener(this.$refs['subs'], 'subs')
      this.$onScrollTo('subs-bottom', () => {
        this.addMoreData()
      })
      this.addMoreData()
    }
  }
</script>