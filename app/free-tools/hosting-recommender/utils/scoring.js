// Simple weighted scoring function — tweak weights as desired
export function calculateRecommendations(answers, hosts) {
  return hosts
    .map((host) => {
      let score = 0;

      // Example weights (adjust to your preference)
      // Priority: Speed/Support/Price/Scalability
      if (answers.websiteType) {
        // prefer hosts that mention the site type in their name/bestFor (if you have that data)
      }

      if (answers.priority) {
        if (answers.priority.toLowerCase().includes("speed") && host.performance === "Excellent") {
          score += 30;
        }
        if (answers.priority.toLowerCase().includes("support") && host.support.toLowerCase().includes("24")) {
          score += 30;
        }
        if (answers.priority.toLowerCase().includes("afford") && host.price <= 5) {
          score += 25;
        }
        if (answers.priority.toLowerCase().includes("scalab") && host.value === "High") {
          score += 20;
        }
      }

      if (answers.budget) {
        // crude budget mapping
        if (answers.budget.includes("<$5") && host.price <= 5) score += 20;
        if (answers.budget.includes("$5") && host.price <= 15) score += 15;
        if (answers.budget.includes("$15") && host.price <= 30) score += 10;
      }

      if (answers.traffic) {
        if (answers.traffic.includes("100k") && host.performance === "Excellent") score += 15;
        if (answers.traffic.includes("50k") && host.performance !== "Poor") score += 10;
      }

      // small boost from rating
      score += (host.rating || 4) * 2;

      return { ...host, score };
    })
    .sort((a, b) => b.score - a.score);
}
