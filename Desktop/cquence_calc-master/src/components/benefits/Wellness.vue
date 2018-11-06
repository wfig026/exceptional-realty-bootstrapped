<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row" v-html="benefit.acf.wellness_benefits.wellness_screenings"></b-row>
    <b-row class="benefits_details_row" v-html="benefit.acf.wellness_benefits.wellness_requirements"></b-row>
    <!-- <b-row class="benefits_details_row no-bottom-pad no-bottom-border">
      <b-container fluid>
          <b-row>
            <b-col class="no-side-pad">
              <h5>{{ benefit.acf.wellness_benefits.medical_insurance_rates.medical_insurance_rates_title }}</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="no-side-pad" v-html="benefit.acf.wellness_benefits.medical_insurance_rates.medical_insurance_rates_details"></b-col>
          </b-row>
        </b-container>
        <b-container fluid>

          <b-row class="desktop">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="(medicalInsRate, index) in benefit.acf.wellness_benefits.medical_insurance_rates.medical_insurance_rates_table" :key="index">
                <b-row>
                  <b-col class="benefits-table-col" v-html="medicalInsRate.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="medicalInsRate.column_2"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="medicalInsRate.column_3"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>

          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="medicalInsRate in benefit.acf.wellness_benefits.medical_insurance_rates.medical_insurance_rates_table" :key="medicalInsRate.column_1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="medicalInsRate.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="medicalInsRate.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="medicalInsRate in benefit.acf.wellness_benefits.medical_insurance_rates.medical_insurance_rates_table" :key="medicalInsRate.column_1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="medicalInsRate.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="medicalInsRate.column_3"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>

        </b-container>
    </b-row> -->
    <b-row class="benefits_details_row">
      <b-container fluid>
          <b-row>
            <b-col class="no-side-pad">
              <h5>{{ benefit.acf.wellness_benefits.wellness_reminders.wellness_reminders_title }}</h5>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="no-side-pad" v-html="benefit.acf.wellness_benefits.wellness_reminders.wellness_reminders_subtitle"></b-col>
          </b-row>
        </b-container>
        <b-container fluid>
          <!-- Desktop Table -->
          <b-row class="desktop">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="notParticipating in benefit.acf.wellness_benefits.wellness_reminders.not_participating_table" :key="notParticipating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="notParticipating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_2"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_3"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_4"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_5"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <!-- End Desktop Table -->
          <!-- Mobile Tables -->
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="(notParticipating, index) in benefit.acf.wellness_benefits.wellness_reminders.not_participating_table" :key="index">
                <b-row>
                  <b-col class="benefits-table-col" v-html="notParticipating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="notParticipating in benefit.acf.wellness_benefits.wellness_reminders.not_participating_table" :key="notParticipating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="notParticipating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_3"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="notParticipating in benefit.acf.wellness_benefits.wellness_reminders.not_participating_table" :key="notParticipating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="notParticipating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_4"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="notParticipating in benefit.acf.wellness_benefits.wellness_reminders.not_participating_table" :key="notParticipating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="notParticipating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="notParticipating.column_5"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <!-- End Mobile Tables -->
          <b-row>
            <b-col class="no-side-pad top-margin bottom-margin" v-html="benefit.acf.wellness_benefits.wellness_reminders.not_participating_additional_details"></b-col>
          </b-row>
        </b-container>
        <b-container fluid>
          <b-row>
            <b-col class="no-side-pad top-margin" v-html="benefit.acf.wellness_benefits.wellness_reminders.participating_header"></b-col>
          </b-row>
          <!-- Desktop Table -->
          <b-row class="desktop">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="(participating, index) in benefit.acf.wellness_benefits.wellness_reminders.participating_table" :key="index">
                <b-row>
                  <b-col class="benefits-table-col" v-html="participating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_2"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_3"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_4"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_5"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <!-- End Desktop Table -->
          <!-- Mobile Tables -->
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="participating in benefit.acf.wellness_benefits.wellness_reminders.participating_table" :key="participating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="participating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="participating in benefit.acf.wellness_benefits.wellness_reminders.participating_table" :key="participating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="participating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_3"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="participating in benefit.acf.wellness_benefits.wellness_reminders.participating_table" :key="participating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="participating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_4"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins wellness" v-for="participating in benefit.acf.wellness_benefits.wellness_reminders.participating_table" :key="participating.column1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="participating.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="participating.column_5"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <!-- End Mobile Tables -->
          <b-row>
            <b-col class="no-side-pad top-margin" v-html="benefit.acf.wellness_benefits.wellness_reminders.participating_additional_details"></b-col>
          </b-row>
        </b-container>
    </b-row>
  </b-col>
</template>

<script>
  export default {
    name: 'Wellness',
    props: [
      'benefit'
    ]
  }
</script>