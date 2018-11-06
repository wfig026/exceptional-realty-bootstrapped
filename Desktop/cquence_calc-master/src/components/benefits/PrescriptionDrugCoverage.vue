<template>
  <b-col class="no-side-pad">
    <b-row v-html="benefit.acf.prescription_drug_coverage.prescription_drug_coverage_policy"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'PrescriptionDrugCoverage',
		props: [
			'benefit'
		]
	}
</script>