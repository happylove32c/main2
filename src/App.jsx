import React, { useEffect, useState } from 'react';

const Players = () => {
  const [players, setPlayers] = useState({ player1: 'Player 1', player2: 'Player 2' });
  const [questions, setQuestions] = useState([]); // Will store shuffled questions
  const [questionIndex, setQuestionIndex] = useState(0); // Tracks the current shuffled question
  const [askedQuestions, setAskedQuestions] = useState([]); // Store the indices of asked questions
  const [turn, setTurn] = useState('player1'); // Track whose turn it is
  const [scores, setScores] = useState({ player1: 0, player2: 0 }); // Store player scores
  const [showModal, setShowModal] = useState(false); // To show the modal when 150 points is reached

  useEffect(() => {
    const defaultQuestions = [
      "What is the name of the king who discovered the Book of the Law during temple renovations, leading to major religious reforms in Judah?",
      "In the Book of Numbers, who succeeded Aaron as high priest?",
      "Complete the prophecy from Amos: 'The days are coming, declares the Lord, when the reaper will be overtaken by the plowman and the planter by the one treading...'",
      "What does the name 'Maher-Shalal-Hash-Baz,' the son of Isaiah, mean?",
      "Which Psalm begins with the cry: 'Why do the nations conspire, and the peoples plot in vain?'",
      "In Ezekiel’s vision of the new temple, what is the significance of the water flowing from under the threshold of the temple?",
      "Which obscure Old Testament figure is mentioned as the ancestor of the Rechabites, who were praised for their faithfulness to their forefather’s command?",
      "Complete the verse: 'In the beginning God created the heaven and the...'",
      "What object did Aaron’s rod miraculously turn into before Pharaoh?",
      "Complete the verse from Isaiah: 'But those who hope in the Lord will renew their strength. They will soar on wings like...'",
      "What was the name of the mountain where Moses received the Ten Commandments?",
      "What is the shortest verse in the Old Testament?",
      "Who is the prophet that had a vision of a valley of dry bones?",
      "Who was the father of King David?",
      "Complete the verse: 'For the mystery of lawlessness is already at work; only he who now restrains it will do so until he is...'",
      "In which New Testament letter is the phrase 'faith without works is dead' found, and what example is given to illustrate this?",
      "What is the name of the woman mentioned in Romans 16 who is called a deacon of the church in Cenchreae?",
      "What specific event is referenced in Jude 9, involving the Archangel Michael?",
      "According to the Book of Hebrews, Melchizedek is described as 'without father, without mother, without genealogy.' Why is he compared to Christ?",
      "In the Parable of the Ten Virgins, what did the foolish virgins fail to bring?",
    ];

    shuffleArray(defaultQuestions);
    setQuestions(defaultQuestions);
  }, []);

  // Shuffle the questions array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
  };

  // Function to get a random question that hasn't been asked
  const getNextQuestion = () => {
    const availableQuestions = questions.filter((_, index) => !askedQuestions.includes(index));
    if (availableQuestions.length === 0) return null; // No more questions available
    const randomIndex = Math.floor(Math.random() * availableQuestions.length);
    const question = availableQuestions[randomIndex];
    const questionIndex = questions.indexOf(question);
    setAskedQuestions((prev) => [...prev, questionIndex]);
    return question;
  };

  // Add points when the player answers a question
  const handleAddPoints = (player) => {
    const bonus = turn !== player ? 10 : 0;
    const newScore = scores[player] + 10 + bonus;

    setScores((prevScores) => {
      const updatedScores = { ...prevScores, [player]: newScore };
      return updatedScores;
    });

    if (newScore >= 150) {
      setShowModal(true);
    }

    setTurn(turn === 'player1' ? 'player2' : 'player1');

    // Get the next question
    const nextQuestion = getNextQuestion();
    if (nextQuestion) {
      setQuestionIndex(questions.indexOf(nextQuestion));
    } else {
      setShowModal(true); // Show modal if no more questions
    }
  };

  // Toggle visibility of the current question
  const handleToggleQuestion = () => {
    setIsQuestionVisible(!isQuestionVisible);
  };

  // Skip the current question and go to the next one
  const handleSkipQuestion = () => {
    const nextQuestion = getNextQuestion();
    if (nextQuestion) {
      setQuestionIndex(questions.indexOf(nextQuestion));
      setTurn(turn === 'player1' ? 'player2' : 'player1');
    } else {
      setShowModal(true); // Show modal if no more questions
    }
  };

  // Reset the game (clear scores, questionIndex, and players)
  const handleResetGame = () => {
    setScores({ player1: 0, player2: 0 });
    setQuestionIndex(0);
    setAskedQuestions([]);
  };

  // Close the modal
  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <main className="bg-blue-200 min-h-screen flex flex-col p-8 justify-center items-center gap-3">
        <div className="Number header flex flex-col gap-3 items-center mb-3 justify-center">
          <h1 className="font-extrabold text-4xl text-[#1C274C] tracking-wide glow">
            Question {questionIndex + 1}:
          </h1>
          <h1 className="Question text-2xl text-[#1C274C] capitalize">
            {questions[questionIndex]}
          </h1>
        </div>

        <div className="bg-white w-3/4 p-6 rounded-xl shadow-xl border-4 border-[#1C274C] neon-border">
          <div className="players flex flex-row justify-around items-center">
            <div className="player">
              <div className="image p-6 m-3 flex flex-col gap-4 items-center rounded-lg bg-blue-100 shadow-inner game-card">
                <img
                  src="https://www.svgrepo.com/show/512697/profile-1341.svg"
                  className="h-24 neon-img"
                  alt="Player 1"
                />
                <h1 className="text-[#1C274C] text-2xl font-bold uppercase">Team 1</h1>
                <p className="score text-[#1C274C] text-xl font-semibold">
                  Score: <span className="text-2xl text-blue-600">{scores.player1}</span>
                </p>
                <div className="score-action flex justify-between gap-4 mt-4">
                  <button
                    onClick={() => handleAddPoints('player1')}
                    className="pl-6 pr-6 py-2 bg-[#1C274C] text-white rounded-full hover:bg-blue-500 hover:scale-110 transition-all border-2 border-[#1C274C] game-btn"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2">
              <div>
                <button
                  onClick={handleSkipQuestion}
                  className="px-6 py-2 bg-[#FF6347] text-white rounded-full hover:bg-red-600 mt-4"
                >
                  Skip Question
                </button>
              </div>
            </div>

            <div className="player">
              <div className="image p-6 m-3 flex flex-col gap-4 items-center rounded-lg bg-blue-100 shadow-inner game-card">
                <img
                  src="https://www.svgrepo.com/show/512697/profile-1341.svg"
                  className="h-24 neon-img"
                  alt="Player 2"
                />
                <h1 className="text-[#1C274C] text-2xl font-bold uppercase">Team 2</h1>
                <p className="score text-[#1C274C] text-xl font-semibold">
                  Score: <span className="text-2xl text-blue-600">{scores.player2}</span>
                </p>
                <div className="score-action flex justify-between gap-4 mt-4">
                  <button
                    onClick={() => handleAddPoints('player2')}
                    className="pl-6 pr-6 py-2 bg-[#1C274C] text-white rounded-full hover:bg-blue-500 hover:scale-110 transition-all border-2 border-[#1C274C] game-btn"
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="header flex flex-col gap-3 items-center mt-6">
          <h1 className="turn text-xl text-[#1C274C] capitalize">
            It's {players[turn] ? players[turn] : 'Player/Team 1'}'s turn to answer
          </h1>
        </div>

        <button
          onClick={handleResetGame}
          className="px-6 py-2 mt-6 bg-red-500 text-white rounded-full hover:bg-red-700 transition-all"
        >
          Reset Game
        </button>

        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-xl max-w-sm w-full">
              <h2 className="text-2xl font-bold text-[#1C274C]">Game Over!</h2>
              <p className="text-xl text-[#1C274C] mt-4">
                Congratulations to <span className="font-bold">{scores.player1 >= 150 ? players.player1 : players.player2}</span>!
              </p>
              <p className="text-lg mt-2">
                <span className="font-bold">Player 1 Score:</span> {scores.player1}
              </p>
              <p className="text-lg mt-2">
                <span className="font-bold">Player 2 Score:</span> {scores.player2}
              </p>
              <button
                onClick={closeModal}
                className="mt-4 px-6 py-2 bg-[#1C274C] text-white rounded-full hover:bg-blue-500"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default Players;
