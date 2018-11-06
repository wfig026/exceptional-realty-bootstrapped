<template>
  <b-col class="no-side-pad">
    <b-row v-html="benefit.acf.eligibility.eligibility_details"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'Eligiblity',
		props: [
			'benefit'
		]
	}
</script>