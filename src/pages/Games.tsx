import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const Games: React.FC = () => {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);

  const games = [
    {
      id: 'word-scramble',
      title: 'Word Scramble',
      description: 'Unscramble literary-themed words before time runs out!',
      icon: '🔀',
      difficulty: 'Easy',
    },
    {
      id: 'poetry-quiz',
      title: 'Poetry Quiz',
      description: 'Test your knowledge of famous poems and poets',
      icon: '📖',
      difficulty: 'Medium',
    },
    {
      id: 'story-builder',
      title: 'Story Builder',
      description: 'Create stories with random prompts and characters',
      icon: '✍️',
      difficulty: 'Hard',
    },
    {
      id: 'rhyme-time',
      title: 'Rhyme Time',
      description: 'Find words that rhyme with literary themes',
      icon: '🎵',
      difficulty: 'Medium',
    },
  ];

  return (
    <div className="relative min-h-screen pt-20 pb-20">
      {/* Hero Section */}
      <section className="py-20 px-4 max-w-7xl mx-auto text-center mb-12">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl md:text-8xl font-grotesk font-black mb-6">
            Literary <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Games</span>
          </h1>
          <p className="text-xl font-poppins font-medium text-gray-700 dark:text-gray-200 max-w-3xl mx-auto">
            Test your literary skills with fun, interactive games. Challenge yourself and compete with others!
          </p>
        </motion.div>
      </section>

      {!selectedGame ? (
        // Games Grid
        <section className="px-4 max-w-7xl mx-auto mb-12">
          <div className="grid md:grid-cols-2 gap-6">
            {games.map((game, idx) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.02 }}
                onClick={() => setSelectedGame(game.id)}
                className="group cursor-pointer p-8 rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 hover:border-primary/40 shadow-lg hover:shadow-xl smooth-transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl">{game.icon}</div>
                  <span className="px-3 py-1 rounded-full text-sm font-bold bg-primary/10 text-primary">
                    {game.difficulty}
                  </span>
                </div>
                <h3 className="text-3xl font-grotesk font-black mb-3 group-hover:text-primary smooth-transition">
                  {game.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-200 font-poppins font-medium mb-4">
                  {game.description}
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-6 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold text-sm smooth-transition hover:shadow-lg"
                >
                  Play Now
                </motion.button>
              </motion.div>
            ))}
          </div>
        </section>
      ) : (
        // Game View
        <GameComponent gameId={selectedGame} onBack={() => setSelectedGame(null)} />
      )}

      {/* Leaderboard */}
      <section className="px-4 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="p-10 rounded-2xl bg-gradient-to-br from-light to-gray-100 dark:from-gray-900 dark:to-gray-800 border border-primary/20 shadow-lg"
        >
          <h2 className="text-4xl font-grotesk font-black mb-8 flex items-center gap-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            <Zap className="w-8 h-8 text-primary" />
            Featured Games
          </h2>
          <p className="text-gray-600 dark:text-gray-400 font-poppins font-medium text-center py-8">
            Play our interactive literary games above and compete with friends! 🎮
          </p>
        </motion.div>
      </section>
    </div>
  );
};

interface GameComponentProps {
  gameId: string;
  onBack: () => void;
}

const GameComponent: React.FC<GameComponentProps> = ({ gameId, onBack }) => {
  const [score, setScore] = useState(0);

  if (gameId === 'word-scramble') {
    return <WordScrambleGame score={score} setScore={setScore} onBack={onBack} />;
  } else if (gameId === 'poetry-quiz') {
    return <PoetryQuizGame score={score} setScore={setScore} onBack={onBack} />;
  } else if (gameId === 'story-builder') {
    return <StoryBuilderGame score={score} setScore={setScore} onBack={onBack} />;
  } else if (gameId === 'rhyme-time') {
    return <RhymeTimeGame score={score} setScore={setScore} onBack={onBack} />;
  }

  return null;
};

