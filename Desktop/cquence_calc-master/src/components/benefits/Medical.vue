<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row">
      <b-container fluid>
          <b-row>
            <b-col class="no-side-pad">
              <h5>{{ benefit.acf.medical_benefits.explanation_of_benefits.explanation_of_benefits_title }}</h5>
            </b-col>
          </b-row>
        </b-container>
        <b-container fluid>
          <b-row>
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins" v-for="(expOfBenefits, index) in benefit.acf.medical_benefits.explanation_of_benefits.explanation_of_benefits_table" :key="index">
                <b-row>
                  <b-col v-if="expOfBenefits.is_this_a_title_row == true" class="benefits-table-header" v-html="expOfBenefits.row_title"></b-col>
                </b-row>
                <b-row>
                  <b-col v-if="expOfBenefits.is_this_a_title_row == false" class="benefits-table-col" v-html="expOfBenefits.columns.column_1"></b-col>
                  <b-col v-if="expOfBenefits.is_this_a_title_row == false" class="benefits-table-col text-center" v-html="expOfBenefits.columns.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
        <b-container fluid>
          <b-row>
            <b-col class="top-margin no-side-pad">
              <b-row v-html="benefit.acf.medical_benefits.explanation_of_benefits.explanation_of_benefits_additional_details"></b-row>
            </b-col>
          </b-row>
        </b-container>
    </b-row>
    <b-row class="benefits_details_row" v-html="benefit.acf.medical_benefits.notification_requirements"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'Medical',
		props: [
			'benefit'
		]
	}
</script>