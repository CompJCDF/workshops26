/*
 * Store the reader's current choices.
 */
const state = {
  house: null,
  senate: null
};


/*
 * The four possible combinations.
 *
 * D = Democratic
 * R = Republican
 *
 * First letter = House
 * Second letter = Senate
 */
const scenarios = {

  DR: {
    title:
      "Democrats win the House, Republicans keep the Senate",

    paragraphs: [
      `House Democrats could expand investigations into Trump’s administration.`,

      `<a
        href="https://apnews.com/article/house-democrats-trump-impeachment-investigations-corruption-jeffries-84bfad2502c42c7e43629f989601f356"
        target="_blank"
        rel="noopener noreferrer"
      >Trump family businesses, the Epstein investigation and immigration enforcement</a>
      could come under the scanner.`,

      `They could block Republican bills and negotiate spending, while Republican senators could continue
      <a
        href="https://www.senate.gov/about/powers-procedures/nominations.htm"
        target="_blank"
        rel="noopener noreferrer"
      >confirming Trump’s nominees</a>.`,

      `Trump would retain his veto and executive powers.`
    ]
  },


  DD: {
    title:
      "Democrats win the House and Senate",

    paragraphs: [
      `Democrats could lead investigations in both chambers.`,

      `They could
      <a
        href="https://www.senate.gov/about/powers-procedures/nominations.htm"
        target="_blank"
        rel="noopener noreferrer"
      >reject or delay Trump’s nominees</a>,
      including any future Supreme Court nomination.`,

      `They could shape laws and spending, but Trump would retain his
      <a
        href="https://history.house.gov/institution/presidential-vetoes/Presidential-vetoes/"
        target="_blank"
        rel="noopener noreferrer"
      >veto</a>.`,

      `Senate voting rules could still require Republican support for some legislation.`
    ]
  },


  RD: {
    title:
      "Democrats win the Senate, Republicans keep the House",

    paragraphs: [
      `Senate Democrats could
      <a
        href="https://www.senate.gov/about/powers-procedures/nominations.htm"
        target="_blank"
        rel="noopener noreferrer"
      >reject or delay new nominees</a>
      for Cabinet jobs, judgeships and other senior posts.`,

      `They could lead investigations in the Senate.`,

      `Democrats could also negotiate over government spending.`,

      `Their bills would still need
      <a
        href="https://www.house.gov/the-house-explained/the-legislative-process"
        target="_blank"
        rel="noopener noreferrer"
      >Republican House approval</a>
      and could face Trump’s veto.`
    ]
  },


  RR: {
    title:
      "Republicans keep the House and Senate",

    paragraphs: [
      `Republicans would have a clearer route to passing Trump’s agenda and confirming his nominees.`,

      `Some tax and spending bills could pass under
      <a
        href="https://www.congress.gov/crs_external_products/R/PDF/R48474/R48474.1.pdf"
        target="_blank"
        rel="noopener noreferrer"
      >special budget rules</a>.`,

      `Most contested Senate legislation would still need
      <a
        href="https://www.senate.gov/about/powers-procedures/filibusters-cloture.htm"
        target="_blank"
        rel="noopener noreferrer"
      >60 votes to advance</a>.`,

      `Party divisions, courts and existing laws would continue to limit him.`
    ]
  }

};


const partyNames = {
  D: "Democratic",
  R: "Republican"
};


/*
 * Find the elements JavaScript needs to update.
 */
const buttons =
  document.querySelectorAll(".party-button");

const resetButton =
  document.getElementById("resetButton");

const houseCard =
  document.getElementById("houseCard");

const senateCard =
  document.getElementById("senateCard");

const houseState =
  document.getElementById("houseState");

const senateState =
  document.getElementById("senateState");

const balanceLabel =
  document.getElementById("balanceLabel");

const resultPanel =
  document.getElementById("resultPanel");

const scenarioTitle =
  document.getElementById("scenarioTitle");

const scenarioRows =
  document.getElementById("scenarioRows");


