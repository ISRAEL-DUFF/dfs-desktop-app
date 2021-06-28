<template>
    <main role="main" class="main-content">
        <div class='container-fluid justify-content-center'>
            <div class='row'>
            <div class='col-3'></div>
            <div class='col-6'>
                <div class='form-group'>
                <label for='country'>Select your country</label>
                <select id = 'country' @change = 'toggleCountry' class='form-control' style = 'color:orange; background-color: black; font-size: 20px'>
                    <option value = ''></option>
                    <option v-for='(country, i) in countries' :key='i' 
                    :value='country.name' :selected = 'country.name === "Nigeria"'>
                    {{country.name}}
                    </option>
                </select>
                </div>
            </div>
            <div class='col-3'></div>
            </div>
            <div class='row' v-if='!showUploadScreen && selectedCountry === "Nigeria"'>
                <div class='col-12 col-sm-4'>
                    <div class='card shadow'>
                        <div class="card-body">
                            <div class='upload-tab' @click = 'setVerificationType("I-Passport")'>
                                <!-- <img src='@/assets/img/glob5.jpg'> -->
                                <p class='id-type'>International Passport</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-12 col-sm-4'>
                    <div class='card shadow'>
                        <div class="card-body">
                            <div class='upload-tab' @click = 'setVerificationType("ID-Card")'>
                                <i class='ti-id-badge' style='width: 100px; height: 100px'></i>
                                <p class='id-type'>Identity Card</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-12 col-sm-4'>
                    <div class='card shadow'>
                        <div class='card-body'>
                            <div class='upload-tab' @click = 'setVerificationType("Drivers-License")'>
                                <i class='ti-arrow-circle-down'></i>
                                <p class='id-type'>Drivers License</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class='row' v-if='showUploadScreen'>
                <div class='col-12 col-sm-3'>
                    <p class='id-type'>{{description}}</p>
                    <button @click = 'back' class='btn btn-info' v-if='selectedCountry === "Nigeria"'>Back</button>
                </div>
                <div class='col-12 col-sm-9'>
                    <div class='row'>
                        <div class='col-12 col-sm-3'>
                            <div class="form-group">
                                Upload an image file:
                                <input class='form-control' type="file" @change="previewImage" accept="image/*">
                                <!-- <img v-if = 'loading' src = '@/assets/img/loading2.gif' style='width:60px; height: 50px'> -->
                                <div v-if = 'loading' class="spinner-border mr-3 text-primary" role="status">
                                    <span class="sr-only">Loading...</span>
                                </div>
                            </div>
                        </div>
                        <div class='col-12 col-sm-9'>
                            <div class="image-preview" v-if="imageData.length > 0">
                                <img class="preview" :src="imageData">
                            </div>
                            <button @click = 'uploadDocument' class='btn btn-round' v-if='showUploadButton'>Upload Document</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>
  import axios from 'axios'
  import config from '@/config'
