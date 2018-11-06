<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row" v-html="benefit.acf.additional_benefits.additional_benefits_details"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'AdditionalBenefits',
		props: [
			'benefit'
		]
	}
</script>