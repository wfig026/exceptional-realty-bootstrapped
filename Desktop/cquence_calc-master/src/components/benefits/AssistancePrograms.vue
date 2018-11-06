<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row" v-html="benefit.acf.assistance_programs.assistance_program_details"></b-row>
    <b-row class="benefits_details_row no-bottom-pad">
        <b-container fluid>
          <b-row>
            <b-col class="no-side-pad"><h5>State Programs</h5></b-col>
          </b-row>
          <b-row>
            <b-col class="states-table-wrap no-side-pad">
              <b-container fluid class="states-table-ins" v-for="state in benefit.acf.assistance_programs.state_programs" :key="state.column_1">
                <b-row>
                  <b-col class="states-table-col" style="padding-left: 0;" v-html="state.column_1"></b-col>
                  <b-col class="states-table-col" v-html="state.column_2"></b-col>
                </b-row>
              </b-container>
            </b-col>
          </b-row>
        </b-container>
    </b-row>
    <b-row class="benefits_details_row" v-html="benefit.acf.assistance_programs.additional_information"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'AssistancePrograms',
		props: [
			'benefit'
		]
	}
</script>