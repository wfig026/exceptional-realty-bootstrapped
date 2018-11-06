<?php

	require 'vendor/autoload.php';
	include 'config.php';

	if ( !empty( $_FILES['pdf'] ) ) {
		move_uploaded_file( $_FILES['pdf']['tmp_name'], './tmp/test5.pdf' );

		$email = new \SendGrid\Mail\Mail();
		$email->setFrom("hr@cquencehealth.com", "CQuence HR");
		$email->setSubject("Your Personalized Benefits Summary");
		$email->addTo($_POST['email']);
		$email->addContent("text/html", "<p>Thank you for utilizing the CQuence Personalized Benefits Calculator. Attached you will find your personalized report based on the selections you made. This is an estimate and does not guarantee eligibility or take the place of formal benefits enrollment once eligibility requirements have been met. Should you want to create a new estimate of costs, feel free to revisit the <a href='http://cquencecalc.clients01.stratusinteractive.com'>online calculator</a> and generate a new report.</p><p>Thank you,<br/>Human Resources</p><p>----------------------------</p><p><em>*This personalized benefits calculator serves to provide estimated costs and eligibility only. This calculator does not guarantee eligibility, and eligibility requirements must still be met. CQuence Health Group may modify plan offerings, plan premiums, and eligibility requirements.  </em></p><p><em>Please be sure to review the <a href='https://www.cquencehealth.com/wp-content/uploads/2018/06/cq-benefits-important-notices-2018.pdf'>Important Notices</a> regarding employee benefits.</em></p><p><em>In addition, this calculator does not take the place of formal benefits enrollment once eligibility requirements have been met.</em></p>");

		$file_encoded = base64_encode( file_get_contents( './tmp/test5.pdf' ) );
		$email->addAttachment(
			$file_encoded,
			"application/pdf",
			"cquence-health-personalized-benefits-summary.pdf",
			"attachment"
		);

		$sendgrid = new \SendGrid(SENDGRID_API_KEY);
		try {
			$response = $sendgrid->send($email);
			print $response->statusCode();
			echo $_POST['email'];
		} catch (Exception $e) {
			echo 'Exception';
		}
	} else {
		echo 'No data';
	}
	exit();

?>