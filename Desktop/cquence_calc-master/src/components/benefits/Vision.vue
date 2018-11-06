<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row no-bottom-pad">
      <b-container fluid>
          <b-row>
            <b-col class="no-side-pad">
              <h5>{{ benefit.acf.vision_benefits.explanation_of_benefits.explanation_of_benefits_title }}</h5>
            </b-col>
          </b-row>
        </b-container>
        <b-container fluid>
          <!-- Desktop Table -->
          <b-row class="desktop">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins vision" v-for="(expOfBenefits, index) in benefit.acf.vision_benefits.explanation_of_benefits.explanation_of_benefits_table" :key="index">
                <b-row>
                  <b-col class="benefits-table-col" v-html="expOfBenefits.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="expOfBenefits.column_2"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="expOfBenefits.column_3"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <!-- End Desktop Table -->
          <!-- Mobile Tables -->
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins vision" v-for="expOfBenefits in benefit.acf.vision_benefits.explanation_of_benefits.explanation_of_benefits_table" :key="expOfBenefits.column_1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="expOfBenefits.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="expOfBenefits.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <b-row class="mobile">
            <b-col class="benefits-table-wrap no-side-pad" style="margin-top: 0;">
              <b-container fluid class="benefits-table-ins vision" v-for="expOfBenefits in benefit.acf.vision_benefits.explanation_of_benefits.explanation_of_benefits_table" :key="expOfBenefits.column_1">
                <b-row>
                  <b-col class="benefits-table-col" v-html="expOfBenefits.column_1"></b-col>
                  <b-col class="benefits-table-col text-center" v-html="expOfBenefits.column_3"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
          <!-- End Mobile Tables -->
        </b-container>
    </b-row>
    <b-row class="benefits_details_row" v-html="benefit.acf.vision_benefits.participating_providers"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'Vision',
		props: [
			'benefit'
		]
	}
</script>