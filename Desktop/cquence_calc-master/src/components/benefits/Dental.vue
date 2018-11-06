<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row no-bottom-pad">
      <b-container fluid>
          <b-row>
            <b-col class="no-side-pad">
              <h5>{{ benefit.acf.dental_benefits.explanation_of_benefits.explanation_of_benefits_title }}</h5>
            </b-col>
          </b-row>
        </b-container>
        <b-container fluid>
          <b-row>
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins dental" v-for="(expOfBenefits, index) in benefit.acf.dental_benefits.explanation_of_benefits.explanation_of_benefits_table" :key="index">
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
    </b-row>
    <b-row class="benefits_details_row" v-html="benefit.acf.dental_benefits.participating_providers"></b-row>
    <b-row class="benefits_details_row" v-html="benefit.acf.dental_benefits.pretreatment_review"></b-row>
  </b-col>
</template>

<script>
  export default {
    name: 'Dental',
    props: [
      'benefit'
    ]
  }
</script>