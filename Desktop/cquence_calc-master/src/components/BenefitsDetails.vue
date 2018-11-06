<template>
  <b-container fluid id="benefits-deatils-ins"class="benefits_wrap" @scroll="handleScroll">
    <b-row>
      <b-col>
        <b-container fluid>
          <b-row class="mobile-back-summary-wrap">
            <span @click="$emit('back-to-summary')" class="mobile-back-summary bottom-margin">Back to Summary</span>
          </b-row>
          <b-row class="benefits_details_row">
            <b-col class="no-side-pad">
              <h2>{{ activeBenefit.acf.abbrev_title != '' ? activeBenefit.acf.abbrev_title : activeBenefit.title.rendered }}</h2>
              <span class="provider" v-if="activeBenefit.acf.provider != ''">{{ activeBenefit.acf.provider }}</span>
            </b-col>
          </b-row>
          <b-row class="benefits_details_row" 
              v-if="activeBenefit.acf.does_plan_have_enrollment_options && 
              activeBenefit.acf.benefit_type != 'voluntary-life-insurance' && 
              activeBenefit.acf.benefit_type != 'voluntary-accidental-death-dismemberment' && 
              activeBenefit.acf.benefit_type != 'voluntary-plan'">
            <b-col class="no-side-pad">
              <h5>Enrollment Options</h5>
              <template v-if="activeBenefit.acf.specialized_enrollment_option_fields">
                <template v-if="activeBenefit.acf.specialized_option_plan_to_use === 'fsahsa'">
                <!-- HSA specific -->
                  <template v-if="activeBenefit.acf.benefit_type === 'hsa'">
                    <b-row class="enrollment-opts-form fsa-hsa bottom-margin">
                      <form
                        action=""
                        v-on:change="$emit('plan-chosen', $event.target.value)"
                        class="enrollement-options-form fsa-hsa">
                        <template v-for="option in activeBenefit.acf[activeBenefit.acf.specialized_option_plan_to_use + '_options']">
                          <label class="enrollment-option-container" :key="option.plan_label">
                            <input
                              type="radio"
                              name="cost"
                              :value="option.plan_label"
                              :checked="activeBenefit.selectedPlan.plan_label === option.plan_label" />
                            <span class="checkmark" :class="{ noCost: option.plan_label == 'Waive'}"></span>
                            <span class="enrollment-option-label" :class="{ noCost: option.plan_label == 'Waive'}">{{ option.plan_label }}</span>
                          </label>
                        </template>
                      </form>
                    </b-row>
                    <template v-if="activeBenefit.selectedPlan.should_type_allow_user_input">
                      <h5>Enter your desired yearly contribution</h5>
                      <b-row class="input-group fsa-hsa">
                        <span class="input-dollar-sign">$</span>
                        <input
                          type="number" 
                          name="user-input-cost"
                          min="0"
                          :max="activeBenefit.selectedPlan.maximum_allowed_amount" 
                          :value="activeBenefit.user_plan_cost"
                          v-on:change="$emit('user-cost-changed', $event.target.value)" />
                      </b-row>
                    </template>
                  </template>
                  <!-- FSA specific -->
                  <template v-if="activeBenefit.acf.benefit_type === 'fsa'">
                    <b-row class="enrollment-opts-form fsa-hsa fsa-only bottom-margin">
                      <form
                        action=""
                        @change="$emit('change-fsa-waive', $event)"
                        class="enrollment-options-form fsa-hsa">
                        <label class="enrollment-option-container">
                          <input
                            type="checkbox"
                            name="cost"
                            value="Waive"
                            :checked="!!fsaWaived" />
                          <span class="checkmark noCost"></span>
                          <span class="enrollment-option-label noCost">Waive FSA</span>
                        </label>
                      </form>
                    </b-row>
                    <b-row v-if="!fsaWaived">
                      <h5>Enter your desired yearly contributions</h5>
                    </b-row>
                    <b-row v-if="!fsaWaived">
                      <template v-for="option in activeBenefit.acf[activeBenefit.acf.specialized_option_plan_to_use + '_options']">
                        <b-col v-if="option.type === 'employee' || option.type === 'family'">
                          <label>{{ option.plan_label }}</label>
                          <b-row class="input-group fsa-hsa">
                            <span class="input-dollar-sign">$</span>
                            <input
                              type="number"
                              name="user-input-cost"
                              min="0"
                              :data-type="option.type"
                              :data-label="option.plan_label"
                              :max="option.maximum_allowed_amount"
                              :value="option.type === 'employee' ? fsaEmp : fsaFam"
                              @change="$emit('fsa-val-change', $event)" />
                          </b-row>
                        </b-col>
                      </template>
                    </b-row>
                  </template>
                </template>
              </template>
              <template v-else>
                <b-row class="enrollment-opts-form bottom-margin">
                  <form
                    action=""
                    v-on:change="$emit('plan-chosen', $event.target.value)"
                    class="enrollment-options-form">
                    <template v-for="option in activeBenefit.acf.plan_options">
                      <label class="enrollment-option-container" :key="option.plan_label">
                        <input
                          type="radio"
                          name="cost"
                          :value="option.plan_label"
                          :checked="activeBenefit.selectedPlan.plan_label === option.plan_label" />
                        <span class="checkmark" :class="{ noCost: option.plan_cost == 0}"></span>
                        <span class="enrollment-option-label" :class="{ noCost: option.plan_cost == 0}"> {{ option.plan_label }}</span>
                        <br>
                        <template v-if="parseFloat(option.plan_cost) != 0 && activeBenefit.acf.benefit_type != 'wellness'">
                          <span class="enrollment-option-price">{{ `${ option.plan_cost < 0 ? "-" : "" }$${Math.abs(parseFloat(option.plan_cost)).toFixed(2)} Monthly Cost` }}</span>
                        </template>
                        <template v-if="parseFloat(option.plan_cost) != 0 && activeBenefit.acf.benefit_type == 'wellness'">
                          <span class="enrollment-option-price">{{ `${ option.plan_cost < 0 ? "-" : "" }$${Math.abs(parseFloat(option.plan_cost)).toFixed(2)} Monthly Premium Discount` }}</span>
                        </template>
                      </label>
                    </template>
                  </form>
                </b-row>
              </template>
            </b-col>
          </b-row>
          <!-- Covers most detail sections (see data) -->
          <b-row v-if="simpleDetails.indexOf(activeBenefit.acf.benefit_type) > -1">
            <component
              :is="makeComponentName(activeBenefit.acf.benefit_type)"
              :benefit="activeBenefit" />
          </b-row>
          <!-- Voluntary Life Insurance-->
          <b-row v-if="activeBenefit.acf.benefit_type === 'voluntary-life-insurance'">
            <VoluntaryLife
              :benefit="activeBenefit"
              :voluntaryLifeWaived="voluntaryLifeWaived"
              :voluntaryPersonalAmount="voluntaryPersonalAmount"
              :voluntarySpouseAmount="voluntarySpouseAmount"
              :voluntaryChildAmount="voluntaryChildAmount"
              :voluntaryPersonalRate="voluntaryPersonalRate"
              :voluntarySpouseRate="voluntarySpouseRate"
              :voluntaryChildRate="voluntaryChildRate"
              :voluntaryPersonalCost="voluntaryPersonalCost"
              :voluntarySpouseCost="voluntarySpouseCost"
              :voluntaryChildCost="voluntaryChildCost"
              :voluntaryTotalCost="voluntaryTotalCost"
              @change-val="$emit('change-val', $event)"
              @change-val-auto="$emit('change-val-auto', $event)"
              @swap-vol-life-waive="$emit('swap-vol-life-waive', $event)" />
          </b-row>
          <!-- Accidental Death & Dismemberment-->
          <b-row v-if="activeBenefit.acf.benefit_type === 'voluntary-accidental-death-dismemberment'">
            <AccidentalDeath
              :benefit="activeBenefit"
              :voluntaryDeathWaived="voluntaryDeathWaived"
              :deathPersonalAmount="deathPersonalAmount"
              :deathSpouseAmount="deathSpouseAmount"
              :deathChildrenAmount="deathChildrenAmount"
              :deathPersonalCost="deathPersonalCost"
              :deathSpouseCost="deathSpouseCost"
              :deathChildrenCost="deathChildrenCost"
              :deathTotalCost="deathTotalCost"
              @change-val="$emit('change-val', $event)"
              @change-val-auto="$emit('change-val-auto', $event)"
              @swap-vol-death-waive="$emit('swap-vol-death-waive', $event)" />
          </b-row>
          <!-- Voluntary Plans -->
          <b-row v-if="activeBenefit.acf.benefit_type === 'voluntary-plan'">
            <VoluntaryPlans
              :activeBenefit="activeBenefit"
              :criticalIllness="criticalIllness"
              :critIllTotal="critIllTotal"
              :hospitalIndemnity="hospitalIndemnity"
              :accidentInsurance="accidentInsurance"
              @swap-crit-ill-waive="$emit('swap-crit-ill-waive', $event)"
              @acc-plan-chosen="$emit('acc-plan-chosen', $event)"
              @crit-plan="$emit('crit-plan', $event)"
              @hosp-plan-chosen="$emit('hosp-plan-chosen', $event)" />
          </b-row>
          <!-- Contact Information -->
          <b-row v-if="activeBenefit.acf.provider_contact_information.has_contact_info == true" class="contact_details_row">
            <b-col class="no-side-pad">
              <h5>{{ activeBenefit.acf.provider_contact_information.contact_header}}</h5>
              <span class="provider-contact-info name"><strong>{{ activeBenefit.acf.provider_contact_information.provider_name }}</strong></span>
              <span class="provider-contact-info"><a :href="'mailto:' + this.activeBenefit.acf.provider_contact_information.provider_email">{{ activeBenefit.acf.provider_contact_information.provider_email }}</a></span>
              <span class="provider-contact-info"><a :href="'tel:' + this.activeBenefit.acf.provider_contact_information.provider_phone">{{ activeBenefit.acf.provider_contact_information.provider_phone }}</a></span>
              <span class="provider-contact-info"><a :href="'https://' + this.activeBenefit.acf.provider_contact_information.provider_website" target="_blank">{{ activeBenefit.acf.provider_contact_information.provider_website }}</a></span>
            </b-col>
          </b-row>
          <!-- Contact Information -->
          <span id="backToTopBtn" class="back-to-top" @click="backToTop"><img src="../assets/cq-icon-down-arrow.svg" width="20" height="20"></span>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import helpers from '../helpers/global_funcs.js';
