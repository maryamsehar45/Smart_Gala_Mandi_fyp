// Working Google Translate toggle
document.getElementById("translate-btn").addEventListener("click", function () {
  const googleFrame = document.querySelector(".goog-te-menu-frame");
  if (!googleFrame) {
    alert("Please wait for the translator to load...");
    return;
  }
  const innerDoc = googleFrame.contentDocument || googleFrame.contentWindow.document;
  const urduBtn = innerDoc.querySelector('[lang="ur"]');
  const englishBtn = innerDoc.querySelector('[lang="en"]');
  
  const currentLang = document.documentElement.lang;
  if (currentLang === "en") {
    urduBtn.click();
    document.documentElement.lang = "ur";
  } else {
    englishBtn.click();
    document.documentElement.lang = "en";
  }
});