// Word Scramble Game
const WordScrambleGame: React.FC<any> = ({ score, setScore, onBack }) => {
  const words = ['METAPHOR', 'SIMILE', 'PROTAGONIST', 'NARRATIVE', 'CLIMAX', 'IRONY'];
  const [currentWord, setCurrentWord] = useState(0);
  const [scrambled, setScrambled] = useState('');
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [time, setTime] = useState(30);

  React.useEffect(() => {
    const word = words[currentWord];
    setScrambled(word.split('').sort(() => Math.random() - 0.5).join(''));
  }, [currentWord]);

  React.useEffect(() => {
    if (time === 0) {
      setMessage('Time up!');
      return;
    }
    const timer = setTimeout(() => setTime(time - 1), 1000);
    return () => clearTimeout(timer);
  }, [time]);

  const handleSubmit = () => {
    if (guess.toUpperCase() === words[currentWord]) {
      setScore(score + 100);
      setMessage('✅ Correct!');
      setTimeout(() => {
        setCurrentWord(currentWord + 1);
        setGuess('');
        setMessage('');
      }, 1000);
    } else {
      setMessage('❌ Wrong! Try again');
      setGuess('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-light dark:bg-dark p-10 rounded-2xl max-w-md w-full mx-4"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-primary">Word Scramble</h2>
          <button
            onClick={onBack}
            className="text-2xl text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <div className="mb-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Score: {score}</p>
          <p className="text-4xl font-black text-primary mb-4">{time}s</p>
          <div className="text-5xl font-black tracking-widest text-secondary mb-4">
            {scrambled}
          </div>
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Your guess..."
            className="w-full px-4 py-3 rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none"
          />
          {message && (
            <p className="mt-3 text-lg font-bold text-primary">{message}</p>
          )}
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleSubmit}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold smooth-transition"
        >
          Submit
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Poetry Quiz Game
const PoetryQuizGame: React.FC<any> = ({ score, setScore, onBack }) => {
  const quizzes = [
    {
      question: 'Who wrote "Roses are red, violets are blue"?',
      options: ['Unknown', 'Edgar Poe', 'Shakespeare', 'Emily Dickinson'],
      correct: 0,
    },
    {
      question: 'What is a haiku?',
      options: ['A type of poem with 5-7-5 syllables', 'A Japanese dance', 'A type of fish', 'A musical instrument'],
      correct: 0,
    },
  ];

  const [currentQ, setCurrentQ] = useState(0);
  const [answered, setAnswered] = useState(false);

  const handleAnswer = (correct: boolean) => {
    if (correct) setScore(score + 100);
    setAnswered(true);
    setTimeout(() => {
      setCurrentQ(currentQ + 1);
      setAnswered(false);
    }, 1500);
  };

  if (currentQ >= quizzes.length) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="bg-light dark:bg-dark p-10 rounded-2xl max-w-md w-full mx-4 text-center"
        >
          <h2 className="text-4xl font-bold text-primary mb-4">Quiz Complete!</h2>
          <p className="text-5xl font-black text-secondary mb-8">{score} pts</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            onClick={onBack}
            className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold"
          >
            Back to Games
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  const quiz = quizzes[currentQ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-light dark:bg-dark p-10 rounded-2xl max-w-md w-full mx-4"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Poetry Quiz</h2>
          <button onClick={onBack} className="text-2xl text-gray-400">✕</button>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Score: {score}</p>
        <p className="text-lg font-bold mb-6">{quiz.question}</p>
        <div className="space-y-3">
          {quiz.options.map((option, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              onClick={() => handleAnswer(idx === quiz.correct)}
              disabled={answered}
              className={`w-full p-3 rounded-lg font-bold smooth-transition ${
                answered
                  ? idx === quiz.correct
                    ? 'bg-green-500 text-white'
                    : 'bg-red-500 text-white'
                  : 'bg-primary/10 border-2 border-primary text-gray-800 dark:text-white hover:bg-primary/20'
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

// Story Builder Game
const StoryBuilderGame: React.FC<any> = ({ score, setScore, onBack }) => {
  const [story, setStory] = useState('Once upon a time, ');

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-light dark:bg-dark p-10 rounded-2xl max-w-md w-full mx-4"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Story Builder</h2>
          <button onClick={onBack} className="text-2xl text-gray-400">✕</button>
        </div>
        <textarea
          value={story}
          onChange={(e) => setStory(e.target.value)}
          className="w-full h-40 p-4 rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none resize-none"
          placeholder="Continue the story..."
        />
        <p className="text-sm text-gray-600 mt-2">{story.length}/500 characters</p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() => {
            setScore(score + Math.floor(story.length / 10));
            setStory('Well done! Your story was: ' + story);
          }}
          className="w-full mt-4 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold"
        >
          Submit Story
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

// Rhyme Time Game
const RhymeTimeGame: React.FC<any> = ({ score, setScore, onBack }) => {
  const rhymeWords = ['MOON', 'STARS', 'WRITE', 'DREAM', 'HOPE'];
  const [word, setWord] = useState(rhymeWords[0]);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');

  const rhymes: Record<string, string[]> = {
    MOON: ['JUNE', 'SOON', 'TUNE', 'CROON'],
    STARS: ['JARS', 'BARS', 'WARS', 'CARS'],
    WRITE: ['NIGHT', 'LIGHT', 'SIGHT', 'FLIGHT'],
    DREAM: ['SCHEME', 'STREAM', 'BEAM', 'TEAM'],
    HOPE: ['ROPE', 'SCOPE', 'SLOPE', 'COPE'],
  };

  const handleCheck = () => {
    if (rhymes[word].includes(guess.toUpperCase())) {
      setScore(score + 50);
      setMessage('✅ Perfect rhyme!');
      setTimeout(() => {
        setGuess('');
        setMessage('');
        setWord(rhymeWords[Math.floor(Math.random() * rhymeWords.length)]);
      }, 1500);
    } else {
      setMessage('❌ Not a rhyme. Try again!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-light dark:bg-dark p-10 rounded-2xl max-w-md w-full mx-4 text-center"
      >
        <div className="flex justify-between mb-6">
          <h2 className="text-2xl font-bold text-primary">Rhyme Time</h2>
          <button onClick={onBack} className="text-2xl text-gray-400">✕</button>
        </div>
        <p className="text-sm text-gray-600 mb-6">Score: {score}</p>
        <p className="text-5xl font-black text-primary mb-6">{word}</p>
        <p className="text-gray-600 dark:text-gray-400 mb-4">Find a word that rhymes with:</p>
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          placeholder="Your rhyme..."
          className="w-full px-4 py-3 rounded-lg border-2 border-primary/30 focus:border-primary focus:outline-none mb-3"
        />
        {message && <p className="text-lg font-bold text-primary mb-3">{message}</p>}
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={handleCheck}
          className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-white font-bold"
        >
          Check
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

export default Games;