import { smoothScroll } from '../helpers/smooth_scroll.js';
import Medical from './benefits/Medical';
import Dental from './benefits/Dental';
import Vision from './benefits/Vision';
import Wellness from './benefits/Wellness';
import Disability from './benefits/Disability';
import LifeInsurance from './benefits/LifeInsurance';
import EmployeeAssistanceProgram from './benefits/EmployeeAssistanceProgram';
import AdditionalBenefits from './benefits/AdditionalBenefits';
import EnrollmentDetails from './benefits/EnrollmentDetails';
import Eligibility from './benefits/Eligibility';
import VoluntaryPlans from './benefits/VoluntaryPlans';
import AccidentalDeath from './benefits/AccidentalDeath';
import VoluntaryLife from './benefits/VoluntaryLife';
import AssistancePrograms from './benefits/AssistancePrograms';
import NoticeOfPrivacyPractices from './benefits/NoticeOfPrivacyPractices';
import PrescriptionDrugCoverage from './benefits/PrescriptionDrugCoverage';
import Fsa from './benefits/Fsa';
import Hsa from './benefits/Hsa';
import Disclaimer from './benefits/Disclaimer';
import ImportantNotices from './benefits/ImportantNotices';

export default {
  name: 'BenefitsDetails',
  components: {
    Medical,
    Dental,
    Vision,
    Wellness,
    Disability,
    LifeInsurance,
    EmployeeAssistanceProgram,
    AdditionalBenefits,
    EnrollmentDetails,
    Eligibility,
    VoluntaryPlans,
    VoluntaryLife,
    AccidentalDeath,
    AssistancePrograms,
    NoticeOfPrivacyPractices,
    PrescriptionDrugCoverage,
    Fsa,
    Hsa,
    Disclaimer,
    ImportantNotices
  },
  props: [
    'activeBenefit',
    'selectedId',
    'fsaWaived',
    'fsaEmp',
    'fsaFam',
    'critIllTotal',
    'accidentInsurance',
    'hospitalIndemnity',
    'backToSummary',
    'criticalIllness',
    'voluntaryLifeWaived',
    'voluntaryDeathWaived',
    'deathPersonalAmount',
    'deathSpouseAmount',
    'deathChildrenAmount',
    'deathPersonalCost',
    'deathSpouseCost',
    'deathChildrenCost',
    'deathTotalCost',
    'voluntaryPersonalAmount',
    'voluntarySpouseAmount',
    'voluntaryChildAmount',
    'voluntaryPersonalRate',
    'voluntarySpouseRate',
    'voluntaryChildRate',
    'voluntaryPersonalCost',
    'voluntarySpouseCost',
    'voluntaryChildCost',
    'voluntaryTotalCost'
  ],
  data: function() {
    return {
      simpleDetails: ['medical', 'dental', 'vision', 'wellness', 'disability', 'life-insurance', 'employee-assistance-program', 'additional-benefits', 'enrollment-details', 'eligibility', 'assistance-programs', 'notice-of-privacy-practices', 'prescription-drug-coverage', 'fsa', 'hsa', 'disclaimer', 'important-notices']    }
  },
  methods: {
    createAgeRangeStr: helpers.createAgeRangeStr,
    smoothScroll: smoothScroll,
    roundVolProp: function(step, max, prop) {
      this[prop] = Math.min(Math.round(this[prop]/step) * step, max);
    },
    makeComponentName: function(benefitType) {
      var componentName = benefitType.split('-').map(word => {
        return `${word.slice(0,1).toUpperCase()}${word.slice(1)}`;
      }).join('');
      return componentName;
    },
    handleScroll: function (event) {
      var elmnt = document.getElementById("benefits-deatils-ins");
      var posFromTop = elmnt.scrollTop;
      var backToTopBtn = document.getElementById("backToTopBtn");
      if (posFromTop > 200) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    },
    backToTop: function() {
      var detailsTop = document.getElementById("benefits-deatils-ins");
      if (detailsTop) {
        smoothScroll(0, 300, document.getElementById('benefits-deatils-ins'));
      }
    },
    created: function () {
        window.addEventListener('scroll', this.handleScroll);
    },
    destroyed: function () {
        window.removeEventListener('scroll', this.handleScroll);
    }
  }
}
</script>
