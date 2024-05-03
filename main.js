(() => {
    'use strict';
  
    const getStoredTheme = () => localStorage.getItem('theme');
    const setStoredTheme = theme => localStorage.setItem('theme', theme);
  
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
  
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    };
  
    const setTheme = theme => {
        if (theme === 'auto') {
            document.documentElement.setAttribute('data-bs-theme', (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
        } else {
            document.documentElement.setAttribute('data-bs-theme', theme);
        }
  
        // Change wallpaper of specified div based on theme
        const specifiedDiv = document.getElementById('specified-div');
        if (specifiedDiv) {
            if (theme === 'dark') {
                specifiedDiv.style.backgroundImage = `url('darkmode.gif')`;
                specifiedDiv.querySelector('.side-elements-text').style.color = 'white';
            } else {
                specifiedDiv.style.backgroundImage = `url('lightmode.gif')`;
                specifiedDiv.querySelector('.side-elements-text').style.color = 'black';
            }
        }

        const bmiCard = document.getElementById('bcard');
        if (bmiCard) {
            if (theme === 'dark') {
                bmiCard.style.backgroundColor = 'black';
                bmiCard.querySelector('.cardtext').style.color = 'white';
            } else {
                bmiCard.style.backgroundColor = 'white';
                bmiCard.querySelector('.cardtext').style.color = 'black';
            }
        }
    };
  
    setTheme(getPreferredTheme());
  
    const showActiveTheme = (theme, focus = false) => {
        const themeSwitcher = document.querySelector('#bd-theme');
  
        if (!themeSwitcher) {
            return;
        }
  
        const themeSwitcherText = document.querySelector('#bd-theme-text');
        const activeThemeIcon = document.querySelector('.theme-icon-active use');
        const btnToActive = document.querySelector(`[data-bs-theme-value="${theme}"]`);
        const svgOfActiveBtn = btnToActive.querySelector('svg use').getAttribute('href');
  
        document.querySelectorAll('[data-bs-theme-value]').forEach(element => {
            element.classList.remove('active');
            element.setAttribute('aria-pressed', 'false');
        });
  
        btnToActive.classList.add('active');
        btnToActive.setAttribute('aria-pressed', 'true');
        activeThemeIcon.setAttribute('href', svgOfActiveBtn);
        const themeSwitcherLabel = `${themeSwitcherText.textContent} (${btnToActive.dataset.bsThemeValue})`;
        themeSwitcher.setAttribute('aria-label', themeSwitcherLabel);
  
        if (focus) {
            themeSwitcher.focus();
        }
    };
  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        const storedTheme = getStoredTheme();
        if (storedTheme !== 'light' && storedTheme !== 'dark') {
            setTheme(getPreferredTheme());
        }
    });
  
    window.addEventListener('DOMContentLoaded', () => {
        showActiveTheme(getPreferredTheme());
  
        document.querySelectorAll('[data-bs-theme-value]')
            .forEach(toggle => {
                toggle.addEventListener('click', () => {
                    const theme = toggle.getAttribute('data-bs-theme-value');
                    setStoredTheme(theme);
                    setTheme(theme);
                    showActiveTheme(theme, true);
                });
            });
  
        // Add event listener to Dark Mode button
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        darkModeToggle.addEventListener('click', () => {
            const currentTheme = getStoredTheme();
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            setStoredTheme(newTheme);
            setTheme(newTheme);
            showActiveTheme(newTheme, true);
        });
    });
  })();
  
  let radioMetric = document.getElementById("metric")
  let radioImperial = document.getElementById("imperial")
  let inputImperial = document.getElementById("inputImperial")
  let inputMetric = document.getElementById("inputMetric")
  let space = document.getElementById("space")
  
  //metric values
  let cm = document.getElementById("cm")
  let kg = document.getElementById("kg")
  
  //imperial values
  let ft = document.getElementById("ft")
  let inch = document.getElementById("in")
  let st = document.getElementById("st")
  let lbs = document.getElementById("lbs")
  
  //results
  let welcome = document.getElementById("welcome")
  let calculatedAnswer = document.getElementById("result")
  let bmiScore = document.getElementById("bmi-score")
  let description = document.getElementById("bmi-desc")
  let healthy = document.getElementById("healthy")
  let range = document.getElementById("range")
  
  radioImperial.addEventListener("change", () => {
      if (radioImperial.checked) {
          inputImperial.classList.remove("hide")
          inputMetric.classList.add("hide")
          space.classList.add("space-imp-wel")
      }
  
      if (welcome.classList.contains("hide")){
          welcome.classList.remove("hide")
          calculatedAnswer.classList.add("hide")
      }
  })
  
  radioMetric.addEventListener("change", () => {
      if (radioMetric.checked){
          inputImperial.classList.add("hide")
          inputMetric.classList.remove("hide")
          space.classList.remove("space-imp-wel")
      }
  
      if (welcome.classList.contains("hide")){
          welcome.classList.remove("hide")
          calculatedAnswer.classList.add("hide")
      }
  })
  
  //Calculate metric BMI and indicate weight class
  
  function calculateMetricBMI (heightMeters, weightKg) {
      if(isNaN(weightKg) || isNaN (heightMeters)){
          bmiScore.innerHTML = "NaN"
      }
  
      heightMeters = cm.value/100
      let bmi = weightKg / (heightMeters * heightMeters)
  
      //weight class
      if (bmi > 24.9) {
          healthy.innerHTML = "overweight"
      }else if (bmi < 18.5){
          healthy.innerHTML = "underweight"
      }else{
          healthy.innerHTML = "at a healthy weight"
      }
  
      //weight range
      let weightLower = (18.5 * (heightMeters * heightMeters)).toFixed(1) + "kg"
      let weightHigher = (24.9 * (heightMeters * heightMeters)).toFixed(1) + "kg."
  
      range.innerHTML = weightLower + " - " + weightHigher
      return bmi
  }
  
  //calculate imperial BMI and indicate weight class
  
  function calculateHeightConversion(heightFeet, heightInch) {
      let heightConvert = ((heightFeet * 30.48 + heightInch * 2.54)/100)
      heightConvert = (heightConvert * heightConvert)
      return heightConvert
  }
  
  function calculateWeightConversion(weightStone, weightPound) {
      let weightConvert = (weightStone * 6.35029 + weightPound * 0.45359237)
      return weightConvert
  }
  
  function weightClassRange() {
      let bmi2 = (calculateWeightConversion(st.value, lbs.value) / calculateHeightConversion(ft.value, inch.value)).toFixed(1)
  
      if (bmi2 > 24.9) {
          healthy.innerHTML = "overweight"
      }else if (bmi2 < 18.5){
          healthy.innerHTML = "underweight"
      }else{
          healthy.innerHTML = "at a healthy weight"
      }
  
      let lowerWeight = (18.5 * calculateHeightConversion(ft.value, inch.value)) * 2.205
      let lowerWeightSt= Math.floor(lowerWeight * 0.0714) + "st"
      let lowerWeightPound = Math.floor(lowerWeight % 14) + "lbs"
  
      let upperWeight = (24.9 * calculateHeightConversion(ft.value, inch.value)) * 2.205
      let UpperWeightSt= Math.floor(upperWeight * 0.0714) + "st"
      let upperWeightPound = Math.floor(upperWeight % 14) + "lbs"
  
      range.innerHTML = lowerWeightSt + " " + lowerWeightPound  + " - " + UpperWeightSt + " " + upperWeightPound
  
      return bmi2
  }
  
  //Display results
  function displayMetricResults() {
      if(cm.value !== "" || kg.value !== ""){
          welcome.classList.add("hide")
          calculatedAnswer.classList.remove("hide")
          bmiScore.innerHTML = (calculateMetricBMI(cm.value, kg.value)).toFixed(1)
      }else if(cm.value === "" && kg.value === "") {
          bmiScore.innerHTML = 0
      }
  }
  
  function displayImperialResults() {
          welcome.classList.add("hide")
          calculatedAnswer.classList.remove("hide")
          space.classList.add("space-imp-sp")
          bmiScore.innerHTML = weightClassRange()
  
  }


  cm.addEventListener("input", displayMetricResults)
  kg.addEventListener("input", displayMetricResults)
  ft.addEventListener("input", displayImperialResults)
  inch.addEventListener("input", displayImperialResults)
  st.addEventListener("input", displayImperialResults)
  lbs.addEventListener("input", displayImperialResults)