const pdfImage = require('./base64_images.js').pdfImage;

const createAgeRangeStr = (min, max) => {
	let str = '';
	if (min && min != '') {
		str += min;
	} else {
		str += '<';
	}
	if (min && max && min != '' & max != '') {
		str += '-' + max;
	}
	if (!max || max === '') {
		str += '+';
	}
	if ((max && max != '') && (!min || min === '')) {
		str += (parseInt(max) + 1).toString();
	}
	return str;
}

const findBenefitByType = (benefits, type) => {
	return benefits.filter(benefit => {
		return benefit.acf.benefit_type === type;		
	})[0];
}

const computeDeathCost = (rateKey, amount, benefits) => {
	if (benefits && benefits.length > 0) {
		let rate = findBenefitByType(benefits, 'voluntary-accidental-death-dismemberment').acf.voluntary_accidental_death.rate_table[rateKey];
		let cost = parseFloat(parseInt(amount)/1000) * parseFloat(rate);
		return `$${ parseFloat(cost).toFixed(2) }`;
	} else {
		return '$0.00';
	}
}

const computeVolLifeCost = (rate, divisor, amount, benefits) => {
	if (benefits && benefits.length >	0) {
		let cost = parseFloat(parseInt(amount)/divisor) * parseFloat(rate);
		return `$${ parseFloat(cost).toFixed(2) }`;
	} else {
		return '$0.00';
	}
}

const roundVolProp = (step, max, prop) => {
  var finalRound;
	let initialRound = Math.min(Math.round(prop/step) * step, max);
  if (parseFloat(prop) != 0 && parseFloat(initialRound) === 0) {
    finalRound = step;
  } else {
    finalRound = initialRound;
  }
  return finalRound;
}

const findCost = (benefit, voluntaryTotal, volLifeTotal, deathTotal, volLifeWaived, volDeathWaived, fsaTotal) => {
  var str;
  	if (benefit.acf.benefit_type === 'fsa') {
  		if (fsaTotal === '$0.00') {
  			str = '-';
  		} else {
	  		str = fsaTotal;
  		}
  	} else if (benefit.acf.specialized_enrollment_option_fields) {
    if ((benefit.user_plan_cost != null && parseFloat(benefit.user_plan_cost) != 0 && benefit.selectedPlan) || benefit.acf.specialized_option_plan_to_use === 'voluntary_plans') {
      if (benefit.acf.specialized_option_plan_to_use === 'fsahsa') {
	       str = `$${ (parseFloat(benefit.user_plan_cost)/12).toFixed(2) }`;
      } else if (benefit.acf.specialized_option_plan_to_use === 'voluntary_plans') {
        if (voluntaryTotal === null) {
          str = '-';
        } else {
          str = `$${ parseFloat(voluntaryTotal).toFixed(2) }`;
        }
      } else {
        str = `$${ parseFloat(benefit.user_plan_cost).toFixed(2) }`;
      }
    } else if (benefit.acf.specialized_option_plan_to_use === 'fsahsa' && (!benefit.user_plan_cost || parseFloat(benefit.user_plan_cost) === 0) && benefit.selectedPlan.plan_label === 'Waive') {
      str = '$0.00';
    } else if (benefit.acf.benefit_type === 'voluntary-life-insurance') {
    	if (volLifeWaived) {
	      str = '$0.00';
    	} else if (parseFloat(volLifeTotal.replace('$', '')) === 0) {
    		str = '-'
    	} else {
    		str = `$${ parseFloat(volLifeTotal.replace('$', '')).toFixed(2) }`;
    	}
    } else if (benefit.acf.benefit_type === 'voluntary-accidental-death-dismemberment') {
      if (volDeathWaived) { 
        str = '$0.00';
      } else if (parseFloat(deathTotal.replace('$', '')) === 0) {
        str = '-';
      } else {
        str = `$${ parseFloat(deathTotal.replace('$', '')).toFixed(2) }`;
      }
    } else {
      str = '-';
    }
  } else if (benefit.selectedPlan) {
    str = `${ benefit.selectedPlan.plan_cost < 0 ? "-" : "" }$${ Math.abs(parseFloat(benefit.selectedPlan.plan_cost)).toFixed(2) }`;
  } else {
    str = '-';
  }
  return str;
}

