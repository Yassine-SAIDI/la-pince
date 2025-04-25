(async () => {
  const lighthouse = (await import("lighthouse")).default;
  const chromeLauncher = (await import("chrome-launcher")).default;
  const fs = await import("fs");
  const path = await import("path");

  const testPerformance = async (url) => {
    const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
    const options = {
      logLevel: "info",
      output: "html",
      onlyCategories: ["performance", "accessibility", "best-practices", "seo"],
      port: chrome.port,
    };

    const runnerResult = await lighthouse(url, options);
    const reportDir = path.join(process.cwd(), "performance-reports");

    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    const reportPath = path.join(
      reportDir,
      `lighthouse-${new Date().toISOString().slice(0, 10)}.html`
    );
    // runnerResult.report est déjà le HTML
    fs.writeFileSync(reportPath, runnerResult.report);

    console.log(
      `Performance score: ${
        runnerResult.lhr.categories.performance.score * 100
      }`
    );
    console.log(
      `Accessibility score: ${
        runnerResult.lhr.categories.accessibility.score * 100
      }`
    );
    console.log(`Report saved to: ${reportPath}`);

    await chrome.kill();
  };

  // Test sur les pages principales
  const urls = [
    "http://localhost:3000",
    "http://localhost:3000/dashboard",
    "http://localhost:3000/transactions",
  ];

  for (const url of urls) {
    console.log(`Testing: ${url}`);
    await testPerformance(url);
  }
})();
