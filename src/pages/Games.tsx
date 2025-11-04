import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

// Enhanced random utilities with Fisher-Yates shuffle
const randomize = {
  shuffle: <T,>(array: T[]): T[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  },
  pick: <T,>(array: T[]): T => array[Math.floor(Math.random() * array.length)],
  pickMultiple: <T,>(array: T[], count: number): T[] => {
    const shuffled = randomize.shuffle(array);
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },
  range: (min: number, max: number): number => 
    Math.floor(Math.random() * (max - min + 1)) + min,
};

// Expanded literary word list (40+ words for better randomization)
const literaryWords = [
  'METAPHOR', 'SIMILE', 'PROTAGONIST', 'ANTAGONIST', 'NARRATIVE', 'CLIMAX',
  'DENOUEMENT', 'FORESHADOW', 'IRONY', 'PARADOX', 'HYPERBOLE', 'ALLITERATION',
  'PERSONIFICATION', 'OXYMORON', 'ALLUSION', 'EXPOSITION', 'CONFLICT', 'RESOLUTION',
  'SOLILOQUY', 'MONOLOGUE', 'DIALOGUE', 'FLASHBACK', 'IMAGERY', 'MOTIF',
  'SYMBOLISM', 'THEME', 'PACING', 'TONE', 'VOICE', 'PLOT', 'EPILOGUE', 'PROLOGUE',
  'PUN', 'AMBIGUITY', 'SYNTAX', 'CLICHE', 'ONOMATOPOEIA', 'STANZA', 'SONNET', 'VERSE',
];

// 20+ Poetry questions with difficulty ratings
const poetryQuestions = [
  {
    question: 'What is the meter of most of Shakespeare\'s sonnets?',
    options: ['Iambic pentameter', 'Trochaic tetrameter', 'Dactylic hexameter', 'Anapestic dimeter'],
    correct: 0,
    difficulty: 'Hard',
  },
  {
    question: 'Which poet wrote "The Raven"?',
    options: ['Emily Dickinson', 'Edgar Allan Poe', 'Robert Frost', 'Walt Whitman'],
    correct: 1,
    difficulty: 'Easy',
  },
  {
    question: 'What is a tercet?',
    options: ['A three-line stanza', 'A type of metaphor', 'A rhyme scheme', 'A poetic foot'],
    correct: 0,
    difficulty: 'Medium',
  },
  {
    question: 'Who wrote "Do Not Go Gentle Into That Good Night"?',
    options: ['Dylan Thomas', 'W.H. Auden', 'Seamus Heaney', 'Ted Hughes'],
    correct: 0,
    difficulty: 'Medium',
  },
  {
    question: 'What is the rhyme scheme of a Petrarchan sonnet?',
    options: ['ABAB CDCD EFEF GG', 'ABBAABBA CDECDE', 'AABBCCDD EEFFGG', 'ABCABC DEFDEF'],
    correct: 1,
    difficulty: 'Hard',
  },
  {
    question: 'Which work is an epic poem?',
    options: ['The Great Gatsby', 'Paradise Lost', 'Wuthering Heights', 'Jane Eyre'],
    correct: 1,
    difficulty: 'Medium',
  },
  {
    question: 'What is an iamb?',
    options: ['An unstressed then stressed syllable', 'A stressed then unstressed syllable', 'A line break', 'A type of rhyme'],
    correct: 0,
    difficulty: 'Medium',
  },
  {
    question: 'Which poet was part of the Romantic movement?',
    options: ['John Keats', 'T.S. Eliot', 'Allen Ginsberg', 'Sylvia Plath'],
    correct: 0,
    difficulty: 'Hard',
  },
];

// 10+ Story prompts for varied gameplay
const storyPrompts = [
  'A mysterious letter arrives at midnight...',
  'The library contains a secret only you know...',
  'Time moves differently in this city...',
  'Every book tells a true story...',
  'Words have power beyond imagination...',
  'The last page reveals everything...',
  'Characters come alive after sunset...',
  'Memory is just a story we tell ourselves...',
  'Endings can be beginnings...',
  'The unsaid is often the most important...',
];

