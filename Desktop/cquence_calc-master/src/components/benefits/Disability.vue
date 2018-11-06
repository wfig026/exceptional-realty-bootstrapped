<template>
  <b-col class="no-side-pad">
    <!-- Desktop Table -->
    <b-row class="benefits_details_row no-bottom-pad no-bottom-border desktop">
      <b-col class="benefits-table-wrap no-side-pad">
        <b-container fluid class="benefits-table-ins disability" v-for="disabilityRow in benefit.acf.disability_benefits.disability_table_row" :key="disabilityRow.disability_table_col_1">
          <b-row>
            <b-col class="benefits-table-col" v-html="disabilityRow.disability_table_col_1"></b-col>
            <b-col class="benefits-table-col text-center" v-html="disabilityRow.disability_table_col_2"></b-col>
            <b-col class="benefits-table-col text-center" v-html="disabilityRow.disability_table_col_3"></b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <!-- End Desktop Table -->
    <!-- Mobile Tables -->
    <b-row class="mobile">
      <b-col class="benefits-table-wrap no-side-pad">
        <b-container fluid class="benefits-table-ins disability" v-for="(disabilityRow, index) in benefit.acf.disability_benefits.disability_table_row" :key="index">
          <b-row>
            <b-col class="benefits-table-col" v-html="disabilityRow.disability_table_col_1"></b-col>
            <b-col class="benefits-table-col text-center" v-html="disabilityRow.disability_table_col_2"></b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <b-row class="benefits_details_row bottom-margin mobile">
      <b-col class="benefits-table-wrap no-side-pad" style="margin-top: 0;">
        <b-container fluid class="benefits-table-ins disability" v-for="disabilityRow in benefit.acf.disability_benefits.disability_table_row" :key="disabilityRow.disability_table_col_1">
          <b-row>
            <b-col class="benefits-table-col" v-html="disabilityRow.disability_table_col_1"></b-col>
            <b-col class="benefits-table-col text-center" v-html="disabilityRow.disability_table_col_3"></b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
    <!-- End Mobile Tables -->
  </b-col>
</template>

<script>
  export default {
    name: 'Disability',
    props: [
      'benefit'
    ]
  }
</script>