/**
 * Store a party choice and refresh the interactive.
 *
 * @param {string} chamber - House or Senate.
 * @param {string} party - D or R.
 */
function selectParty(chamber, party) {

  state[chamber] = party;

  updateButtons(chamber, party);
  updateChamberCards();
  updateScenario();

}


/**
 * Update the selected state of the buttons.
 *
 * @param {string} chamber - House or Senate.
 * @param {string} party - D or R.
 */
function updateButtons(chamber, party) {

  const chamberButtons =
    document.querySelectorAll(
      `.party-button[data-chamber="${chamber}"]`
    );


  chamberButtons.forEach((button) => {

    const isSelected =
      button.dataset.party === party;


    button.setAttribute(
      "aria-pressed",
      String(isSelected)
    );

  });

}


/**
 * Update the House and Senate cards.
 */
function updateChamberCards() {

  updateCard(
    houseCard,
    houseState,
    state.house
  );


  updateCard(
    senateCard,
    senateState,
    state.senate
  );

}


/**
 * Change a chamber card to match its selected party.
 *
 * @param {HTMLElement} card - The chamber card.
 * @param {HTMLElement} label - The status text.
 * @param {string|null} party - D, R or no selection.
 */
function updateCard(
  card,
  label,
  party
) {

  card.classList.remove(
    "selected-dem",
    "selected-rep"
  );


  if (!party) {

    label.textContent =
      "Not selected";

    return;

  }


  label.textContent =
    `${partyNames[party]} control`;


  card.classList.add(
    party === "D"
      ? "selected-dem"
      : "selected-rep"
  );

}


/**
 * Display the correct scenario when both chambers
 * have been selected.
 */
function updateScenario() {

  if (!state.house || !state.senate) {

    resultPanel.classList.add(
      "is-waiting"
    );


    resultPanel.classList.remove(
      "has-result"
    );


    balanceLabel.textContent =
      "Choose both chambers";


    scenarioTitle.textContent = "";


    scenarioRows.replaceChildren();


    return;

  }


  /*
   * Example:
   * Democratic House + Republican Senate = DR
   */
  const key =
    `${state.house}${state.senate}`;


  const scenario =
    scenarios[key];


  if (state.house !== state.senate) {

    balanceLabel.textContent =
      "Split Congress";

  } else if (state.house === "D") {

    balanceLabel.textContent =
      "Democrats control Congress";

  } else {

    balanceLabel.textContent =
      "Republicans control Congress";

  }


  scenarioTitle.textContent =
    scenario.title;


  scenarioRows.replaceChildren();


  scenario.paragraphs.forEach(
    (paragraph, index) => {

      const row =
        document.createElement("div");


      row.className =
        "scenario-row";


      const number =
        document.createElement("span");


      number.className =
        "row-number";


      number.setAttribute(
        "aria-hidden",
        "true"
      );


      number.textContent =
        String(index + 1).padStart(2, "0");


      const text =
        document.createElement("p");


      /*
       * The stored copy contains source links,
       * so innerHTML is used rather than textContent.
       */
      text.innerHTML =
        paragraph;


      row.append(
        number,
        text
      );


      scenarioRows.appendChild(row);

    }
  );


  resultPanel.classList.remove(
    "is-waiting"
  );


  resultPanel.classList.add(
    "has-result"
  );

}


/**
 * Return everything to its starting state.
 */
function resetInteractive() {

  state.house = null;
  state.senate = null;


  buttons.forEach((button) => {

    button.setAttribute(
      "aria-pressed",
      "false"
    );

  });


  updateChamberCards();
  updateScenario();

}


/*
 * Run the selection function whenever
 * a party button is clicked.
 */
buttons.forEach((button) => {

  button.addEventListener(
    "click",
    () => {

      selectParty(
        button.dataset.chamber,
        button.dataset.party
      );

    }
  );

});


/*
 * Reset the interactive.
 */
resetButton.addEventListener(
  "click",
  resetInteractive
);


/*
 * Start with no selections.
 */
resetInteractive();
