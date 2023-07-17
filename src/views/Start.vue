<template>
  <div id="Start">
    <v-row justify="center" class="my-5">
      <v-card :width="width" class="pa-5" rounded=".rounded-lg">
        <v-row no-gutters>
          <v-col cols="4">
            <v-img
              class="text-white"
              cover
              src="../assets/bg-sidebar-desktop.svg">
              <div v-for="(item, i) in stepTitle" :key="i" class="flex-container">
                <v-row no-gutters justify="start" class="ma-3">
                  <v-col cols="2">
                    <v-avatar :color="step === i + 1 ? 'light' : null"
                      :class="step === i + 1 ? null : 'outline'">
                      {{ i + 1 }}
                    </v-avatar>
                  </v-col>
                  <v-col cols="5">
                    <h5 style="font-family: 'Ubuntu';">STEP {{ i + 1 }}</h5>
                    <h3 style="font-family: 'Ubuntu';">{{ item }}</h3>
                  </v-col>
                </v-row>
              </div>
            </v-img>
          </v-col>
          <v-col cols="8">
            <v-row class="pa-15">
              <v-col cols="12">
                <v-form ref="form1" class="mt-10" lazy-validation>
                  <v-window v-model="step">
                    <v-window-item :value="1">
                      <div>
                        <p class="text-h4">Personal Info</p>
                        <p class="text-h6">Please provide your name, email address and phone number.</p>
                          <div class="mt-10">
                            <h5 class="label-input">Name</h5>
                            <v-text-field
                              style="font-family: 'Ubuntu';"
                              v-model="form.name"
                              variant="outlined"
                              prepend-inner-icon="mdi-account-circle-outline"
                              color="marine"
                              placeholder="e.g Stephen King"
                              :rules="nameRules"
                              required
                            ></v-text-field>
                          </div>
                          <div class="mt-2">
                            <h5 class="label-input">Email Address</h5>
                            <v-text-field
                              style="font-family: 'Ubuntu';"
                              v-model="form.email"
                              variant="outlined"
                              color="marine"
                              required
                              :rules="emailRules"
                              prepend-inner-icon="mdi-email-outline"
                              type="email"
                              placeholder="john@google.com"
                            ></v-text-field>
                          </div>
                          <div class="mt-2">
                            <h5 class="label-input">Phone number</h5>
                            <v-text-field
                              v-model="form.phone"
                              style="font-family: 'Ubuntu';"
                              variant="outlined"
                              color="marine"
                              required
                              :counter="10"
                              :rules="phoneRules"
                              type="number"
                              prepend-inner-icon="mdi-phone-outline"
                              placeholder="e.g +1 234 567 890"
                            ></v-text-field>
                          </div>
                      </div>
                    </v-window-item>
                    <v-window-item :value="2">
                      <div>
                        <p class="text-h4">Select your plan</p>
                        <p class="text-h6">You have the option of monthly of yearly billing.</p>
                        <v-item-group selected-class="bg-alabaster"
                          mandatory>
                          <v-container class="mt-10">
                            <v-row>
                              <v-col
                                v-for="n in plan"
                                :key="n"
                                cols="12"
                                md="4">
                                <v-item
                                  v-slot="{ isSelected, selectedClass, toggle }">
                                  <div @click="toggle">
                                    <v-card
                                      rounded=".rounded-lg"
                                      :color="isSelected ? 'purplish' : 'lightGray'"
                                      variant="outlined"
                                      dark
                                      v-model="form.cardSelected" 
                                      :class="selectedClass"
                                      height="220"
                                      @click="selectedToggle(n)">
                                      <v-row class="ma-6">
                                        <v-col cols="12" class="pb-10" align="start">
                                          <v-avatar>
                                            <v-img
                                              :src="n.icon"
                                              :lazy-src="n.icon"
                                            ></v-img>
                                          </v-avatar>
                                        </v-col>
                                        <v-col cols="12" class="pt-4" align="start">
                                          <h4 class="title-card">{{ n.title }}</h4>
                                          <h5 class="subtitle-card">{{ n.subtitle }}</h5>
                                        </v-col>
                                      </v-row>
                                    </v-card>
                                </div>
                                </v-item>
                              </v-col>
                            </v-row>
                          </v-container>
                        </v-item-group>
                        <div class="selected-plan">
                          <v-row justify="center">
                            <v-col cols="5">
                              <v-switch
                                v-model="form.modalidad"
                                hide-details
                                color="marine"
                                inset
                                true-value="Yearly"
                                false-value="Monthly"
                              >
                                <template v-slot:prepend>
                                  <h4 class="title-card">Monthly</h4>
                                </template>
                                <template v-slot:label>
                                  <h4 class="title-card">Yearly</h4>
                                </template>
                              </v-switch>
                            </v-col>
                          </v-row>
                        </div>
                      </div>
                    </v-window-item>
                    <v-window-item :value="3">
                      <div>
                        <p class="text-h4">Pick add-ons</p>
                        <p class="text-h6">Add-ons help enhance your gaming experience.</p>
                        <v-container fluid class="mt-10">
                          <v-card v-for="n in pick" :key="n"
                            variant="outlined"
                            :color="n ? 'purplish' : 'lightGray'"
                            class="mb-5 pa-5">
                            <v-row align="center">
                              <v-col cols="1" align="center">
                                <v-checkbox
                                  hide-details
                                  v-model="form.add"
                                  :value="n"
                                ></v-checkbox>
                              </v-col>
                              <v-col cols="8">
                                <h4 class="title-card">{{ n.title }}</h4>
                                <h4 class="description">{{ n.sub }}</h4>
                              </v-col>
                              <v-col cols="3" align="center">
                                <h4 class="price">{{ n.des }}</h4>
                              </v-col>
                            </v-row>
                          </v-card>
                        </v-container>
                      </div>
                    </v-window-item>
                    <v-window-item :value="4">
                      <div>
                        <p class="text-h4">Finishg up</p>
                        <p class="text-h6">Double-check everything looks OK before confirming.</p>
                        <v-container class="mt-10">
                          <v-card color="alabaster" class="pa-10" flat>
                            <v-row align="center">
                              <v-col cols="10">
                                <h4 class="title-card">{{ form.cardSelected.title}} ({{form.modalidad }})</h4>
                                <a v-on:click="goToStep" class="btn"> Change </a>
                              </v-col>
                              <v-col cols="2" align="center">
                                <h4 class="title-card">
                                  $ {{ form.cardSelected.price}}/{{ form.modalidad === 'Monthly' ? 'mo' : 'yr'}}
                                </h4>
                              </v-col>
                              <v-divider class="my-3"/>
                              <v-col cols="12" v-for="item in form.add" :key="item">
                                <v-row>
                                  <v-col cols="10">
                                    <h4 class="description">{{ item.title}}</h4>
                                  </v-col>
                                  <v-col cols="2" align="center">
                                    <h4 class="totaly">
                                      $ {{ item.price}}/{{ form.modalidad === 'Monthly' ? 'mo' : 'yr'}}
                                    </h4>
                                  </v-col>
                                </v-row>
                              </v-col>
                            </v-row>
                          </v-card>
                          <div class="pa-5">
                            <v-row>
                              <v-col cols="8">
                                <h4 class="description">
                                  Total (per {{ form.modalidad === 'Monthly' ? 'month' : 'year'}})
                                </h4>
                              </v-col>
                              <v-col cols="4" align="center">
                                <h1 class="totaly">
                                  $ {{ total(form) }}/{{ form.modalidad === 'Monthly' ? 'mo' : 'yr'}}
                                </h1>
                              </v-col>
                            </v-row>
                          </div>
                        </v-container>
                      </div>
                    </v-window-item>
                    <v-window-item :value="5">
                      <v-row class="pa-10">
                        <v-col align="center" cols="12" class="pa-5">
                          <v-img
                            class="text-white"
                            cover
                            height="200"
                            width="200"
                            aspect-ratio="1/1"
                            src="../assets/icon-thank-you.svg"></v-img>
                        </v-col>
                        <v-col cols="12" align="center" class="pt-8">
                          <p class="text-h4">Thank you</p>
                          <p class="text-h6">
                            Thank you for confirming your subscription! We hope you have fun using our plataform.
                            Ifyou ever  need support, please feel free to email us at support@loremgaming.com
                          </p>
                        </v-col>
                      </v-row>
                    </v-window-item>
                  </v-window>
                </v-form>  
              </v-col>
              <v-col cols="12">
                <v-card-actions>
                  <v-btn
                    style="font-family: 'Ubuntu';"
                    v-if="step > 1 && step < 5"
                    variant="text"
                    @click="step--">
                    Go Back
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    style="font-family: 'Ubuntu';"
                    v-if="step < 5"
                    color="marine"
                    variant="flat"
                    @click="stepNext()">
                    {{ step === 4 ? 'Confirm' : 'Next Step' }}
                  </v-btn>
                </v-card-actions>
              </v-col>
            </v-row> 
          </v-col>
        </v-row>
      </v-card>
    </v-row>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useDisplay } from 'vuetify'
  import arcade from '../assets/icon-arcade.svg'
  import advanced from '../assets/icon-advanced.svg'
  import pro from '../assets/icon-pro.svg'
  
  export default {
    setup () {
      const { name } = useDisplay()
      const width = computed(() => {
        switch (name.value) {
          case 'xs': return 600
          case 'sm': return 960
          case 'md': return 1080
          case 'lg': return 1220
          case 'xl': return 1440
          case 'xxl': return 2560
        }
      })
      return { width }
    },
    data () {
      return {
        step: 1,
        stepTitle: [
          'YOUR INFO', 'SELECT PLAN', 'ADD-ONS', 'SUMMARY'
        ],
        form: {
          name: '',
          email: '',
          phone: '',
          cardSelected: {},
          modalidad: 'Monthly',
          add: []
        },
        nameRules: [
          v => !!v || 'Name is required'
        ],
        phoneRules: [
          v => !!v || 'Phone number is required',
          v => (v && v.length <= 10)  || 'Phone number must be less than 10 characters',
        ],
        emailRules: [
          v => !!v || 'Email address is required',
          v => (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(v)) || 'Must be a valid e-mail'
        ],
      }
    },
    computed: {
      plan () {
        if (this.form.modalidad === 'Monthly') {
          return [
            {
              icon: arcade,
              title: 'Arcade',
              subtitle: '$ 9/mo',
              price: 9
            },
            {
              icon: advanced,
              title: 'Advanced',
              subtitle: '$ 12/mo',
              price: 12
            },
            {
              icon: pro,
              title: 'Pro',
              subtitle: '$ 15/mo',
              price: 15
            }
          ]
        } else {
          return [
          {
              icon: arcade,
              title: 'Arcade',
              subtitle: '$ 90/yr',
              price: 90
            },
            {
              icon: advanced,
              title: 'Advanced',
              subtitle: '$ 120/yr',
              price: 120
            },
            {
              icon: pro,
              title: 'Pro',
              subtitle: '$ 150/yr',
              price: 150
            }
          ]
        }
      },
      pick () {
        if (this.form.modalidad === 'Monthly') {
          return [
            {
              title: 'Online Service',
              sub: 'Access to multiplayer games',
              des: '$ 1/mo',
              price: 1
            },
            {
              title: 'Large storage',
              sub: 'Extra 1TB of cloud save',
              des: '$ 2/mo',
              price: 2
            },
            {
              title: 'Customizable profile',
              sub: 'Custom theme on your profile',
              des: '$ 2/mo',
              price: 2
            }
          ]
        } else {
          return [
            {
              title: 'Online Service',
              sub: 'Access to multiplayer games',
              des: '$ 10/yr',
              price: 10
            },
            {
              title: 'Large storage',
              sub: 'Extra 1TB of cloud save',
              des: '$ 20/yr',
              price: 20
            },
            {
              title: 'Customizable profile',
              sub: 'Custom theme on your profile',
              des: '$ 20/yr',
              price: 20
            }
          ]
        }
      }
    },
    methods: {
      total(item) {
        let totaly = 0
        let reduce = item.add.reduce((a, b) => a + b.price, 0);
        let price = item.cardSelected.price
        totaly = reduce + price
        console.log(reduce)
        console.log(this.form.cardSelected.price)
        return totaly
      },
      async stepNext () {
        const { valid } = await this.$refs.form1.validate()
        if (valid) {
          switch (this.step) {
            case 1:
              this.step++
              break;
            case 2: 
              if (Object.keys(this.form.cardSelected).length === 0) {
                alert('Seleccione un plan')
              } else {
                this.step++
              }
              break;
            case 3:
              this.step++
              break;
            case 4:
              this.step++
              break;
          }
        }

      },
      selectedToggle(item) {
        this.form.cardSelected = item
      },
      goToStep () {
        this.step = 2
      }
    },
    
  }
