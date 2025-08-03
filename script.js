<!DOCTYPE html>
< lang="en">

<>
  < charset="UTF-8" />
  < name="viewport" content="width=device-width, initial-scale=1.0" />
  <>IronHaus Auto Insurance<>
  <script src="https://cdn.tailwindcss.com"></script>
  <script src="https://js.stripe.com/v3/"></script>
</>

< class="bg-gray-100 text-gray-800">
  <!-- Header -->
  <header class="bg-blue-900 text-white shadow p-4">
    <div class="container mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">IronHaus Auto Insurance</h1>
      <p class="text-sm">Call us: 1-800-XXX-XXXX</p>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="bg-blue-800 text-white py-20 px-6 text-center">
    <h2 class="text-4xl font-bold mb-4">Affordable Car Insurance. Simple & Fast.</h2>
    <p class="text-lg mb-6">Liability at $60/mo • Full Coverage at $120/mo • With Roadside </p>
    <a href="#quote" class="bg-white text-blue-800 px-6 py-3 font-semibold rounded hover:bg-gray-100 transition">Get a Quote</a>
  </section>

  <!-- How It Works -->
  <section class="py-16 px-6 text-center">
    <h3 class="text-3xl font-bold mb-8">How It Works</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      <div>
        <h4 class="text-xl font-semibold mb-2">1. Fill out your info</h4>
        <p>Answer a few basic questions about your car and driving history.</p>
      </div>
      <div>
        <h4 class="text-xl font-semibold mb-2">2. Get a price</h4>
        <p>Your monthly premium updates in real time based on your risk level.</p>
      </div>
      <div>
        <h4 class="text-xl font-semibold mb-2">3. Pay & Get Covered</h4>
        <p>Pay online and receive your insurance card and coverage PDF in minutes.</p>
      </div>
    </div>
  </section>

<!-- Quote Section -->
<section id="quote" class="bg-white py-16 px-6">
  <h3 class="text-3xl font-bold text-center mb-8">Get Your Instant Quote</h3>
  <form class="max-w-2xl mx-auto grid grid-cols-1 gap-4" onsubmit="event.preventDefault(); startCheckout();">
    <input type="text" id="fullName" placeholder="Full Name" class="p-3 border rounded" required>
    <input type="text" id="makeModel" placeholder="Vehicle Make/Model" class="p-3 border rounded" required>
    <input type="number" id="carYear" placeholder="Vehicle Year (e.g. 2020)" class="p-3 border rounded" required>
    <input type="text" id="vinNumber" placeholder="VIN Number" class="p-3 border rounded" required>
    <input type="text" id="address" placeholder="Full Address" class="p-3 border rounded" required>

    <select id="age" class="p-3 border rounded" required>
      <option value="">Select Age Group</option>
      <option value="3">Under 25</option>
      <option value="1">25–40</option>
      <option value="0">41–60</option>
      <option value="0">Over 60</option>
    </select>

    <select id="gender" class="p-3 border rounded" required>
      <option value="">Gender</option>
      <option value="2">Male</option>
      <option value="1">Wish to not disclose</option>
      <option value="0">Female</option>
      <option value="0">Non-Binary</option>
    </select>

    <select id="accidents" class="p-3 border rounded" required>
      <option value="">Accidents/Tickets in Last 3 Years?</option>
      <option value="5">Yes</option>
      <option value="0">No</option>
    </select>

    <select id="suspended" class="p-3 border rounded" required>
      <option value="">License Suspended in Last 3 Years?</option>
      <option value="4">Yes</option>
      <option value="0">No</option>
    </select>

    <select id="coverage" class="p-3 border rounded" required>
      <option value="60">Liability ($60 base)</option>
      <option value="120">Full Coverage ($120 base)</option>
    </select>

    <div class="text-xl font-semibold text-center">
      Estimated Monthly Price: <span id="quotePrice">$0</span>
    </div>

    <button type="submit" class="bg-blue-800 text-white py-3 rounded hover:bg-blue-700 transition">Continue to Payment</button>
  </form>
