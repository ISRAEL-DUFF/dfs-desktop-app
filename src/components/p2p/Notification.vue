<template>
    <div>
      <div class="list-group list-group-flush my-n3">
            <div v-for='(notif, i) of notification' :key = 'i' class="list-group-item bg-transparent">
                <div class="row align-items-center">
                    <div class="col-lg-1 col-md-1 col-sm-1">
                        <span class="fe fe-box fe-24"></span>
                    </div>
                    <div class="col-lg-8 col-md-8 col-sm-8">
                        <small><strong>{{notif.title}}</strong></small>
                        <div class="my-0 text-muted small">{{notif.body}}</div>
                    </div>
                    <div class="col-lg-2 col-md-2 col-sm-2">
                        <small class="badge badge-pill badge-light text-muted">{{notif.created_at.toDateString()}}</small>
                  </div>
                </div>
            </div>
        </div> <!-- / .list-group -->
    </div>
</template>

<script>
import { mapState } from 'vuex';

    export default {
        data() {
            return {

            }
        },

        computed: {
            ...mapState({
                'notification': (state) => state.user.notification
            })
        },

        components: {
        }
    }
</script>