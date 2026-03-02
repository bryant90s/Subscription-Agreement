import { useState } from "react";
import { ProgressSteps } from "./components/progress-steps";
import { InputField } from "./components/input-field";
import { DatePickerField } from "./components/date-picker-field";
import { PlanCard } from "./components/plan-card";
import { AddonItem } from "./components/addon-item";
import { SignatureField } from "./components/signature-field";
import { SummaryCard } from "./components/summary-card";
import * as Checkbox from "@radix-ui/react-checkbox";
import * as RadioGroup from "@radix-ui/react-radio-group";
import * as Tabs from "@radix-ui/react-tabs";
import { Check, ChevronDown, ExternalLink } from "lucide-react";
import Logo from "figma:asset/ecf5eaa85bdd53efdca439136446b4f88b12d94a.png";

const steps = [
  { id: 1, label: "Business Info" },
  { id: 2, label: "Plan" },
  { id: 3, label: "Add-ons" },
  { id: 4, label: "Terms" },
  { id: 5, label: "Payment & Signature" },
];

const plans = [
  {
    id: "basic",
    name: "BASIC",
    description:
      "Includes: World-class website, email marketing, catering management, job applications, Google integration, and one professional photoshoot.",
    yearlyPrice: 1789,
    monthlyPrice: 199,
  },
  {
    id: "premium",
    name: "PREMIUM",
    description: "Includes: World-class website, email marketing, catering management, job applications, Google integration, Facebook integration, and one professional photoshoot.",
    yearlyPrice: 2269,
    monthlyPrice: 249,
    featured: true,
  },
  {
    id: "premium-plus",
    name: "PREMIUM PLUS",
    description:
      "Includes: World-class website, email marketing, catering management, job applications, Google integration, and Digital Media Suite (professional photo and video shoot).",
    yearlyPrice: 3469,
    monthlyPrice: 349,
  },
];

