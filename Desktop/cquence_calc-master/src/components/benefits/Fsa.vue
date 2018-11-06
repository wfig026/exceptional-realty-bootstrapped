<template>
  <b-col class="no-side-pad">
    <b-row class="benefits_details_row" v-html="benefit.acf.fsa.flexible_spending_accounts"></b-row>
  </b-col>
</template>

<script>
export default {
	name: 'Fsa',
	props: [
		'benefit'
	]
}
</script>