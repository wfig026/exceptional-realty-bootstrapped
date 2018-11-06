<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row" v-html="benefit.acf.employee_assistance_program.employee_assistance_details"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'EmployeeAssistanceProgram',
		props: [
			'benefit'
		]
	}
</script>