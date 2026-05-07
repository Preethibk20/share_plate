# Research Guide: Understanding and Explaining SharePlate

Use this guide to prepare for your project viva, presentation, or report. It provides the "Why" behind the "What."

---

## 1. The Global Problem: A Paradox of Plenty
**The Statistics:**
- **Global Hunger**: In 2024, approximately **673 million people** (8.2% of the population) suffered from chronic hunger.
- **Global Waste**: Simultaneously, the world wastes **1.05 billion tonnes** of food annually—about 19% of all food available to consumers.
- **The Gap**: Retailers and food services (restaurants/hotels) contribute **40% of this waste** (approx. 421 million tonnes).

**The Explanation:**
"SharePlate isn't solving a production problem; it’s solving a **logistics problem**. We produce enough food to feed everyone, but we fail to move surplus food from commercial centers to social centers within the 2-4 hour 'safe window' for consumption."

---

## 2. Environmental Impact: More Than Just Food
**The Research:**
- **Methane Emissions**: Food decomposing in landfills is a leading source of methane, which is **80 times more potent** than CO2 over a 20-year period.
- **Carbon Footprint**: Food loss and waste contribute to **8–10% of global greenhouse gas emissions**.
- **Resource Sunk Costs**: When we waste a meal, we also waste the **land, water, energy, and labor** used to produce it.

**The Explanation:**
"By redirecting food from landfills to plates, SharePlate acts as a **Climate Action Tool**. We are effectively reducing the carbon footprint of the local food industry by ensuring that the resources already invested in food production aren't lost to a landfill."

---

## 3. Technical Justification: Why Next.js & Leaflet?
**Next.js 14 (App Router):**
- **Performance**: Uses Server-Side Rendering (SSR) so the app loads fast even on low-end mobile devices used by volunteers.
- **SEO**: Important for NGOs to be discoverable by potential donors.

**Leaflet.js & OpenStreetMap:**
- **Open Source**: Unlike Google Maps, it’s free and highly customizable for social projects.
- **Geospatial Logic**: We use the **Haversine Formula** (the shortest distance between two points on a sphere) to calculate the "Nearby" listings, ensuring transporters don't waste fuel traveling too far.

**Role-Based Access Control (RBAC):**
- **Privacy**: Protects the location of vulnerable receivers (shelters) and the personal data of donors.

---

## 4. The "Triple Win" Model
Your project creates value in three specific ways:
1. **Environmental Win**: Diverts waste from landfills and reduces methane.
2. **Social Win**: Provides high-quality, nutritious meals to NGOs, reducing their operational costs.
3. **Economic Win**: Helps businesses (donors) save on waste disposal fees and improves their ESG (Environmental, Social, and Governance) rating.

---

## 5. Key Concept: The "Golden Hour" of Food Safety
**The Concept:**
Cooked food remains safe at room temperature for roughly **2 to 4 hours**. This is the "Golden Hour" for redistribution.

**The Explanation:**
"SharePlate’s real-time notification engine and map-based transporter assignment are designed specifically to beat the clock. Manual coordination (calls/emails) is too slow for the Golden Hour; our platform automates this to ensure food reaches the receiver while it is still safe and high-quality."

---

## 6. Future-Proofing: What’s Next?
If asked about the future, mention these research-backed trends:
- **Predictive Analytics**: Using AI to tell a restaurant *how much* they will likely waste next Friday based on past data.
- **Blockchain for Transparency**: An immutable ledger that proves a donation was safely delivered, which is crucial for tax incentives and legal protections.