const addonsData = [
  { id: "instagram", name: "Instagram add-on", monthlyPrice: 50 },
  { id: "facebook", name: "Facebook add-on", monthlyPrice: 50 },
  {
    id: "video",
    name: "Additional video shoot",
    monthlyPrice: 50,
  },
  {
    id: "text-marketing",
    name: "Text marketing (1,000 texts/mo)",
    monthlyPrice: 30,
  },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  // Business Info
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(
    new Date()
  );
  const [businessName, setBusinessName] = useState("");
  const [spotId, setSpotId] = useState("SPOT-12345");
  const [parentCompany, setParentCompany] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [showSecondary, setShowSecondary] = useState(false);
  const [showBilling, setShowBilling] = useState(false);

  // Secondary Contact
  const [secondaryFirstName, setSecondaryFirstName] = useState("");
  const [secondaryLastName, setSecondaryLastName] = useState("");
  const [secondaryRole, setSecondaryRole] = useState("");
  const [secondaryPhone, setSecondaryPhone] = useState("");
  const [secondaryEmail, setSecondaryEmail] = useState("");

  // Billing Contact
  const [billingFirstName, setBillingFirstName] = useState("");
  const [billingLastName, setBillingLastName] = useState("");
  const [billingRole, setBillingRole] = useState("");
  const [billingPhone, setBillingPhone] = useState("");
  const [billingEmail, setBillingEmail] = useState("");

  // Plan Selection
  const [isAnnual, setIsAnnual] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState("premium");

  // Add-ons
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  // Fees & Discounts
  const [setupFee, setSetupFee] = useState(500);

  // Agreement
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [initials, setInitials] = useState("");

  // Payment
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [cardholderName, setCardholderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiration, setExpiration] = useState("");
  const [cvc, setCvc] = useState("");
  const [billingZip, setBillingZip] = useState("");

  // ACH Payment
  const [achAccountName, setAchAccountName] = useState("");
  const [achBankName, setAchBankName] = useState("");
  const [achAccountType, setAchAccountType] = useState("Checking");
  const [achRoutingNumber, setAchRoutingNumber] = useState("");
  const [achAccountNumber, setAchAccountNumber] = useState("");

  // Signature
  const [signature, setSignature] = useState("");
  const [printedName, setPrintedName] = useState("");
  const [signatureDate, setSignatureDate] = useState(new Date());
  const [authorizedToSign, setAuthorizedToSign] = useState(false);
  const [authorizedPayment, setAuthorizedPayment] = useState(false);

  const toggleAddon = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId)
        ? prev.filter((id) => id !== addonId)
        : [...prev, addonId]
    );
  };

  const getSelectedPlanData = () => {
    return plans.find((p) => p.id === selectedPlan) || plans[0];
  };

  const getAddonsForSummary = () => {
    return selectedAddons.map((addonId) => {
      const addon = addonsData.find((a) => a.id === addonId);
      if (!addon) return { name: "", price: 0 };
      const price =
        isAnnual && addon.yearlyPrice ? addon.yearlyPrice : addon.monthlyPrice;
      return {
        name: addon.name,
        price,
      };
    });
  };

  const handleSubmit = () => {
    alert("Subscription Agreement Submitted! 🎉");
  };

  // Step validation functions
  const isStep1Complete = () => {
    // Business Information
    const hasBusinessName = businessName.trim().length > 0;
    const hasStreetAddress = street.trim().length > 0;
    const hasCity = city.trim().length > 0;
    const hasState = state.trim().length > 0;
    const hasZip = zip.trim().length > 0;
    
    // Primary Contact
    const hasPrimaryContact = 
      firstName.trim().length > 0 &&
      lastName.trim().length > 0 &&
      role.trim().length > 0 &&
      phone.trim().length > 0 &&
      email.trim().length > 0;

    return (
      hasBusinessName &&
      hasStreetAddress &&
      hasCity &&
      hasState &&
      hasZip &&
      hasPrimaryContact
    );
  };

  const isStep2Complete = () => {
    // Plan is always selected (default is premium)
    return !!selectedPlan;
  };

  const isStep3Complete = () => {
    // Add-ons step is optional, so always complete
    return true;
  };

  const isStep4Complete = () => {
    // Terms agreement and initials
    return agreedToTerms && initials.trim().length > 0;
  };

  const isStep5Complete = () => {
    // Payment method validation
    let hasValidPayment = false;
    if (paymentMethod === "credit-card") {
      hasValidPayment =
        cardholderName.trim().length > 0 &&
        cardNumber.trim().length > 0 &&
        expiration.trim().length > 0 &&
        cvc.trim().length > 0 &&
        billingZip.trim().length > 0;
    } else if (paymentMethod === "ach") {
      hasValidPayment =
        achAccountName.trim().length > 0 &&
        achBankName.trim().length > 0 &&
        achRoutingNumber.trim().length > 0 &&
        achAccountNumber.trim().length > 0;
    }

    // Signature validation
    const hasSignature = signature.trim().length > 0;
    const hasPrintedName = printedName.trim().length > 0;
    const hasAuthorizedToSign = authorizedToSign;
    const hasAuthorizedPayment = authorizedPayment;

    return hasValidPayment && hasSignature && hasPrintedName && hasAuthorizedToSign && hasAuthorizedPayment;
  };

  // Validation function to check if all required fields are filled
  const isFormValid = () => {
    return isStep1Complete() && isStep2Complete() && isStep3Complete() && isStep4Complete() && isStep5Complete();
  };

  const planData = getSelectedPlanData();
  const planPrice = isAnnual ? planData.yearlyPrice : planData.monthlyPrice;
  const monthlyPlanPrice = planData.monthlyPrice;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center text-center">
          <img src={Logo} alt="SpotHopper" className="h-12 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-900">
            Subscription Agreement
          </h1>
          <p className="text-sm text-gray-600 mt-1">
            Complete your subscription in just a few steps
          </p>
        </div>
      </header>

      {/* Progress Indicator */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6">
          <ProgressSteps 
            steps={steps.map(step => ({
              ...step,
              completed: 
                step.id === 1 ? isStep1Complete() :
                step.id === 2 ? isStep2Complete() :
                step.id === 3 ? isStep3Complete() :
                step.id === 4 ? isStep4Complete() :
                step.id === 5 ? isStep5Complete() :
                false
            }))} 
            currentStep={currentStep} 
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Section 1: Business Information */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Business Details
              </h2>

              <div className="space-y-5">
                <DatePickerField
                  label="Effective Date"
                  value={effectiveDate}
                  onChange={setEffectiveDate}
                />

                <InputField
                  label="Business / Spot Name"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="Enter business name"
                />

                <div className="space-y-1.5">
                  <label className="block text-sm text-gray-700">Spot ID</label>
                  <div className="inline-flex px-3 py-1.5 rounded-full bg-gray-100 text-sm text-gray-700 border border-gray-200">
                    {spotId}
                  </div>
                </div>

                <InputField
                  label="Parent Company"
                  value={parentCompany}
                  onChange={(e) => setParentCompany(e.target.value)}
                  placeholder="Enter parent company"
                  optional
                />

                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Physical Address
                  </h3>
                  <div className="space-y-4">
                    <InputField
                      label="Street Address"
                      value={street}
                      onChange={(e) => setStreet(e.target.value)}
                      placeholder="123 Main St"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="City"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="City"
                      />
                      <InputField
                        label="State"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                      />
                    </div>
                    <InputField
                      label="ZIP Code"
                      value={zip}
                      onChange={(e) => setZip(e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                </div>

                <div className="pt-4">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Primary Contact
                  </h3>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <InputField
                        label="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First name"
                      />
                      <InputField
                        label="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last name"
                      />
                    </div>
                    <InputField
                      label="Role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      placeholder="e.g., Owner, Manager"
                    />
                    <InputField
                      label="Phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(555) 123-4567"
                      type="tel"
                    />
                    <InputField
                      label="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root
                      checked={showSecondary}
                      onCheckedChange={(checked) =>
                        setShowSecondary(checked as boolean)
                      }
                      className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center"
                    >
                      <Checkbox.Indicator>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className="text-sm text-gray-700">
                      Add Secondary Contact
                    </span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <Checkbox.Root
                      checked={showBilling}
                      onCheckedChange={(checked) =>
                        setShowBilling(checked as boolean)
                      }
                      className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center"
                    >
                      <Checkbox.Indicator>
                        <Check className="w-3.5 h-3.5 text-white" />
                      </Checkbox.Indicator>
                    </Checkbox.Root>
                    <span className="text-sm text-gray-700">
                      Add Billing Contact
                    </span>
                  </label>
                </div>

                {/* Secondary Contact Fields */}
                {showSecondary && (
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">
                      Secondary Contact
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          label="First Name"
                          value={secondaryFirstName}
                          onChange={(e) => setSecondaryFirstName(e.target.value)}
                          placeholder="First name"
                        />
                        <InputField
                          label="Last Name"
                          value={secondaryLastName}
                          onChange={(e) => setSecondaryLastName(e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                      <InputField
                        label="Role"
                        value={secondaryRole}
                        onChange={(e) => setSecondaryRole(e.target.value)}
                        placeholder="e.g., Owner, Manager"
                      />
                      <InputField
                        label="Phone"
                        value={secondaryPhone}
                        onChange={(e) => setSecondaryPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        type="tel"
                      />
                      <InputField
                        label="Email"
                        value={secondaryEmail}
                        onChange={(e) => setSecondaryEmail(e.target.value)}
                        placeholder="email@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                )}

                {/* Billing Contact Fields */}
                {showBilling && (
                  <div className="pt-4">
                    <h3 className="text-sm font-medium text-gray-900 mb-4">
                      Billing Contact
                    </h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <InputField
                          label="First Name"
                          value={billingFirstName}
                          onChange={(e) => setBillingFirstName(e.target.value)}
                          placeholder="First name"
                        />
                        <InputField
                          label="Last Name"
                          value={billingLastName}
                          onChange={(e) => setBillingLastName(e.target.value)}
                          placeholder="Last name"
                        />
                      </div>
                      <InputField
                        label="Role"
                        value={billingRole}
                        onChange={(e) => setBillingRole(e.target.value)}
                        placeholder="e.g., Owner, Manager"
                      />
                      <InputField
                        label="Phone"
                        value={billingPhone}
                        onChange={(e) => setBillingPhone(e.target.value)}
                        placeholder="(555) 123-4567"
                        type="tel"
                      />
                      <InputField
                        label="Email"
                        value={billingEmail}
                        onChange={(e) => setBillingEmail(e.target.value)}
                        placeholder="email@example.com"
                        type="email"
                      />
                    </div>
                  </div>
                )}
              </div>
            </section>

            {/* Section 2: Choose Your Plan */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Select Your Subscription
              </h2>

              {/* Billing Toggle */}
              <div className="mb-6 flex items-center justify-center">
                <div className="inline-flex items-center bg-gray-100 rounded-lg p-1">
                  <button
                    onClick={() => setIsAnnual(false)}
                    className={`px-4 py-2 text-sm rounded-md transition-all ${
                      !isAnnual
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    Pay Monthly
                  </button>
                  <button
                    onClick={() => setIsAnnual(true)}
                    className={`px-4 py-2 text-sm rounded-md transition-all ${
                      isAnnual
                        ? "bg-white text-gray-900 shadow-sm"
                        : "text-gray-600"
                    }`}
                  >
                    Pay Annually
                  </button>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500 mb-6">
                {isAnnual
                  ? "Save with annual prepayment"
                  : "12-month commitment required"}
              </p>

              {/* Plan Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    name={plan.name}
                    description={plan.description}
                    yearlyPrice={plan.yearlyPrice}
                    monthlyPrice={plan.monthlyPrice}
                    isAnnual={isAnnual}
                    isSelected={selectedPlan === plan.id}
                    onSelect={() => setSelectedPlan(plan.id)}
                    featured={plan.featured}
                  />
                ))}
              </div>
            </section>

            {/* Section 3: Add-ons */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Add-ons
              </h2>

              <div className="space-y-3">
                {addonsData
                  .filter((addon) => {
                    // Hide Facebook add-on if Premium or Premium Plus is selected
                    if (addon.id === "facebook" && (selectedPlan === "premium" || selectedPlan === "premium-plus")) {
                      return false;
                    }
                    // Hide Instagram add-on only if Premium Plus is selected
                    if (addon.id === "instagram" && selectedPlan === "premium-plus") {
                      return false;
                    }
                    return true;
                  })
                  .map((addon) => (
                  <AddonItem
                    key={addon.id}
                    name={addon.name}
                    monthlyPrice={addon.monthlyPrice}
                    yearlyPrice={addon.yearlyPrice}
                    isAnnual={isAnnual}
                    checked={selectedAddons.includes(addon.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        toggleAddon(addon.id);
                      } else {
                        toggleAddon(addon.id);
                      }
                    }}
                  />
                ))}</div>
            </section>

            {/* Section 4: Fees & Discounts */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Fees</h2>

              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="block text-sm text-gray-700">
                    One-time Setup Fee
                  </label>
                  <div className="flex items-center gap-3">
                    <span className="text-lg text-gray-400 line-through">$500</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-medium rounded-full">
                      FREE
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Standard setup fee applied to all new subscriptions
                  </p>
                </div>
              </div>
            </section>

            {/* Section 5: Agreement Summary */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Subscription Terms
              </h2>

              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>12-month subscription commitment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>
                      Auto-renews unless canceled with 30-day notice
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>Payment authorization required</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-[#FF6B35] mt-0.5 flex-shrink-0" />
                    <span>
                      Subscription Services Agreement incorporated by reference
                    </span>
                  </li>
                </ul>
              </div>

              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.open(
                    'https://www.spothopperapp.com/subscription_service_agreement',
                    'SubscriptionAgreement',
                    'width=800,height=600,scrollbars=yes,resizable=yes'
                  );
                }}
                className="inline-flex items-center gap-1 text-sm text-[#FF6B35] hover:text-[#E55A2B] mb-6"
              >
                View Full Subscription Services Agreement
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="space-y-4 mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox.Root
                    checked={agreedToTerms}
                    onCheckedChange={(checked) =>
                      setAgreedToTerms(checked as boolean)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center mt-0.5"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm text-gray-700">
                    I confirm that I have read and agree to the Subscription Services Agreement and that my electronic signature confirms my acceptance of these terms.
                  </span>
                </label>

                <InputField
                  label="Initials (Required)"
                  value={initials}
                  onChange={(e) => setInitials(e.target.value)}
                  placeholder="Enter your initials"
                  maxLength={4}
                  className="max-w-xs"
                />
              </div>
            </section>

            {/* Section 6: Payment Method */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Payment Method
              </h2>

              <Tabs.Root
                value={paymentMethod}
                onValueChange={setPaymentMethod}
              >
                <Tabs.List className="flex gap-2 mb-6 border-b border-gray-200">
                  <Tabs.Trigger
                    value="credit-card"
                    className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-[#FF6B35] data-[state=active]:border-[#FF6B35] transition-all"
                  >
                    Credit Card
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    value="ach"
                    className="px-4 py-2 text-sm font-medium text-gray-600 border-b-2 border-transparent data-[state=active]:text-[#FF6B35] data-[state=active]:border-[#FF6B35] transition-all"
                  >
                    ACH
                  </Tabs.Trigger>
                </Tabs.List>

                <Tabs.Content value="credit-card" className="space-y-4">
                  <InputField
                    label="Cardholder Name"
                    value={cardholderName}
                    onChange={(e) => setCardholderName(e.target.value)}
                    placeholder="Name on card"
                  />
                  <InputField
                    label="Card Number"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="1234 5678 9012 3456"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <InputField
                      label="Expiration"
                      value={expiration}
                      onChange={(e) => setExpiration(e.target.value)}
                      placeholder="MM/YY"
                    />
                    <InputField
                      label="CVC"
                      value={cvc}
                      onChange={(e) => setCvc(e.target.value)}
                      placeholder="123"
                    />
                    <InputField
                      label="Billing ZIP"
                      value={billingZip}
                      onChange={(e) => setBillingZip(e.target.value)}
                      placeholder="12345"
                    />
                  </div>
                </Tabs.Content>

                <Tabs.Content value="ach" className="space-y-4">
                  <InputField
                    label="Account Name"
                    value={achAccountName}
                    onChange={(e) => setAchAccountName(e.target.value)}
                    placeholder="Account holder name"
                  />
                  <InputField
                    label="Bank Name"
                    value={achBankName}
                    onChange={(e) => setAchBankName(e.target.value)}
                    placeholder="Bank name"
                  />
                  <div className="space-y-1.5">
                    <label className="block text-sm text-gray-700">
                      Account Type
                    </label>
                    <select
                      value={achAccountType}
                      onChange={(e) => setAchAccountType(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF6B35]/20 focus:border-[#FF6B35] transition-all"
                    >
                      <option>Checking</option>
                      <option>Savings</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <InputField
                    label="Routing Number"
                    value={achRoutingNumber}
                    onChange={(e) => setAchRoutingNumber(e.target.value)}
                    placeholder="123456789"
                  />
                  <InputField
                    label="Account Number"
                    value={achAccountNumber}
                    onChange={(e) => setAchAccountNumber(e.target.value)}
                    placeholder="Account number"
                  />
                </Tabs.Content>
              </Tabs.Root>

              <div className="mt-6">
                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox.Root
                    checked={authorizedPayment}
                    onCheckedChange={(checked) =>
                      setAuthorizedPayment(checked as boolean)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center mt-0.5"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm text-gray-700">
                    I authorize SpotHopper to charge the payment method provided, including credit card or ACH debit.
                  </span>
                </label>
              </div>

              <p className="text-xs text-gray-500 mt-4">
                Authorization remains valid for the subscription term.
              </p>
            </section>

            {/* Section 7: Signature */}
            <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Sign & Submit
              </h2>

              <div className="space-y-5">
                <h3 className="text-sm font-medium text-gray-900">
                  Business Representative
                </h3>

                <SignatureField
                  label="Signature"
                  value={signature}
                  onChange={setSignature}
                />

                <InputField
                  label="Printed Name"
                  value={printedName}
                  onChange={(e) => setPrintedName(e.target.value)}
                  placeholder="Enter your full name"
                />

                <div className="space-y-1.5">
                  <label className="block text-sm text-gray-700">Date</label>
                  <div className="px-4 py-2.5 rounded-lg bg-gray-100 text-gray-700 border border-gray-200">
                    {signatureDate.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>

                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox.Root
                    checked={authorizedToSign}
                    onCheckedChange={(checked) =>
                      setAuthorizedToSign(checked as boolean)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center mt-0.5"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm text-gray-700">
                    I certify I am authorized to sign on behalf of the Business.
                  </span>
                </label>

                <label className="flex items-start gap-3 cursor-pointer">
                  <Checkbox.Root
                    checked={authorizedPayment}
                    onCheckedChange={(checked) =>
                      setAuthorizedPayment(checked as boolean)
                    }
                    className="w-5 h-5 rounded border-2 border-gray-300 bg-white data-[state=checked]:bg-[#FF6B35] data-[state=checked]:border-[#FF6B35] flex items-center justify-center mt-0.5"
                  >
                    <Checkbox.Indicator>
                      <Check className="w-3.5 h-3.5 text-white" />
                    </Checkbox.Indicator>
                  </Checkbox.Root>
                  <span className="text-sm text-gray-700">
                    I authorize payment for this subscription.
                  </span>
                </label>
              </div>
            </section>

            {/* Mobile Submit Button */}
            <div className="lg:hidden">
              <button
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`w-full py-3 px-6 rounded-lg font-medium transition-all shadow-sm ${
                  isFormValid()
                    ? 'bg-[#FF6B35] hover:bg-[#E55A2B] text-white hover:shadow-md cursor-pointer'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                Submit Subscription Agreement
              </button>
            </div>
          </div>

          {/* Right Column - Summary Card (Desktop Only) */}
          <div className="hidden lg:block">
            <SummaryCard
              selectedPlan={planData.name}
              isAnnual={isAnnual}
              planPrice={planPrice}
              monthlyPrice={monthlyPlanPrice}
              setupFee={0}
              addons={getAddonsForSummary()}
              discount={{ type: "percentage", value: 0 }}
              onSubmit={handleSubmit}
              isFormValid={isFormValid()}
            />
          </div>
        </div>
      </div>
    </div>
  );
}