import { setTimeout } from 'timers';

  export default {
    data () {
      return {
        imageData: "",  // we will store base64 format of image in this string
        fileInput: '',
        selectedCountry: 'Nigeria',
        verificationType: '',
        showUploadScreen: false,
        showUploadButton: false,
        loading: false,
        description: '',
        countries: [
          {"name": "Afghanistan", "code": "AF"},
          {"name": "Åland Islands", "code": "AX"},
          {"name": "Albania", "code": "AL"},
          {"name": "Algeria", "code": "DZ"},
          {"name": "American Samoa", "code": "AS"},
          {"name": "AndorrA", "code": "AD"},
          {"name": "Angola", "code": "AO"},
          {"name": "Anguilla", "code": "AI"},
          {"name": "Antarctica", "code": "AQ"},
          {"name": "Antigua and Barbuda", "code": "AG"},
          {"name": "Argentina", "code": "AR"},
          {"name": "Armenia", "code": "AM"},
          {"name": "Aruba", "code": "AW"},
          {"name": "Australia", "code": "AU"},
          {"name": "Austria", "code": "AT"},
          {"name": "Azerbaijan", "code": "AZ"},
          {"name": "Bahamas", "code": "BS"},
          {"name": "Bahrain", "code": "BH"},
          {"name": "Bangladesh", "code": "BD"},
          {"name": "Barbados", "code": "BB"},
          {"name": "Belarus", "code": "BY"},
          {"name": "Belgium", "code": "BE"},
          {"name": "Belize", "code": "BZ"},
          {"name": "Benin", "code": "BJ"},
          {"name": "Bermuda", "code": "BM"},
          {"name": "Bhutan", "code": "BT"},
          {"name": "Bolivia", "code": "BO"},
          {"name": "Bosnia and Herzegovina", "code": "BA"},
          {"name": "Botswana", "code": "BW"},
          {"name": "Bouvet Island", "code": "BV"},
          {"name": "Brazil", "code": "BR"},
          {"name": "British Indian Ocean Territory", "code": "IO"},
          {"name": "Brunei Darussalam", "code": "BN"},
          {"name": "Bulgaria", "code": "BG"},
          {"name": "Burkina Faso", "code": "BF"},
          {"name": "Burundi", "code": "BI"},
          {"name": "Cambodia", "code": "KH"},
          {"name": "Cameroon", "code": "CM"},
          {"name": "Canada", "code": "CA"},
          {"name": "Cape Verde", "code": "CV"},
          {"name": "Cayman Islands", "code": "KY"},
          {"name": "Central African Republic", "code": "CF"},
          {"name": "Chad", "code": "TD"},
          {"name": "Chile", "code": "CL"},
          {"name": "China", "code": "CN"},
          {"name": "Christmas Island", "code": "CX"},
          {"name": "Cocos (Keeling) Islands", "code": "CC"},
          {"name": "Colombia", "code": "CO"},
          {"name": "Comoros", "code": "KM"},
          {"name": "Congo", "code": "CG"},
          {"name": "Congo, The Democratic Republic of the", "code": "CD"},
          {"name": "Cook Islands", "code": "CK"},
          {"name": "Costa Rica", "code": "CR"},
          {"name": "Cote D'Ivoire", "code": "CI"},
          {"name": "Croatia", "code": "HR"},
          {"name": "Cuba", "code": "CU"},
          {"name": "Cyprus", "code": "CY"},
          {"name": "Czech Republic", "code": "CZ"},
          {"name": "Denmark", "code": "DK"},
          {"name": "Djibouti", "code": "DJ"},
          {"name": "Dominica", "code": "DM"},
          {"name": "Dominican Republic", "code": "DO"},
          {"name": "Ecuador", "code": "EC"},
          {"name": "Egypt", "code": "EG"},
          {"name": "El Salvador", "code": "SV"},
          {"name": "Equatorial Guinea", "code": "GQ"},
          {"name": "Eritrea", "code": "ER"},
          {"name": "Estonia", "code": "EE"},
          {"name": "Ethiopia", "code": "ET"},
          {"name": "Falkland Islands (Malvinas)", "code": "FK"},
          {"name": "Faroe Islands", "code": "FO"},
          {"name": "Fiji", "code": "FJ"},
          {"name": "Finland", "code": "FI"},
          {"name": "France", "code": "FR"},
          {"name": "French Guiana", "code": "GF"},
          {"name": "French Polynesia", "code": "PF"},
          {"name": "French Southern Territories", "code": "TF"},
          {"name": "Gabon", "code": "GA"},
          {"name": "Gambia", "code": "GM"},
          {"name": "Georgia", "code": "GE"},
          {"name": "Germany", "code": "DE"},
          {"name": "Ghana", "code": "GH"},
          {"name": "Gibraltar", "code": "GI"},
          {"name": "Greece", "code": "GR"},
          {"name": "Greenland", "code": "GL"},
          {"name": "Grenada", "code": "GD"},
          {"name": "Guadeloupe", "code": "GP"},
          {"name": "Guam", "code": "GU"},
          {"name": "Guatemala", "code": "GT"},
          {"name": "Guernsey", "code": "GG"},
          {"name": "Guinea", "code": "GN"},
          {"name": "Guinea-Bissau", "code": "GW"},
          {"name": "Guyana", "code": "GY"},
          {"name": "Haiti", "code": "HT"},
          {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
          {"name": "Holy See (Vatican City State)", "code": "VA"},
          {"name": "Honduras", "code": "HN"},
          {"name": "Hong Kong", "code": "HK"},
          {"name": "Hungary", "code": "HU"},
          {"name": "Iceland", "code": "IS"},
          {"name": "India", "code": "IN"},
          {"name": "Indonesia", "code": "ID"},
          {"name": "Iran, Islamic Republic Of", "code": "IR"},
          {"name": "Iraq", "code": "IQ"},
          {"name": "Ireland", "code": "IE"},
          {"name": "Isle of Man", "code": "IM"},
          {"name": "Israel", "code": "IL"},
          {"name": "Italy", "code": "IT"},
          {"name": "Jamaica", "code": "JM"},
          {"name": "Japan", "code": "JP"},
          {"name": "Jersey", "code": "JE"},
          {"name": "Jordan", "code": "JO"},
          {"name": "Kazakhstan", "code": "KZ"},
          {"name": "Kenya", "code": "KE"},
          {"name": "Kiribati", "code": "KI"},
          {"name": "Korea, Democratic People'S Republic of", "code": "KP"},
          {"name": "Korea, Republic of", "code": "KR"},
          {"name": "Kuwait", "code": "KW"},
          {"name": "Kyrgyzstan", "code": "KG"},
          {"name": "Lao People'S Democratic Republic", "code": "LA"},
          {"name": "Latvia", "code": "LV"},
          {"name": "Lebanon", "code": "LB"},
          {"name": "Lesotho", "code": "LS"},
          {"name": "Liberia", "code": "LR"},
          {"name": "Libyan Arab Jamahiriya", "code": "LY"},
          {"name": "Liechtenstein", "code": "LI"},
          {"name": "Lithuania", "code": "LT"},
          {"name": "Luxembourg", "code": "LU"},
          {"name": "Macao", "code": "MO"},
          {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
          {"name": "Madagascar", "code": "MG"},
          {"name": "Malawi", "code": "MW"},
          {"name": "Malaysia", "code": "MY"},
          {"name": "Maldives", "code": "MV"},
          {"name": "Mali", "code": "ML"},
          {"name": "Malta", "code": "MT"},
          {"name": "Marshall Islands", "code": "MH"},
          {"name": "Martinique", "code": "MQ"},
          {"name": "Mauritania", "code": "MR"},
          {"name": "Mauritius", "code": "MU"},
          {"name": "Mayotte", "code": "YT"},
          {"name": "Mexico", "code": "MX"},
          {"name": "Micronesia, Federated States of", "code": "FM"},
          {"name": "Moldova, Republic of", "code": "MD"},
          {"name": "Monaco", "code": "MC"},
          {"name": "Mongolia", "code": "MN"},
          {"name": "Montserrat", "code": "MS"},
          {"name": "Morocco", "code": "MA"},
          {"name": "Mozambique", "code": "MZ"},
          {"name": "Myanmar", "code": "MM"},
          {"name": "Namibia", "code": "NA"},
          {"name": "Nauru", "code": "NR"},
          {"name": "Nepal", "code": "NP"},
          {"name": "Netherlands", "code": "NL"},
          {"name": "Netherlands Antilles", "code": "AN"},
          {"name": "New Caledonia", "code": "NC"},
          {"name": "New Zealand", "code": "NZ"},
          {"name": "Nicaragua", "code": "NI"},
          {"name": "Niger", "code": "NE"},
          {"name": "Nigeria", "code": "NG"},
          {"name": "Niue", "code": "NU"},
          {"name": "Norfolk Island", "code": "NF"},
          {"name": "Northern Mariana Islands", "code": "MP"},
          {"name": "Norway", "code": "NO"},
          {"name": "Oman", "code": "OM"},
          {"name": "Pakistan", "code": "PK"},
          {"name": "Palau", "code": "PW"},
          {"name": "Palestinian Territory, Occupied", "code": "PS"},
          {"name": "Panama", "code": "PA"},
          {"name": "Papua New Guinea", "code": "PG"},
          {"name": "Paraguay", "code": "PY"},
          {"name": "Peru", "code": "PE"},
          {"name": "Philippines", "code": "PH"},
          {"name": "Pitcairn", "code": "PN"},
          {"name": "Poland", "code": "PL"},
          {"name": "Portugal", "code": "PT"},
          {"name": "Puerto Rico", "code": "PR"},
          {"name": "Qatar", "code": "QA"},
          {"name": "Reunion", "code": "RE"},
          {"name": "Romania", "code": "RO"},
          {"name": "Russian Federation", "code": "RU"},
          {"name": "RWANDA", "code": "RW"},
          {"name": "Saint Helena", "code": "SH"},
          {"name": "Saint Kitts and Nevis", "code": "KN"},
          {"name": "Saint Lucia", "code": "LC"},
          {"name": "Saint Pierre and Miquelon", "code": "PM"},
          {"name": "Saint Vincent and the Grenadines", "code": "VC"},
          {"name": "Samoa", "code": "WS"},
          {"name": "San Marino", "code": "SM"},
          {"name": "Sao Tome and Principe", "code": "ST"},
          {"name": "Saudi Arabia", "code": "SA"},
          {"name": "Senegal", "code": "SN"},
          {"name": "Serbia and Montenegro", "code": "CS"},
          {"name": "Seychelles", "code": "SC"},
          {"name": "Sierra Leone", "code": "SL"},
          {"name": "Singapore", "code": "SG"},
          {"name": "Slovakia", "code": "SK"},
          {"name": "Slovenia", "code": "SI"},
          {"name": "Solomon Islands", "code": "SB"},
          {"name": "Somalia", "code": "SO"},
          {"name": "South Africa", "code": "ZA"},
          {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
          {"name": "Spain", "code": "ES"},
          {"name": "Sri Lanka", "code": "LK"},
          {"name": "Sudan", "code": "SD"},
          {"name": "Suriname", "code": "SR"},
          {"name": "Svalbard and Jan Mayen", "code": "SJ"},
          {"name": "Swaziland", "code": "SZ"},
          {"name": "Sweden", "code": "SE"},
          {"name": "Switzerland", "code": "CH"},
          {"name": "Syrian Arab Republic", "code": "SY"},
          {"name": "Taiwan, Province of China", "code": "TW"},
          {"name": "Tajikistan", "code": "TJ"},
          {"name": "Tanzania, United Republic of", "code": "TZ"},
          {"name": "Thailand", "code": "TH"},
          {"name": "Timor-Leste", "code": "TL"},
          {"name": "Togo", "code": "TG"},
          {"name": "Tokelau", "code": "TK"},
          {"name": "Tonga", "code": "TO"},
          {"name": "Trinidad and Tobago", "code": "TT"},
          {"name": "Tunisia", "code": "TN"},
          {"name": "Turkey", "code": "TR"},
          {"name": "Turkmenistan", "code": "TM"},
          {"name": "Turks and Caicos Islands", "code": "TC"},
          {"name": "Tuvalu", "code": "TV"},
          {"name": "Uganda", "code": "UG"},
          {"name": "Ukraine", "code": "UA"},
          {"name": "United Arab Emirates", "code": "AE"},
          {"name": "United Kingdom", "code": "GB"},
          {"name": "United States", "code": "US"},
          {"name": "United States Minor Outlying Islands", "code": "UM"},
          {"name": "Uruguay", "code": "UY"},
          {"name": "Uzbekistan", "code": "UZ"},
          {"name": "Vanuatu", "code": "VU"},
          {"name": "Venezuela", "code": "VE"},
          {"name": "Viet Nam", "code": "VN"},
          {"name": "Virgin Islands, British", "code": "VG"},
          {"name": "Virgin Islands, U.S.", "code": "VI"},
          {"name": "Wallis and Futuna", "code": "WF"},
          {"name": "Western Sahara", "code": "EH"},
          {"name": "Yemen", "code": "YE"},
          {"name": "Zambia", "code": "ZM"},
          {"name": "Zimbabwe", "code": "ZW"}
        ]
      }
    },
    methods: {
      previewImage: function(event) {
        // Reference to the DOM input element
        var input = event.target;
        // Ensure that you have a file before attempting to read it
        if (input.files && input.files[0]) {
            // create a new FileReader to read this image and convert to base64 format
            var reader = new FileReader();
            this.fileInput = input.files[0]
            // Define a callback function to run, when FileReader finishes its job
            reader.onload = (e) => {
                // Note: arrow function used here, so that "this.imageData" refers to the imageData of Vue component
                // Read image as base64 and set to imageData
                this.imageData = e.target.result;
                this.showUploadButton = true
            }
            // Start the reader job - read file as a data url (base64 format)
            reader.readAsDataURL(input.files[0]);
        } else {
          this.showUploadButton = false
        }
      },

      toggleCountry: function (evt) {
        this.selectedCountry = evt.target.value
        if (this.selectedCountry !== 'Nigeria') {
          this.description = `Upload a photo of yourself holding your credentials`
          this.showUploadScreen = true
          this.verificationType = 'foreign'
        } else {
          this.showUploadScreen = false
        }
      },

      setVerificationType(type) {
        this.verificationType = type
        this.showUploadScreen = true
        switch(this.verificationType) {
          case "I-Passport":
            this.description = `Upload Your International passport`
          break

          case "ID-Card":
            this.description = `Upload Your Identity card such Nimc etc.`
          break

          case "Drivers-License":
            this.description = `Upload a recent and valid Drivers Lincense`
          break

          default: 
            this.description = ''

        }
      },

      back() {
        this.verificationType = '',
        this.showUploadScreen = false
        this.showUploadButton = false
        this.selectedCountry = 'Nigeria'
        this.imageData = ''
      },

      uploadDocument () {
        let f = new FormData();
        f.append('verificationType', this.verificationType)
        f.append('country', this.selectedCountry)
        f.append('user_id', this.$store.getters.userProfile.userId)
        f.append('email', this.$store.getters.userProfile.email)
        f.append('file', this.fileInput)
        this.loading = true
        axios.post(`${config.apiBaseUrl}/user/upload/verified/doc`, f)
          .then((res) => {
            setTimeout(()=> {
              if(res.data.success)  this.$alert('Document uploaded Successfully!!!')
              else this.$fire({
                  title: 'Upload Error',
                  text: res.data.message,
                  type: 'error'
                })
                this.loading = false
                this.back()
            }, 2000)
          })
      }
    }
  }
</script>

<style>
  .file-upload-form, .image-preview {
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    padding: 2px;
    height: 300px;
    width: 300px;
}
img.preview {
    width: 500px;
    height: 350px;
    box-shadow: -2px -2px  3px orange, 2px 2px 3px orange;
    border: 1px solid #DDD;
    padding: 5px;
}

.upload-tab {
  cursor: pointer;
  padding: 10px;
}

.upload-tab:hover {
  /* background-color: #FE610E; */
  box-shadow: -2px -2px  3px orange, 2px 2px 3px orange;
  color: orange
}

.upload-tab img {
  height: 50% !important;
  width: 50% !important;
  margin-left: auto !important;
  margin-right: auto !important;
}

.container-card {
  height: 500px
}

.id-type {
  margin: 30px;
  font-size: 25px;
  font-weight: bold;
  text-align: center
}

</style>