const findTitle = (benefit, joinStr, hospitalIndemnity, criticalIllness, accidentInsurance, volLifeLabel, deathLabel, volLifeWaived, volDeathWaived, fsaWaived, fsaEmp, fsaFam) => {
  var title;
  if (benefit.acf.specialized_option_plan_to_use === 'voluntary_plans') {
    let critIllMap = {
      'ee': 'EE',
      'eech': 'EECH',
      'fam': 'Family',
      'eesp': 'EESP'
    };
    let labelMap = {
      'Employee': 'EE',
      'Employee and Child(ren)': 'EECH',
      'Employee and Spouse': 'EESP',
      'Family': 'Family'
    }
    let volPlans = {
      hospIndem: labelMap[hospitalIndemnity.plan_sidebar_label] || labelMap[hospitalIndemnity.plan_label],
      critIll: criticalIllness.type ? critIllMap[criticalIllness.type] : '',
      accIns: labelMap[accidentInsurance.plan_sidebar_label] || labelMap[accidentInsurance.plan_label]
    }
		var titleArr = []; 
		if (criticalIllness.waived && accidentInsurance.plan_label == "Waive" && hospitalIndemnity.plan_label == "Waive") {
  		titleArr.push('Waived');
  	} else {
	  	if (volPlans.accIns && volPlans.accIncs != '') {
				titleArr.push(`Accident: ${ volPlans.accIns }`);
			}
			if (volPlans.critIll && volPlans.critIll != '') {
				if (criticalIllness.waived != true) {
					titleArr.push(`Crit. Illness: ${ volPlans.critIll }`);
				}
			} 
			if (volPlans.hospIndem && volPlans.hospIndem != '') {
				titleArr.push(`Hosp. Indemnity: ${ volPlans.hospIndem }`);
			}
	  }
    title = titleArr.length > 0 ? titleArr.join(joinStr) : 'Not elected yet';
  } else if (benefit.acf.benefit_type === 'fsa') {
  	var titleArr = [];
  	if (fsaWaived) {
  		titleArr.push('Waived');
  	} else {
	  	if (parseInt(fsaEmp) != 0) {
	  		titleArr.push(`Employee: $${ parseFloat(fsaEmp/12).toFixed(2) }`);
	  	}
	  	if (parseInt(fsaFam) != 0) {
	  		titleArr.push(`Family: $${ parseFloat(fsaFam/12).toFixed(2) }`);
	  	}
	  }
	  title = titleArr.length > 0 ? titleArr.join(joinStr) : 'Not elected yet';
	} else {
    if (benefit.selectedPlan && (benefit.selectedPlan.plan_label || benefit.selectedPlan.plan_sidebar_label)) {
      title = benefit.selectedPlan.plan_sidebar_label || benefit.selectedPlan.plan_label;
    } else if (benefit.acf.benefit_type === 'voluntary-accidental-death-dismemberment') {
    	if (volDeathWaived) {
    		title = 'Waived';
    	} else {
	    	if (deathLabel === '') {
		      title = 'Not elected yet';
	    	} else {
		    	title = deathLabel;
	    	}
    	}
    } else if (benefit.acf.benefit_type === 'voluntary-life-insurance') {
    	if (volLifeWaived) {
    		title = 'Waived';
    	} else {
    		if (volLifeLabel === '') {
    			title = 'Not elected yet';
    		} else {
    			title = volLifeLabel;
    		}
    	}
    } else {
      title = 'Not elected yet';
    }
  }
  return title;
}

