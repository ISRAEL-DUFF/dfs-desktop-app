<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-12">
                <div class="row align-items-center my-3">
                    <div class="col">
                        <h2 class="page-title">Prepaid SMS Packages</h2>
                    </div>
                    <div class="col-auto">
                        <button type="button" class="btn btn-lg btn-primary"><span class="fe fe-plus fe-16 mr-3"></span>New</button>
                    </div>
                </div>
                <div class="file-container border-top">
                    <div class="file-panel mt-4">
                        <hr class="my-4">
                        <h6 class="mb-3">Packages</h6>
                        <div class="row my-4 pb-4">
                            <div v-for='(p, i) of prepaidPacks' :key = 'i' class="col-md-3">
                                <div class="card shadow text-center mb-4">
                                    <div class="card-body file">
                                        <div class="file-action">
                                            <button type="button" class="btn btn-link dropdown-toggle more-vertical p-0 text-muted mx-auto" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span class="text-muted sr-only">Action</span>
                                            </button>
                                            <div class="dropdown-menu m-2">
                                                <a class="dropdown-item" href="#"><i class="fe fe-chevrons-right fe-12 mr-4"></i>Move</a>
                                                <a class="dropdown-item" href="#"><i class="fe fe-copy fe-12 mr-4"></i>Copy</a>
                                                <a class="dropdown-item" href="#"><i class="fe fe-edit-3 fe-12 mr-4"></i>Rename</a>
                                                <a class="dropdown-item" href="#"><i class="fe fe-delete fe-12 mr-4"></i>Delete</a>
                                                <a class="dropdown-item" href="#"><i class="fe fe-share fe-12 mr-4"></i>Share</a>
                                                <a class="dropdown-item" href="#"><i class="fe fe-download fe-12 mr-4"></i>Download</a>
                                            </div>
                                        </div>
                                        <div class="circle circle-lg bg-light my-4">
                                            <span class="fe fe-archive fe-24 text-secondary"></span>
                                        </div>
                                        <div class="file-info">
                                            <span class="badge badge-light text-muted mr-2">MP</span>
                                            <span class="badge badge-pill badge-light text-muted">{{`${p.unit / 1000}k`}}</span>
                                        </div>
                                    </div> <!-- .card-body -->
                                    <div class="card-footer bg-transparent border-0 fname">
                                        <strong>{{`${p.unit} Numbers`}}</strong>
                                    </div> <!-- .card-footer -->
                                </div> <!-- .card -->
                            </div> <!-- .col -->
                        </div> <!-- .row -->
                    </div> <!-- .file-panel -->
                    <div class="info-panel">
                        <div class="info-content p-3 border-left">
                            <div class="d-flex align-items-center mb-3">
                                <div class="flex-fill">
                                    <span class="circle circle-sm bg-white mr-2">
                                        <span class="fe fe-image fe-12 text-success"></span>
                                    </span>
                                    <span class="h6">Creative Logo.PNG</span>
                                </div>
                                <span class="btn close-info">
                                    <i class="fe fe-x"></i>
                                </span>
                            </div>
                            <ul class="nav nav-tabs nav-fill mb-3" id="file-detail" role="tablist">
                                <li class="nav-item">
                                    <a class="nav-link active" id="tab-detail" data-toggle="tab" href="#detail" role="tab" aria-controls="detail" aria-selected="true">Details</a>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" id="tab-activity" data-toggle="tab" href="#activity" role="tab" aria-controls="activity" aria-selected="false">Activities</a>
                                </li>
                            </ul>
                            <div class="tab-content" id="file-tabs">
                                <div class="tab-pane fade show active" id="detail" role="tabpanel" aria-labelledby="tab-detail">
                                    <img src="/static/assets/images/products/p4.jpg" alt="..." class="img-fluid rounded">
                                    <ul class="avatars-list my-4 mx-0">
                                        <li>
                                            <a href="#!" class="avatar avatar-sm">
                                                <img alt="..." class="avatar-img rounded-circle" src="/static/assets/avatars/face-2.jpg">
                                            </a>
                                        </li>
                                        <li>
                                            <a href="#!" class="avatar avatar-sm">
                                                <img alt="..." class="avatar-img rounded-circle" src="/static/assets/avatars/face-4.jpg">
                                            </a>
                                        </li>
                                    </ul>
                                    <dl class="row my-4 small">
                                        <dt class="col-6 text-muted">Owner</dt>
                                        <dd class="col-6">Whilemina Pate</dd>
                                        <dt class="col-6 text-muted">Type</dt>
                                        <dd class="col-6">Image</dd>
                                        <dt class="col-6 text-muted">Size</dt>
                                        <dd class="col-6">32M</dd>
                                        <dt class="col-6 text-muted">Location</dt>
                                        <dd class="col-6"><a href="#" class="text-muted">Design File</a></dd>
                                        <dt class="col-6 text-muted">Created at</dt>
                                        <dd class="col-6">Aug 20, 2020</dd>
                                        <dt class="col-6 text-muted">Last update</dt>
                                        <dd class="col-6">Aug 21, 2020</dd>
                                    </dl>
                                </div> <!-- .tab-pane -->
                                <div class="tab-pane fade" id="activity" role="tabpanel" aria-labelledby="tab-activity">
                                    <div class="timeline">
                                        <!-- <div class="pb-3 timeline-item item-primary">
                                            <div class="pl-5 small">
                                                <div class="mb-1">
                                                    <strong>@Brown Asher</strong><span class="text-muted mx-1">have uploaded</span><strong>Tinydash</strong>
                                                </div>
                                                <span class="badge badge-pill badge-dark">1h ago</span>
                                            </div>
                                        </div>
                                        <div class="pb-3 timeline-item item-warning">
                                            <div class="pl-5 small">
                                                <div class="mb-3">
                                                    <strong>@Fletcher</strong><span class="text-muted mx-1">shared</span><strong>Tiny Admin</strong>
                                                </div>
                                                <ul class="avatars-list mb-2">
                                                    <li>
                                                        <a href="#!" class="avatar avatar-sm">
                                                        <img alt="..." class="avatar-img rounded-circle" src="./assets/avatars/face-1.jpg">
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!" class="avatar avatar-sm">
                                                        <img alt="..." class="avatar-img rounded-circle" src="./assets/avatars/face-4.jpg">
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="#!" class="avatar avatar-sm">
                                                        <img alt="..." class="avatar-img rounded-circle" src="./assets/avatars/face-3.jpg">
                                                        </a>
                                                    </li>
                                                </ul>
                                                <span class="badge badge-pill badge-dark">1h ago</span>
                                            </div>
                                        </div>
                                        <div class="pb-3 timeline-item item-success">
                                            <div class="pl-5 small">
                                                <div class="mb-2">
                                                    <strong>@Kelley Sonya</strong><span class="text-muted small mx-1">has commented on</span><strong>Advanced table</strong>
                                                </div>
                                                <div class="card d-inline-flex mb-2">
                                                    <div class="card-body bg-light py-2 px-3"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. </div>
                                                </div>
                                                <span class="badge badge-pill badge-dark">1h ago</span>
                                            </div>
                                        </div> -->
                                    </div> <!-- / .timeline -->
                                </div> <!-- .tab-pane -->
                            </div> <!-- .tab-content -->
                        </div>
                    </div>
                </div> <!-- .file-container -->
            </div> <!-- .col -->
        </div> <!-- .row -->
    </div> <!-- .container-fluid -->
</template>

<script>
    export default {
        data() {
            return {
                inited: false,
                prepaidPacks: [
                    {
                        unit: 5000,
                        name: '5000 Numbers',
                        unit_price: 7000
                    },
                    {
                        unit: 10000,
                        name: '5000 Numbers',
                        unit_price: 13000
                    },
                    {
                        unit: 25000,
                        name: '5000 Numbers',
                        unit_price: 19000
                    },
                    {
                        unit: 50000,
                        name: '5000 Numbers',
                        unit_price: 27000
                    },
                    {
                        unit: 5000,
                        name: '5000 Numbers',
                        unit_price: 48000
                    }
                ]
            }
        },

        mounted() {
            this.$eventHub.$on('commonJs-load-complete',() => {
                this.$reloadScripts('filePanelJs')
                this.inited = true
            })
            if(!this.inited) {
                this.$reloadScripts('filePanelJs')
            }
        }
    }
</script>