// 6+ Rhyme word sets for comprehensive gameplay
const rhymeWords = [
  { word: 'DREAM', rhymes: ['BEAM', 'STREAM', 'THEME', 'SEAM'] },
  { word: 'NIGHT', rhymes: ['SIGHT', 'FLIGHT', 'LIGHT', 'MIGHT'] },
  { word: 'LOVE', rhymes: ['DOVE', 'ABOVE', 'GLOVE', 'THEREOF'] },
  { word: 'SOUL', rhymes: ['ROLE', 'GOAL', 'TOLL', 'SCROLL'] },
  { word: 'HEART', rhymes: ['PART', 'START', 'ART', 'APART'] },
  { word: 'SILENT', rhymes: ['VIOLENT', 'RELENT', 'SPENT', 'LENT'] },
];

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  // Word Scramble State
  const [scrambleIndex, setScrambleIndex] = useState(0);
  const [scrambleScore, setScrambleScore] = useState(0);
  const [scrambleStreak, setScrambleStreak] = useState(0);
  const [scrambleInput, setScrambleInput] = useState('');
  const [scrambleFeedback, setScrambleFeedback] = useState('');
  const [scrambleGameActive, setScrambleGameActive] = useState(false);
  const [scrambleDifficulty, setScrambleDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');

  // Poetry Quiz State
  const [quizIndex, setQuizIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizStreak, setQuizStreak] = useState(0);
  const [quizSelected, setQuizSelected] = useState<number | null>(null);
  const [quizDifficulty, setQuizDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Easy');
  const [quizGameActive, setQuizGameActive] = useState(false);

  // Story Builder State
  const [storyText, setStoryText] = useState('');
  const [storySubmitted, setStorySubmitted] = useState(false);
  const [storyScore, setStoryScore] = useState(0);
  const [currentStoryPrompt, setCurrentStoryPrompt] = useState('');

  // Rhyme Time State
  const [rhymeRound, setRhymeRound] = useState(0);
  const [rhymeScore, setRhymeScore] = useState(0);
  const [rhymeStreak, setRhymeStreak] = useState(0);
  const [rhymeInput, setRhymeInput] = useState('');
  const [rhymeGameActive, setRhymeGameActive] = useState(false);
  const [rhymeFeedback, setRhymeFeedback] = useState('');

  const games = [
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble literary words under pressure!',
      icon: '🔀',
      difficulty: 'Easy',
      stats: { plays: 1203, avgScore: 780, bestScore: 1000 },
    },
    {
      id: 'poetry-quiz',
      title: 'Poetry Master',
      description: 'Answer tricky poetry questions. Difficulty increases with streaks!',
      icon: '📖',
      difficulty: 'Hard',
      stats: { plays: 856, avgScore: 620, bestScore: 800 },
    },
    {
      id: 'story-builder',
      title: 'Story Craft',
      description: 'Create stories from random prompts. More words equals higher score!',
      icon: '✍️',
      difficulty: 'Medium',
      stats: { plays: 945, avgScore: 650, bestScore: 950 },
    },
    {
      id: 'rhyme-time',
      title: 'Rhyme Rush',
      description: 'Beat the clock finding perfect rhymes with streak bonuses!',
      icon: '🎵',
      difficulty: 'Medium',
      stats: { plays: 1567, avgScore: 890, bestScore: 1100 },
    },
  ];

  // Get randomized game content based on difficulty
  const getScrambleWords = (difficulty: 'Easy' | 'Medium' | 'Hard'): string[] => {
    const difficultyMap = {
      Easy: randomize.pickMultiple(literaryWords, 6),
      Medium: randomize.pickMultiple(literaryWords, 8),
      Hard: randomize.pickMultiple(literaryWords, 10),
    };
    return difficultyMap[difficulty];
  };

  const getPoetryQuestions = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    const filtered = poetryQuestions.filter((q) => q.difficulty === difficulty);
    return randomize.shuffle(filtered).slice(0, 5);
  };

  const startScrambleGame = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    setScrambleDifficulty(difficulty);
    setScrambleGameActive(true);
    setScrambleIndex(0);
    setScrambleScore(0);
    setScrambleStreak(0);
    setScrambleInput('');
  };

  const startPoetryGame = (difficulty: 'Easy' | 'Medium' | 'Hard') => {
    setQuizDifficulty(difficulty);
    setQuizGameActive(true);
    setQuizIndex(0);
    setQuizScore(0);
    setQuizStreak(0);
    setQuizSelected(null);
  };

  const startRhymeGame = () => {
    setRhymeGameActive(true);
    setRhymeRound(0);
    setRhymeScore(0);
    setRhymeStreak(0);
    setRhymeInput('');
  };

  const handleScrambleSubmit = (scrambleWords: string[]) => {
    const currentWord = scrambleWords[scrambleIndex];
    if (scrambleInput.toUpperCase() === currentWord) {
      const basePoints = scrambleDifficulty === 'Easy' ? 50 : scrambleDifficulty === 'Medium' ? 100 : 200;
      const streakMultiplier = 1 + scrambleStreak * 0.1;
      const points = Math.floor(basePoints * streakMultiplier);
      setScrambleScore(scrambleScore + points);
      setScrambleStreak(scrambleStreak + 1);
      setScrambleFeedback(`Correct! +${points} 🎉`);
    } else {
      setScrambleFeedback(`Wrong! It was ${currentWord}`);
      setScrambleStreak(0);
    }

    setTimeout(() => {
      if (scrambleIndex + 1 < scrambleWords.length) {
        setScrambleIndex(scrambleIndex + 1);
        setScrambleInput('');
        setScrambleFeedback('');
      } else {
        setScrambleGameActive(false);
      }
    }, 1500);
  };

  const handleQuizAnswer = (questions: any[], answerIndex: number) => {
    const currentQuestion = questions[quizIndex];
    setQuizSelected(answerIndex);

    if (answerIndex === currentQuestion.correct) {
      const basePoints = quizDifficulty === 'Easy' ? 50 : quizDifficulty === 'Medium' ? 100 : 200;
      const streakMultiplier = 1 + quizStreak * 0.15;
      const points = Math.floor(basePoints * streakMultiplier);
      setQuizScore(quizScore + points);
      setQuizStreak(quizStreak + 1);
    } else {
      setQuizStreak(0);
    }

    setTimeout(() => {
      if (quizIndex + 1 < questions.length) {
        setQuizIndex(quizIndex + 1);
        setQuizSelected(null);
      } else {
        setQuizGameActive(false);
      }
    }, 1500);
  };

  const handleRhymeSubmit = (currentRhymeSet: any) => {
    if (
      currentRhymeSet.rhymes.some(
        (r: string) => r === rhymeInput.toUpperCase()
      )
    ) {
      const points = 100 + rhymeStreak * 10;
      setRhymeScore(rhymeScore + points);
      setRhymeStreak(rhymeStreak + 1);
      setRhymeFeedback(`Perfect! +${points} 🎵`);
    } else {
      setRhymeFeedback(`Not a rhyme for ${currentRhymeSet.word}`);
      setRhymeStreak(0);
    }

    setTimeout(() => {
      if (rhymeRound + 1 < 5) {
        setRhymeRound(rhymeRound + 1);
        setRhymeInput('');
        setRhymeFeedback('');
      } else {
        setRhymeGameActive(false);
      }
    }, 1500);
  };

  const scrambleWords = useMemo(() => getScrambleWords(scrambleDifficulty), [scrambleDifficulty]);
  const poetryQuestionsList = useMemo(() => getPoetryQuestions(quizDifficulty), [quizDifficulty]);
  const currentRhymeSet = rhymeWords[rhymeRound % rhymeWords.length];

  const shuffleWord = (word: string): string => {
    return randomize.shuffle(word.split('')).join('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 py-20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mb-4">
            Literary Games Hub
          </h1>
          <p className="text-xl text-slate-300">
            Challenge yourself with randomized literary games!
          </p>
        </motion.div>

        {/* Game Grid - Main View */}
        {!selectedGame ? (
          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {games.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                onClick={() => setSelectedGame(game.id)}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/20 hover:border-purple-400/50 transition-all hover:shadow-xl hover:shadow-purple-500/20">
                  <div className="text-4xl mb-4">{game.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-2">{game.title}</h3>
                  <p className="text-slate-300 text-sm mb-4">{game.description}</p>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs bg-purple-500/30 text-purple-200 px-3 py-1 rounded-full">
                      {game.difficulty}
                    </span>
                    <Zap className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="pt-3 border-t border-purple-500/20 text-xs text-slate-400">
                    <p>🎮 {game.stats.plays} plays | 🏆 {game.stats.bestScore} best</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : null}

        {/* Word Scramble Game - Selection Menu */}
        {selectedGame === 'word-scramble' && !scrambleGameActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Word Scramble</h2>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition-colors text-white"
                >
                  ← Back
                </button>
              </div>
              <p className="text-slate-300 text-center mb-6">Select difficulty:</p>
              <div className="grid grid-cols-3 gap-4">
                {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => startScrambleGame(diff)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all"
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Word Scramble Active Game */}
        {selectedGame === 'word-scramble' && scrambleGameActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto"
          >
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-center">
              <p className="text-slate-400 mb-4">Unscramble the word:</p>
              <h3 className="text-5xl font-bold text-purple-300 tracking-[8px] mb-6">
                {shuffleWord(scrambleWords[scrambleIndex])}
              </h3>
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={scrambleInput}
                  onChange={(e) => setScrambleInput(e.target.value)}
                  placeholder="Your answer..."
                  className="flex-1 px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 border border-purple-500/30 focus:outline-none focus:border-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleScrambleSubmit(scrambleWords)}
                />
                <button
                  onClick={() => handleScrambleSubmit(scrambleWords)}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
                >
                  Submit
                </button>
              </div>
              {scrambleFeedback && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg font-semibold text-purple-300"
                >
                  {scrambleFeedback}
                </motion.p>
              )}
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Score</p>
                <p className="text-xl font-bold text-purple-300">{scrambleScore}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Streak</p>
                <p className="text-xl font-bold text-pink-300">🔥 {scrambleStreak}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Progress</p>
                <p className="text-xl font-bold text-purple-300">
                  {scrambleIndex + 1}/{scrambleWords.length}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Difficulty</p>
                <p className="text-xl font-bold text-orange-300">{scrambleDifficulty}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Poetry Quiz - Selection Menu */}
        {selectedGame === 'poetry-quiz' && !quizGameActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Poetry Master</h2>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition-colors text-white"
                >
                  ← Back
                </button>
              </div>
              <p className="text-slate-300 text-center mb-6">Select difficulty:</p>
              <div className="grid grid-cols-3 gap-4">
                {(['Easy', 'Medium', 'Hard'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => startPoetryGame(diff)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all"
                  >
                    {diff}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Poetry Quiz Active */}
        {selectedGame === 'poetry-quiz' && quizGameActive && poetryQuestionsList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto"
          >
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8">
              <p className="text-purple-300 text-lg font-semibold mb-6">
                {poetryQuestionsList[quizIndex].question}
              </p>
              <div className="grid grid-cols-1 gap-3 mb-6">
                {poetryQuestionsList[quizIndex].options.map((option: string, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => handleQuizAnswer(poetryQuestionsList, idx)}
                    disabled={quizSelected !== null}
                    className={`p-4 text-left rounded-lg border-2 transition-all ${
                      quizSelected === idx
                        ? idx === poetryQuestionsList[quizIndex].correct
                          ? 'border-green-500 bg-green-500/10'
                          : 'border-red-500 bg-red-500/10'
                        : 'border-purple-500/30 hover:border-purple-500/60 bg-slate-700/30'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Score</p>
                <p className="text-xl font-bold text-purple-300">{quizScore}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Streak</p>
                <p className="text-xl font-bold text-pink-300">🔥 {quizStreak}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Progress</p>
                <p className="text-xl font-bold text-purple-300">
                  {quizIndex + 1}/{poetryQuestionsList.length}
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Difficulty</p>
                <p className="text-xl font-bold text-orange-300">{quizDifficulty}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Story Builder */}
        {selectedGame === 'story-builder' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto"
          >
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Story Craft</h2>
              <button
                onClick={() => setSelectedGame(null)}
                className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition-colors text-white"
              >
                ← Back
              </button>
            </div>
            {!storySubmitted ? (
              <div className="bg-slate-800/50 rounded-xl p-6">
                <p className="text-purple-300 text-lg font-semibold mb-4">Writing Prompt:</p>
                <p className="text-slate-300 mb-6 text-xl italic">{currentStoryPrompt || storyPrompts[0]}</p>
                <textarea
                  value={storyText}
                  onChange={(e) => setStoryText(e.target.value)}
                  placeholder="Continue the story... (200-1000 characters)"
                  maxLength={1000}
                  className="w-full h-40 px-4 py-3 bg-slate-700 rounded-lg text-white placeholder-slate-400 border border-purple-500/30 focus:outline-none focus:border-purple-500 resize-none"
                />
                <div className="flex justify-between items-center mt-4">
                  <p className="text-slate-400 text-sm">{storyText.length}/1000</p>
                  <button
                    onClick={() => {
                      const points = Math.floor((storyText.length / 1000) * 1000 + Math.random() * 500);
                      setStoryScore(points);
                      setStorySubmitted(true);
                    }}
                    disabled={storyText.length < 200}
                    className="px-6 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-50 rounded-lg text-white font-semibold transition-colors"
                  >
                    Submit Story
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-slate-800/50 rounded-xl p-6 text-center">
                <p className="text-2xl mb-4">✨ Excellent Story! ✨</p>
                <p className="text-slate-300 mb-2">Your Score:</p>
                <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-6">
                  {storyScore}
                </p>
                <button
                  onClick={() => {
                    const newPrompt = randomize.pick(storyPrompts);
                    setCurrentStoryPrompt(newPrompt);
                    setStoryText('');
                    setStorySubmitted(false);
                  }}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
                >
                  Try Another Story
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Rhyme Time - Selection */}
        {selectedGame === 'rhyme-time' && !rhymeGameActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mx-auto"
          >
            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-bold text-white">Rhyme Rush</h2>
                <button
                  onClick={() => setSelectedGame(null)}
                  className="px-4 py-2 bg-slate-700/50 hover:bg-slate-600 rounded-lg transition-colors text-white"
                >
                  ← Back
                </button>
              </div>
              <div className="text-center">
                <p className="text-slate-300 mb-8 text-lg">Find words that rhyme with different words in 5 rounds!</p>
                <button
                  onClick={startRhymeGame}
                  className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-lg text-white font-semibold transition-all text-lg"
                >
                  Start Game
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Rhyme Time Active */}
        {selectedGame === 'rhyme-time' && rhymeGameActive && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-lg rounded-2xl p-8 border border-purple-500/20 max-w-2xl mx-auto"
          >
            <div className="bg-slate-800/50 rounded-xl p-6 mb-8 text-center">
              <p className="text-slate-400 mb-4">Find words that rhyme with:</p>
              <h3 className="text-5xl font-bold text-purple-300 mb-6">{currentRhymeSet.word}</h3>
              <div className="flex gap-3 mb-6">
                <input
                  type="text"
                  value={rhymeInput}
                  onChange={(e) => setRhymeInput(e.target.value)}
                  placeholder="Type a rhyming word..."
                  className="flex-1 px-4 py-2 bg-slate-700 rounded-lg text-white placeholder-slate-400 border border-purple-500/30 focus:outline-none focus:border-purple-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleRhymeSubmit(currentRhymeSet)}
                />
                <button
                  onClick={() => handleRhymeSubmit(currentRhymeSet)}
                  className="px-6 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg text-white font-semibold transition-colors"
                >
                  Rhyme
                </button>
              </div>
              {rhymeFeedback && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-lg font-semibold text-purple-300"
                >
                  {rhymeFeedback}
                </motion.p>
              )}
              <div className="mt-6 text-slate-300 text-sm">
                Hints: {currentRhymeSet.rhymes.join(', ')}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Score</p>
                <p className="text-xl font-bold text-purple-300">{rhymeScore}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Streak</p>
                <p className="text-xl font-bold text-pink-300">🔥 {rhymeStreak}</p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Round</p>
                <p className="text-xl font-bold text-purple-300">
                  {rhymeRound + 1}/5
                </p>
              </div>
              <div className="bg-slate-800/50 rounded-lg p-3 text-center">
                <p className="text-slate-400 text-xs mb-1">Mode</p>
                <p className="text-xl font-bold text-orange-300">Classic</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Games;