const createPDF =	(benefits, fsaTotal, fsaWaived, fsaEmp, fsaFam, voluntaryTotal, voluntaryTotalCost, deathTotal, totalCost, hospitalIndemnity, criticalIllness, accidentInsurance, volLifeWaived, volDeathWaived, volLifeLabel, deathLabel) => {
	let cleanedBenefits = benefits.filter(benefit => {
		return !benefit.acf.additional_details;
	}).map(benefit => {
		let proposedName = benefit.acf.provided_by_cquence ? 'Provided by CQuence' : findTitle(benefit, '\n', hospitalIndemnity, criticalIllness, accidentInsurance, volLifeLabel, deathLabel, volLifeWaived, volDeathWaived, fsaWaived, fsaEmp, fsaFam);
		if (!proposedName || proposedName === 'Not elected yet') {
			var name = '-';
		} else {
			var name = proposedName;
		}
		return {
			title: benefit.acf.abbrev_title,
			name: name,
			cost: formatNum(findCost(benefit, voluntaryTotal, voluntaryTotalCost, deathTotal, volLifeWaived, volDeathWaived, fsaTotal))
		}
	})
	cleanedBenefits.push({
		title: '',
		plan: '',
		cost: ''
	})
	cleanedBenefits.push({
		title: 'Estimated Monthly Total Cost',
		plan: '',
		cost: formatNum(parseFloat(totalCost).toFixed(2))
	})

	var columns = [
		{ title: 'Benefit', dataKey: 'title' },
		{ title: 'Selected Plan', dataKey: 'name' },
		{ title: 'Monthly Cost', dataKey: 'cost' }
	]

	var imgData = pdfImage;
	var doc = new jsPDF('p', 'pt');
	doc.setProperties({
		title: 'CQuence Health Group - Personalized Benefits Summary',
		author: 'CQuence Health Group',
		creator: 'CQuence Health Group Benefits Calculator'
	});
	doc.addImage(imgData, 'JPEG', 40, 40, 515, 40);
	doc.setFontSize(18);
	doc.setFontType("bold");
	doc.setTextColor(0, 35, 61);
	doc.text('Your Personalized Benefits Summary', 40, 130);
	doc.setFontSize(12);
	doc.setFontType("normal");
	doc.setTextColor(51, 51, 51);
	doc.text(40, 150, 'Provided by CQuence Health Group');	
	doc.autoTable(columns, cleanedBenefits, {
		margin: {
			top: 170
		},
		headerStyles: {
			fillColor: [225, 102, 38]
		},
		bodyStyles: {
			textColor: [51, 51, 51]
		}
	});
	doc.setFontSize(12);
	doc.setFontType("bold");
	doc.setTextColor(0, 35, 61);
	doc.text(40, 575, 'Disclaimer');
	doc.setFontSize(10);
	doc.setFontType("italic");
	doc.setTextColor(51, 51, 51);
	doc.text(40, 595, 'This personalized benefits summary serves to provide estimated costs and eligibility only. This summary does not' + '\n' + 'guarantee eligibility, and eligibility requirements must still be met. CQuence Health Group may modify plan offerings,' + '\n' + 'plan premiums, and eligibility requirements.');
	doc.text(40, 640, 'Please be sure to review the Important Notices regarding employee benefits.');
	doc.text(40, 660, 'In addition, this summary does not take the place of formal benefits enrollment once eligibility requirements' + '\n' + 'have been met.');
	doc.setFontSize(12);
	doc.setFontType("bold");
	doc.setTextColor(0, 35, 61);
	doc.text(40, 710, 'Additional Questions? Contact the CQuence HR Team');
	doc.setFontSize(10);
	doc.setFontType("bold");
	doc.setTextColor(51, 51, 51);
	doc.text(40, 730, 'Bruce Stec')
	doc.setFontType("normal");
	doc.text(40, 742, 'Vice President of Human Resources' + '\n' + '(402) 334-5000 x1137' + '\n' + 'bstec@cquencehealth.com');
	doc.setFontType("bold");
	doc.text(250, 730, 'Kayla Engel')
	doc.setFontType("normal");
	doc.text(250, 742, 'Senior HR Generalist' + '\n' + '(402) 334-5000 x1166' + '\n' + 'kengel@cquencehealth.com');
	doc.setFontType("bold");
	doc.text(430, 730, 'Lynn Owen')
	doc.setFontType("normal");
	doc.text(430, 742, 'HR Business Partner' + '\n' + '(402) 334-5000 x1120' + '\n' + 'lowen@cquencehealth.com');

	return doc;
}

const formatNum = num => {
	num = num ? num.toString().replace(/(\,|\$)/g, '') : '';
	if (num === '' || !num) {
		return '';
	} else if (num === '-') {
		return '-';
	} else {
		var negative = /^-{1}/.test(num);
		num = num.replace(/[^0-9\.]/, '');
		var decimal = num.indexOf('.');
		var wholeNum = decimal === -1 ? num : num.slice(0, decimal);

		var wholeNumLength = wholeNum.length;
		for (var i = wholeNumLength - 3; i > 0; i -= 3) {
			wholeNum = wholeNum.slice(0, i) + ',' + wholeNum.slice(i);
		}

		wholeNum = `$${ wholeNum }`;

		if (negative) {
			wholeNum = '-' + wholeNum;
		}

		if (decimal != -1) {
			wholeNum += num.slice(decimal);
		}

		return wholeNum;
	}
}

module.exports = {
	createAgeRangeStr: createAgeRangeStr,
	findBenefitByType: findBenefitByType,
	computeDeathCost: computeDeathCost,
	computeVolLifeCost: computeVolLifeCost,
	roundVolProp: roundVolProp,
	findCost: findCost,
	findTitle: findTitle,
	createPDF: createPDF
}