<template>
  <div id="app">
    <b-container fluid class="app-ins">
        <b-container fluid class="menu_wrap" id="header-wrap">
          <b-row>
            <b-col cols="3">
            <a
              href="#reload"
              class="no-decoration"
              @click="reloadScreen">
              <h5>Employee Benefits</h5>
              <h6>Summary and Calculator</h6>
            </a>
            </b-col>
            <b-col cols="7">
              <b-row>
                <b-col cols="4" class="company-logo">
                  <a href="https://www.cquencehealth.com" target="_blank">
                    <img class="logo desktop" src="./assets/cquence-logo-white.svg" />
                    <img class="logo mobile" src="./assets/cquence-icon-white.svg" />
                  </a>
                </b-col>
                <b-col cols="4" class="company-logo">
                  <a href="https://www.cassling.com" target="_blank">
                    <img class="logo desktop" src="./assets/cassling-logo-white.svg" />
                    <img class="logo mobile" src="./assets/cassling-icon-white.svg" />
                  </a>
                </b-col>
                <b-col cols="4" class="company-logo">
                  <a href="https://www.ensocare.com" target="_blank">
                    <img class="logo desktop" src="./assets/ensocare-logo-white.svg" />
                    <img class="logo mobile" src="./assets/ensocare-icon-white.svg" />
                  </a>
                </b-col>
              </b-row>
            </b-col>
            <b-col cols="2" class="burger_menu">
              <template v-if="isActive == false">
                <img @click="offCanvasMenu" class="burger_menu-icon" :class="{active: isActive}" src="./assets/cq-icon-menu-burger.svg" width="30" height="30" style="vertical-align: middle; margin-right: 5px;" />
                <span> Menu</span>
              </template>
              <template v-else>
                <img @click="offCanvasMenu" class="burger_menu-icon" :class="{active: isActive}" src="./assets/cq-icon-x-mark.svg" width="30" height="30" style="vertical-align: middle; margin-right: 5px;" />
                <span> Close</span>
              </template>
            </b-col>
          </b-row>
        </b-container>
        <b-container fluid class="content_wrap">
          <b-row class="content_wrap-ins">
            <b-col cols="4" class="no-side-pad benefits-side-wrap">
              <BenefitsList
                :benefits="benefits"
                :selectedId="selectedId"
                :fsaTotal="fsaTotal"
                :fsaEmp="fsaEmp"
                :fsaFam="fsaFam"
                :fsaWaived="fsaWaived"
                :totalCost="totalCost"
                :voluntaryTotal="voluntaryTotal"
                :accidentInsurance="accidentInsurance"
                :criticalIllness="criticalIllness"
                :hospitalIndemnity="hospitalIndemnity"
                :voluntaryLifeWaived="voluntaryLifeWaived"
                :voluntaryTotalCost="voluntaryTotalCost"
                :volLifeLabel="volLifeLabel"
                :voluntaryDeathWaived="voluntaryDeathWaived"
                :deathTotalCost="deathTotalCost"
                :deathLabel="deathLabel"
                @email-enter-clicked="changeEmailEnterVis"
                @side-click="sideClicked($event)" />
            </b-col>
            <b-col cols="8" v-if="selectedId == ''" class="no-side-pad benefit-intro-wrap">
                <b-container fluid class="">
                  <b-row class="benefit-intro-select-start">
                    <b-col class="benefit-intro-select-start-ins bounce">
                      Select a benefit to begin choosing coverage
                    </b-col>
                  </b-row>
                  <b-row class="benefit-intro">
                    <b-col>
                      <h1>Welcome to the CQuence Employee Benefits Summary & Calculator!</h1>
                      <p>At CQuence Health Group, we are proud to offer an array of benefit options designed to meet your unique needs. This personalized benefits calculator will allow you to evaluate benefits and estimate costs associated with each to determine the best package for you.</p>
                      <span class="get-started" @click="getStarted">Get Started</span>
                    </b-col>
                  </b-row>
                </b-container>
            </b-col>
            <b-col cols="8" class="no-side-pad benefit-details-wrap" :class="{active: mobileDetailsActive}">
              <!-- Protect from console errors when trying to load area before activeBenefit is calculated -->
              <template v-if="activeBenefit">
                <BenefitsDetails
                  :activeBenefit="activeBenefit"
                  :selectedId="selectedId"
                  :fsaWaived="fsaWaived"
                  :fsaEmp="fsaEmp"
                  :fsaFam="fsaFam"
                  :criticalIllness="criticalIllness"
                  :critIllTotal="criticalIllnessTotal"
                  :hospitalIndemnity="hospitalIndemnity"
                  :accidentInsurance="accidentInsurance"
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
                  :voluntaryDeathWaived="voluntaryDeathWaived"
                  :deathPersonalAmount="deathPersonalAmount"
                  :deathSpouseAmount="deathSpouseAmount"
                  :deathChildrenAmount="deathChildrenAmount"
                  :deathPersonalCost="deathPersonalCost"
                  :deathSpouseCost="deathSpouseCost"
                  :deathChildrenCost="deathChildrenCost"
                  :deathTotalCost="deathTotalCost"
                  @change-fsa-waive="changeFsaWaive"
                  @fsa-val-change="changeFsaVal($event)"
                  @acc-plan-chosen="changeAccPlan($event)"
                  @hosp-plan-chosen="changeHospPlan($event)"
                  @crit-plan="changeCritPlan($event)"
                  @swap-vol-life-waive="swapVolLifeWaive"
                  @swap-vol-death-waive="swapVolDeathWaive"
                  @swap-crit-ill-waive="swapCritIllWaive"
                  @plan-chosen="changePlan($event)"
                  @user-cost-changed="changeUserCost($event)"
                  @vol-life-label-set="setVolLifeLabel($event)"
                  @vol-life-ins-changed="changeVolLifeIns($event)"
                  @back-to-summary="backToSummary($event)"
                  @change-val="changeVal($event)"
                  @change-val-auto="changeValAuto($event)" />
              </template>
            </b-col>
          </b-row>
          <b-row>
            <b-container id="off-canvas" fluid class="off-canvas-menu" :class="{active: isActive}">
              <b-row>
                <b-col>
                  <h5>Employee Benefits</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <OffCanvasBenefitsList
                    :benefits="benefits"
                    :selectedId="selectedId"
                    @off-canvas-click="offCanvasClicked($event)" />
                </b-col>
              </b-row>
              <b-row class="off-canvas-menu-header">
                <b-col>
                  <h5>Details</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <OffCanvasDetailsList
                    :benefits="benefits"
                    :selectedId="selectedId"
                    @off-canvas-click="offCanvasClicked($event)" />
                </b-col>
              </b-row>
              <b-row class="off-canvas-menu-header">
                <b-col>
                  <h5>Company Websites</h5>
                </b-col>
              </b-row>
              <b-row>
                <b-col>
                  <b-container fluid class="off_canvas_menu-ins">
                    <b-row>
                      <b-col class="off_canvas_menu-item-wrap">
                        <span class="off_canvas_menu-item"><a href="https://www.cquencehealth.com" target="_blank">Cquence</a></span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col class="off_canvas_menu-item-wrap">
                        <span class="off_canvas_menu-item"><a href="https://www.cassling.com" target="_blank">Cassling</a></span>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col class="off_canvas_menu-item-wrap">
                        <span class="off_canvas_menu-item"><a href="https://www.ensocare.com" target="_blank">Ensocare</a></span>
                      </b-col>
                    </b-row>
                  </b-container>
                </b-col>
              </b-row>
            </b-container>
          </b-row>
        </b-container>
    </b-container>
    <!-- Modal For Email -->
    <b-modal hide-footer id="modal1" @hidden="onModalHide" title="Email Your Benefits Summary">
      <b-container fluid class="email-popup__outer">
        <b-container fluid class="email-popup__inner">
          <b-row>
            <b-col class="no-side-pad">
              <p>Please enter the email address where you'd like to receive your summary.</p>
                <form
                  @submit="emailPDF($event)">
              <b-row>
                  <b-col cols="8" class="no-left-pad">
                    <input
                      type="text"
                      name="email-for-send"
                      placeholder="email address"
                      v-model="enteredEmail"/>
                  </b-col>
                  <b-col cols="4" class="no-side-pad">
                    <button
                      type="submit"
                      class="email-popup__send">Send Email</button>
                  </b-col>
              </b-row>
                </form>
              <b-row class="top-margin">
                <template v-if="emailSent">
                  <p style="font-weight: 600; font-style: italic; color: #e16626;">Thank you, your email has been sent. If you do not see it within a few minutes, check your spam folder or try resending.</p>
                </template>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import './assets/styles.css';
