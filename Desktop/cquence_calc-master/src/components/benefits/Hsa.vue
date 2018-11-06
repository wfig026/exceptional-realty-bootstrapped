<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row" v-html="benefit.acf.hsa.health_savings_accounts_hsas"></b-row>
  </b-col>
</template>

<script>
export default {
	name: 'Hsa',
	props: [
		'benefit'
	]
}
</script>