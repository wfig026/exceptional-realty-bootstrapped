<template>
  <b-col class="no-side-pad">
    <b-row v-html="benefit.acf.enrollment.enrollment_details"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'EnrollmentDetails',
		props: [
			'benefit'
		]
	}
</script>