</section>

<script>
  const basePrices = {
    60: 60,
    120: 120
  };

  function calculatePrice() {
    const coverage = parseInt(document.getElementById("coverage").value);
    const ageRisk = parseInt(document.getElementById("age").value || "0");
    const genderRisk = parseInt(document.getElementById("gender").value || "0");
    const carYear = parseInt(document.getElementById("carYear").value || "0");
    const currentYear = new Date().getFullYear();
    const accidentRisk = parseInt(document.getElementById("accidents").value || "0");
    const suspensionRisk = parseInt(document.getElementById("suspended").value || "0");

    const carRisk = (carYear >= currentYear - 4) ? 1 : 0;

    const totalRiskPoints = ageRisk + genderRisk + carRisk;
    const riskMultiplier = 7 * totalRiskPoints;
    const totalRisk = riskMultiplier + accidentRisk + suspensionRisk;

    const finalPrice = basePrices[coverage] + totalRisk;
    document.getElementById("quotePrice").innerText = `$${finalPrice}/mo`;
    return finalPrice;
  }

  ["age", "gender", "carYear", "coverage", "accidents", "suspended"].forEach(id => {
    document.getElementById(id).addEventListener("change", calculatePrice);
  });
</script>

<!-- Footer -->
<footer class="bg-gray-200 text-center py-6 text-sm mt-16">
  &copy; 2025 IronHaus Auto Insurance. All rights reserved.
</footer>

<script>
  const basePrices = {
    "60": 60,
    "120": 120
  };

  function calculatePrice() {
    const coverage = document.getElementById("coverage").value;
    const ageRisk = parseInt(document.getElementById("age").value || "0");
    const genderRisk = parseInt(document.getElementById("gender").value || "0");
    const carYear = parseInt(document.getElementById("carYear").value || "0");
    const currentYear = new Date().getFullYear();
    let carRisk = 0;

    if (carYear >= currentYear - 4) {
      carRisk = 1; // Newer car = higher risk
    }

    const riskFactors = ageRisk + genderRisk + carRisk;
    const riskCost = riskFactors * 7;
    const finalPrice = basePrices[coverage] + riskCost;

    document.getElementById("quotePrice").innerText = `$${finalPrice}/mo`;
    return finalPrice;
  }

  document.getElementById("coverage").addEventListener("change", calculatePrice);
  document.getElementById("age").addEventListener("change", calculatePrice);
  document.getElementById("gender").addEventListener("change", calculatePrice);
  document.getElementById("carYear").addEventListener("input", calculatePrice);

  function startCheckout() {
    const stripe = Stripe("pk_live_YOUR_PUBLIC_KEY_HERE");

    // Collect user info for PDF
    const fullName = document.getElementById("fullName").value;
    const makeModel = document.getElementById("makeModel").value;
    const carYear = document.getElementById("carYear").value;
    const vin = document.getElementById("vin").value;
    const address = document.getElementById("address").value;
    const finalPrice = calculatePrice();

    // Choose Stripe price ID based on quote tier
    let priceId = "";
    if (finalPrice <= 74) priceId = "price_LOW";
    else if (finalPrice <= 89) priceId = "price_MED";
    else priceId = "price_HIGH";

    // Redirect to Stripe checkout
    stripe.redirectToCheckout({
      lineItems: [{
        price: priceId,
        quantity: 1
      }],
      mode: 'subscription',
      successUrl: `https://yourdomain.com/success?name=${encodeURIComponent(fullName)}&year=${encodeURIComponent(carYear)}&model=${encodeURIComponent(makeModel)}&vin=${encodeURIComponent(vin)}&address=${encodeURIComponent(address)}`,
      cancelUrl: 'https://yourdomain.com/cancel'
    }).then(function (result) {
      if (result.error) {
        alert(result.error.message);
      }
    });
  }
</script>
