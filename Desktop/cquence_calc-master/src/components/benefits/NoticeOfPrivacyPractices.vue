<template>
  <b-col class="no-side-pad">
    <b-row v-html="benefit.acf.notice_of_privacy_practices.privacy_policy"></b-row>
    <b-row v-html="benefit.acf.notice_of_privacy_practices.effective_date"></b-row>
  </b-col>
</template>

<script>
	export default {
		name: 'NoticeOfPrivacyPractices',
		props: [
			'benefit'
		]
	}
</script>