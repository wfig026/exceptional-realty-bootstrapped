<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row no-bottom-pad bottom-margin">
        <b-container fluid>
          <b-row>
            <b-col class="benefits-table-wrap no-side-pad">
              <b-container fluid class="benefits-table-ins life-ins" v-for="(life, index) in benefit.acf.life_insurance.life_insurance_table" :key="index">
                <b-row>
                  <b-col v-if="life.is_this_a_title_row == true" class="benefits-table-header" v-html="life.row_title"></b-col>
                </b-row>
                <b-row>
                  <b-col v-if="life.is_this_a_title_row == false" class="benefits-table-col" v-html="life.columns.column_1"></b-col>
                  <b-col v-if="life.is_this_a_title_row == false" class="benefits-table-col text-center" v-html="life.columns.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
    </b-row>
  </b-col>
</template>

<script>
  export default {
    name: 'LifeInsurance',
    props: [
      'benefit'
    ]
  }
</script>