</script>

<style scoped>
.outline {
  border: 1px solid white;
  color: white;
}
.flex-container {
  padding: 20px;
  justify-content: center;
  align-content: center;
}

.flex-container > div {
  justify-content: center;
  margin: 10px;
}
.text-h4 {
  color: #02295a;
  font-weight: bold;
  font-family: 'Ubuntu' !important;
  margin-bottom: 8px;
}
.text-h6 {
  color: #9699ab;
  font-family: 'Ubuntu' !important;
}
.text-title {
  color: #02295a;
  font-weight: bold;
  font-family: 'Ubuntu' !important;
}
.label-input {
  color: #02295a;
  font-weight: 600;
  margin-bottom: 5px;
  font-family: 'Ubuntu' !important;
}
.title-card {
  color: #02295a;
  font-weight: bold;
  font-family: 'Ubuntu' !important;
}
.subtitle-card {
  color: #9699ab;
  font-family: 'Ubuntu' !important;
}
.selected-plan {
  background-color: #fafbff;
  margin: 2%;
  padding: 1%;
  border-radius: 14px;
}
.description {
  color: #9699ab;
  font-weight: 500;
  font-family: 'Ubuntu' !important;
}
.price {
  color: #473dff;
  font-weight: 500;
  font-family: 'Ubuntu' !important;
}
.btn {
  color: #9699ab;
  font-weight: 600;
  text-decoration-line: underline;
  font-family: 'Ubuntu' !important;
}
.totaly {
  color: #02295a;
  font-weight: 500;
  font-family: 'Ubuntu' !important;
}
</style>