import helpers from './helpers/global_funcs.js';
import BenefitsDetails from './components/BenefitsDetails';
import BenefitsList from './components/BenefitsList';
import OffCanvasBenefitsList from './components/OffCanvasBenefitsList';
import OffCanvasDetailsList from './components/OffCanvasDetailsList';

export default {
  name: 'App',
  components: {
    BenefitsList,
    BenefitsDetails,
    OffCanvasBenefitsList,
    OffCanvasDetailsList
  },
  data: function() {
    return {
      enteredEmail: '',
      emailSent: false,
      benefits: [],
      fsaWaived: false,
      fsaEmp: 0,
      fsaFam: 0,
      criticalIllness: {
        plan: null,
        tobacco: null,
        type: null,
        age_range: null,
        waived: false
      },
      hospitalIndemnity: {
        plan_label: null,
        plan_cost: null,
        plan_sidebar_label: null
      },
      accidentInsurance: {
        plan_label: null,
        plan_cost: null,
        plan_sidebar_label: null
      },
      deathPersonalAmount: 0,
      deathSpouseAmount: 0,
      deathChildrenAmount: 0,
      voluntaryPersonalAmount: 0,
      voluntarySpouseAmount: 0,
      voluntaryChildAmount: 0,
      voluntaryPersonalRate: false,
      voluntarySpouseRate: false,
      voluntaryChildRate: 0.10,
      voluntaryLifeWaived: false,
      voluntaryDeathWaived: false,
      selectedId: null,
      isActive: false,
      mobileDetailsActive: false,
      emailEnterVis: false
    }
  },
  computed: {
    fsaTotal: function() {
      if (this.fsaWaived) {
        return '$0.00';
      } else {
        return `$${((parseFloat(this.fsaEmp) + parseFloat(this.fsaFam))/12).toFixed(2)}`;
      }
    },
    voluntaryPersonalCost: function() {
      return this.computeVolLifeCost(this.voluntaryPersonalRate || 0, 10000, this.voluntaryPersonalAmount || 0, this.benefits);
    },
    voluntarySpouseCost: function() {
      return this.computeVolLifeCost(this.voluntarySpouseRate || 0, 10000, this.voluntarySpouseAmount || 0, this.benefits);
    },
    voluntaryChildCost: function() {
      return this.computeVolLifeCost(this.voluntaryChildRate, 1000, this.voluntaryChildAmount || 0, this.benefits);
    },
    voluntaryTotalCost: function() {
      if (this.voluntaryLifeWaived) {
        return '$0.00';
      } else {
        return this.sumVolCosts(['voluntaryPersonal', 'voluntarySpouse', 'voluntaryChild']);
      }
    },
    volLifeLabel: function() {
      return this.createVolLabels('voluntaryPersonal', 'voluntarySpouse', 'voluntaryChild', 'voluntary-life-insurance');
    },
    deathPersonalCost: function() {
      return this.computeDeathCost('employee_rate', this.deathPersonalAmount || 0, this.benefits);
    },
    deathSpouseCost: function() {
      return this.computeDeathCost('spouse_rate', this.deathSpouseAmount || 0, this.benefits);
    },
    deathChildrenCost: function() {
      return this.computeDeathCost('child_rate', this.deathChildrenAmount || 0, this.benefits);
    },
    deathTotalCost: function() {
      if (this.voluntaryDeathWaived) {
        return '$0.00';
      } else {
        return this.sumVolCosts(['deathPersonal', 'deathSpouse', 'deathChildren']);
      }
    },
    deathLabel: function() {
      return this.createVolLabels('deathPersonal', 'deathSpouse', 'deathChildren', 'voluntary-accidental-death-dismemberment');
    },
    activeBenefit: function() {
      for (var benefitNum = this.benefits.length, i = 0; i < benefitNum; i++) {
        if (this.benefits[i].id === this.selectedId) {
          return this.benefits[i];
        }
      }
    },
    totalCost: function() {
      var total = 0;
      for (var benefitNum = this.benefits.length, i = 0; i < benefitNum; i++) {
        var cur = this.benefits[i];
        if (cur.acf.specialized_enrollment_option_fields) {
          if (cur.acf.specialized_option_plan_to_use === 'voluntary_plans' && this.voluntaryTotal) {
            total += parseFloat(this.voluntaryTotal);
          } else {
            if (cur.acf.specialized_option_plan_to_use === 'fsahsa') {
              if (cur.acf.benefit_type === 'fsa') {
                total += parseFloat(this.fsaTotal.replace('$', ''));
              } else if (cur.user_plan_cost) {
                total += parseFloat(cur.user_plan_cost)/12;
              }
            } else {
              if (cur.acf.benefit_type === 'voluntary-accidental-death-dismemberment') {
                total += parseFloat(this.deathTotalCost.replace('$', ''));
              } else if (cur.acf.benefit_type === 'voluntary-life-insurance') {
                total += parseFloat(this.voluntaryTotalCost.replace('$', ''));
              } else if (cur.user_plan_cost) {
                total += parseFloat(cur.user_plan_cost);
              }
            }
          }
        } else {
          if (cur.selectedPlan != '') {
            total += parseFloat(cur.selectedPlan.plan_cost);
          }
        }
      }

      return total;
    },
    criticalIllnessTotal: function() {
      var critIllBenefit = this.benefits.filter(benefit => {
        return benefit.acf.specialized_option_plan_to_use && benefit.acf.specialized_option_plan_to_use === 'voluntary_plans';
      })[0];
      if (critIllBenefit) {
        var critIllData = critIllBenefit.acf.voluntary_plans_options.critical_illness[0];
        var isAllSelected = Object.keys(this.criticalIllness).filter(key => { return this.criticalIllness[key] === null }).length === 0;
        var isWaived = this.criticalIllness.waived;
        if (isAllSelected) {
          var chosenOption = critIllData.options.filter(option => { return option.option_label === this.criticalIllness.plan })[0];
          var ageRangeList = chosenOption.age_range.filter(range => { return range.age_range_label === this.criticalIllness.age_range })[0];
          var isTobacco = this.criticalIllness.tobacco === 'Yes';
          var plan = ageRangeList.plans.filter(plan => { return (plan.tobacco_user === isTobacco && plan.type.split('-').indexOf(this.criticalIllness.type) > -1) })[0];
          if (this.criticalIllness.waived) {
            return `$0.00`;
          } else {
            return `$${ parseFloat(plan.rate).toFixed(2) }`;
          }
        } else if (isWaived) {
          return `$0.00`;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
    voluntaryTotal: function() {
      var reducer = (acc, num) => {
        return acc += ( num === null ? 0 : parseFloat(num.replace('$', '')) );
      }
      if (this.criticalIllnessTotal != null || this.hospitalIndemnity.plan_cost != null || this.accidentInsurance.plan_cost != null) {
        var totals = [this.criticalIllnessTotal, this.hospitalIndemnity.plan_cost, this.accidentInsurance.plan_cost];
        return parseFloat(totals.reduce(reducer, 0)).toFixed(2);
      } else { 
        return null;
      }
    }
  },
  methods: {
    findBenefitByType: helpers.findBenefitByType,
    computeDeathCost: helpers.computeDeathCost,
    computeVolLifeCost: helpers.computeVolLifeCost,
    createPDF: helpers.createPDF,
    reloadScreen: function(event) {
      event.preventDefault();
      location.reload(true);
    },
    changeFsaWaive: function() {
      this.fsaWaived = !this.fsaWaived;
    },
    changeFsaVal: function($event) {
      var type = $event.target.getAttribute('data-type');
      var prop = `fsa${ type.slice(0,1).toUpperCase() }${ type.slice(1,3) }`;
      this[prop] = Math.min(parseInt($event.target.value), parseInt($event.target.getAttribute('max')));
    },
    sumVolCosts: function(keyRoots) {
      var cost = 0;
      for (var rootNum = keyRoots.length, i = 0; i < rootNum; i++) {
        cost += parseFloat(this[`${ keyRoots[i] }Cost`].replace('$', ''));
      }
      var result = parseFloat(cost).toFixed(2);
      return `$${ result }`;
    },
    createVolLabels: function(pers, spouse, child, type) {
      var pCost = parseFloat(this[`${ pers }Cost`].replace('$', ''));
      var sCost = parseFloat(this[`${ spouse }Cost`].replace('$', ''));
      var cCost = parseFloat(this[`${ child }Cost`].replace('$', ''));
      var labels = [];
      if (pCost != 0) {
        labels.push(this.findBenefitByType(this.benefits, type).acf.voluntary_life_options.personal_plan_side_label);
      }
      if (sCost != 0) {
        labels.push(this.findBenefitByType(this.benefits, type).acf.voluntary_life_options.spouse_plan_side_label);
      }
      if (cCost != 0) {
        labels.push(this.findBenefitByType(this.benefits, type).acf.voluntary_life_options.children_plan_side_label);
      }
      if (labels.length > 0) {
        return labels.join(' / ');
      } else {
        return '';
      }
    },
    onModalHide: function() {
      this.emailSent = false;
    },
    changeVal: function($event) {
      this[$event.target.getAttribute('name')] = $event.target.value;
    },
    changeValAuto: function($event) {
      this[$event.name] = $event.value;
    },
    emailPDF: function($event) {
      $event.preventDefault();
      var doc = this.createPDF(this.benefits, this.fsaTotal, this.fsaWaived, this.fsaEmp, this.fsaFam, this.voluntaryTotal, this.voluntaryTotalCost, this.deathTotalCost, this.totalCost, this.hospitalIndemnity, this.criticalIllness, this.accidentInsurance, this.voluntaryLifeWaived, this.voluntaryDeathWaived, this.volLifeLabel, this.deathLabel);
      var pdfBlob = doc.output('blob');
      var fd = new FormData();
      fd.append('pdf', pdfBlob);
      fd.append('email', this.enteredEmail);
      var request = new XMLHttpRequest();
      request.open('POST', '/email.php');
      request.onreadystatechange = () => {
        if (request.readyState === 4) {
          this.emailSent = true;
        }
      }
      request.send(fd);
    },
    sideClicked: function($id) {
      this.selectedId = $id;
      this.mobileDetailsActive = true;
      var detailsTop = document.getElementById("benefits-deatils-ins");
      if (detailsTop) {
        detailsTop.scrollTop = 0;
      }
    },
    offCanvasClicked: function($id) {
      this.selectedId = $id;
      this.isActive = !this.isActive;
      this.mobileDetailsActive = true;
      var offCanvasTop = document.getElementById("off-canvas");
      if (offCanvasTop) {
        offCanvasTop.scrollTop = 0;
      }

      var detailsTop = document.getElementById("benefits-deatils-ins");
      if (detailsTop) {
        detailsTop.scrollTop = 0;
      }
    },
    hideMobileNotice: function() {
      this.isMobileNoticeHidden = !this.isMobileNoticeHidden;
    },
    backToSummary: function() {
      this.mobileDetailsActive = !this.mobileDetailsActive;
    },
    changeEmailEnterVis: function() {
      this.emailEnterVis = !this.emailEnterVis;
    },
    changePlan: function($event) {
      var isSpecialField = this.activeBenefit.acf.specialized_enrollment_option_fields;
      if (isSpecialField) {
        var optionsStr = `${this.activeBenefit.acf.specialized_option_plan_to_use}_options`;
      } else {
        var optionsStr = 'plan_options';
      }

      if (this.activeBenefit.acf.specialized_option_plan_to_use === 'fsahsa') {
        this.reevaluateLimit($event, optionsStr);
      } else {
        this.applyNewPlan($event, optionsStr);
      }
    },
    reevaluateLimit: function($event, optionsStr) {
      var newBenefits = this.benefits.map(benefit => {
        return (
          benefit.id === this.selectedId ?
              {
                ...benefit,
                // Calculate new max based on label
                user_plan_cost: Math.min(benefit.user_plan_cost, benefit.acf[optionsStr].filter(option => {
                  return option.plan_label === $event
                })[0].maximum_allowed_amount),
                selectedPlan: benefit.acf[optionsStr].filter(option => {
                  return option.plan_label === $event
                })[0]
              }
            :
              benefit
        )
      })
      this.benefits = newBenefits;
    },
    applyNewPlan: function($event, optionsStr) {
      var newBenefits = this.benefits.map(benefit => {
        return (
          benefit.id === this.selectedId ?
              {
                ...benefit,
                selectedPlan: benefit.acf[optionsStr].filter(option => {
                  return option.plan_label === $event;
                })[0]
              }
            :
              benefit
        )
      })
      this.benefits = newBenefits;
    },
    changeAccPlan: function($event) {
      var accBen = this.benefits.filter(benefit => {
        return benefit.acf.specialized_option_plan_to_use && benefit.acf.specialized_option_plan_to_use === 'voluntary_plans';
      })[0];
      var chosenPlan = accBen.acf.voluntary_plans_options.accidental_insurance.filter(plan => {
        return plan.plan_label === $event;
      })[0];
      this.accidentInsurance = chosenPlan;
    },
    changeCritPlan: function($event) {
      var newCritPlan =   {
        ...this.criticalIllness,
        [`${$event.target.getAttribute('data-key')}`]: $event.target.value
      }
      this.criticalIllness = newCritPlan;
    },
    swapCritIllWaive: function() {
      this.criticalIllness = {
        ...this.criticalIllness,
        waived: !this.criticalIllness.waived
      };
    },
    swapVolLifeWaive: function() {
      this.voluntaryLifeWaived = !this.voluntaryLifeWaived;
    },
    swapVolDeathWaive: function() {
      this.voluntaryDeathWaived = !this.voluntaryDeathWaived;
    },
    changeHospPlan: function($event) {
      var hospBen = this.benefits.filter(benefit => {
        return benefit.acf.specialized_option_plan_to_use && benefit.acf.specialized_option_plan_to_use === 'voluntary_plans';
      })[0];
      var chosenPlan = hospBen.acf.voluntary_plans_options.hospital_indemnity.filter(plan => {
        return plan.plan_label === $event;
      })[0];
      this.hospitalIndemnity = chosenPlan;
    },
    changeUserCost: function($event) {
      var newBenefits = this.benefits.map(benefit => {
        return (
          benefit.id === this.selectedId ?
              {
                ...benefit,
                user_plan_cost: Math.min($event, benefit.selectedPlan.maximum_allowed_amount)
              }
            :
              benefit
        )
      })
      this.benefits = newBenefits;
    },
    offCanvasMenu: function(){
      this.isActive = !this.isActive;
    },
    getStarted: function(){
      this.selectedId = this.benefits.filter(benefit => parseInt(benefit.acf.order) === 1)[0].id;
    }
  },
  created: function() {
    var isIe11 = !!window.MSInputMethodContext && !!document.documentMode;
    if (isIe11) {
      document.getElementsByTagName('body')[0].classList.add('ie11');
    }

    var prefixes = ['', '-webkit-', '-moz-', '-o-', '-ms-', ''];
    var touchscreen;
    if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
      touchscreen = true;
    } else {
      var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
      touchscreen = window.matchMedia(query).matches;
    }

    if (touchscreen) {
      document.getElementsByTagName('body')[0].classList.add('touchscreen');      
    }

    var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      document.getElementsByTagName('body')[0].classList.add('android');
    }

    var isIos = /ipad|iphone|ipod/i.test(userAgent);
    if (isIos) {
      document.getElementsByTagName('body')[0].classList.add('ios');
    }

    var isWebkit = !!userAgent.match(/webkit/i);
    var isNotCri = !userAgent.match(/crios/i);
    var isIosSafari = isIos && isWebkit && isNotCri;
    if (isIosSafari) {
      document.getElementsByTagName('body')[0].classList.add('ios-safari');
    }

    this.selectedId = '';
    this.$http.get('wp/v2/benefits-api?per_page=100').then(response => {
      for (let benefit in response.data) {
        var curBenefit = response.data[benefit];
        if (curBenefit.acf.specialized_enrollment_option_fields) {
          curBenefit['user_plan_cost'] = null;
        }
        curBenefit['selectedPlan'] = '';
        this.benefits.push(response.data[benefit]);
      }
    }, err => {
      console.log(err);
    });
  }
}
</script>