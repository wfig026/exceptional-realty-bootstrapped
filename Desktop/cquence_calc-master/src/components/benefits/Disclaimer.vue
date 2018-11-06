<template>
  <b-col class="no-side-pad">
      <b-row v-html="benefit.acf.disclaimer.disclaimer"></b-row>
  </b-col>
</template>

<script>
export default {
	name: 'Disclaimer',
	props: [
		'benefit'
	]
}
</script>