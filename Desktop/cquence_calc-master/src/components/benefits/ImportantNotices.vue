<template>
  <b-col class="no-side-pad">
      <b-row v-html="benefit.acf.important_notices.important_notices"></b-row>
  </b-col>
</template>

<script>
export default {
	name: 'ImportantNotices',
	props: [
		'benefit'
	]
}
</script>