const input_name = document.getElementById("input_name");
const save_button = document.getElementById("save_button");
const high_scores = JSON.parse(localStorage.getItem("high_scores")) || [];

const scores = {
  score: gameScore,
  name: input_name.value,
};

saveHighScore = (event) => {
  high_scores.push(scores);
  high_scores.sort((a, b) => b.gameScore - a.gameScore);
  high_scores.splice(5);

  localStorage.setItem("high_scores", JSON.stringify(high_scores));
};
