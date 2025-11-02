// AI-powered content moderation, spell checking, grammar checking, and vocabulary analysis utilities

// Comprehensive profanity/inappropriate content checker
// Categories: Profanity, Hate Speech, Spam, and Adult Content
const profanityList = [
  // Strong profanity
  'damn', 'hell', 'crap', 'piss', 'shit', 'ass', 'bastard', 'bitch',
  // Hate speech indicators
  'explicit', 'offensive', 'inappropriate', 'hateful', 'slur', 'abuse',
  'violence', 'gore', 'racist', 'sexist', 'discriminat',
  // Spam/Scam
  'spam', 'scam', 'fraud', 'illegal', 'bitcoin', 'crypto', 'click here',
  'buy now', 'free money', 'work from home',
];

// Grammar issues and weak constructions
const grammarIssues = {
  // Double negatives and contradictions
  'not no': 'double negative',
  'cannot hardly': 'double negative',
  'not nothing': 'double negative',
  
  // Common grammar mistakes
  'their is': 'should be "there is"',
  'its going': 'should be "it\'s going"',
  'your going': 'should be "you\'re going"',
  'alot': 'should be "a lot"',
  'have went': 'should be "have gone"',
  'should of': 'should be "should have"',
  'would of': 'should be "would have"',
  'could of': 'should be "could have"',
  'in regards to': 'consider using "regarding" instead',
};

// Weak vocabulary and overused words
const weakVocabulary: Record<string, string[]> = {
  'very': ['extremely', 'incredibly', 'remarkably', 'notably'],
  'really': ['genuinely', 'truly', 'certainly', 'absolutely'],
  'good': ['excellent', 'outstanding', 'superb', 'exceptional'],
  'bad': ['poor', 'inadequate', 'substandard', 'inferior'],
  'nice': ['pleasant', 'delightful', 'wonderful', 'charming'],
  'things': ['elements', 'aspects', 'components', 'factors'],
  'stuff': ['materials', 'items', 'objects', 'content'],
  'got': ['obtained', 'acquired', 'received', 'secured'],
  'a lot': ['numerous', 'considerable', 'substantial', 'extensive'],
  'just': ['simply', 'merely', 'only'],
};

// Vocabulary level assessment words
const advancedVocabulary = new Set([
  'metaphor', 'simile', 'alliteration', 'protagonist', 'antagonist',
  'climax', 'denouement', 'exposition', 'conflict', 'resolution',
  'narrative', 'dialogue', 'monologue', 'soliloquy', 'foreshadow',
  'irony', 'paradox', 'oxymoron', 'hyperbole', 'personification',
  'imagination', 'creativity', 'storytelling', 'literature', 'poetic',
  'lyrical', 'prose', 'verse', 'stanza', 'couplet', 'eloquent',
  'nostalgic', 'melancholic', 'ethereal', 'luminous', 'ephemeral',
]);

export interface ContentCheckResult {
  isClean: boolean;
  issues: string[];
  severity: 'none' | 'low' | 'medium' | 'high';
  suggestions: string[];
  profanityFound: boolean;
}

export const checkContentForProfanity = (text: string): ContentCheckResult => {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let severity: 'none' | 'low' | 'medium' | 'high' = 'none';
  let profanityFound = false;

  const lowerText = text.toLowerCase();

  // Check for profanity and bad words with context awareness
  for (const word of profanityList) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    if (regex.test(lowerText)) {
      issues.push(`⛔ Inappropriate content detected: "${word}"`);
      severity = 'high';
      profanityFound = true;
      suggestions.push(`❌ Remove or replace the word "${word}" - it may be offensive to readers`);
    }
  }

  // Check for excessive punctuation (indicates shouting/aggression)
  const excessivePunctuation = /[!?]{2,}|\.{4,}/.test(text);
  if (excessivePunctuation) {
    issues.push('🚨 Excessive punctuation detected (!!!  ???  ....)');
    severity = severity === 'high' ? 'high' : 'medium';
    suggestions.push('✏️ Use single punctuation marks for a more professional tone');
  }

  // Check for excessive caps (screaming text)
  const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (capsRatio > 0.5 && text.length > 10) {
    issues.push('📢 Excessive UPPERCASE text detected');
    severity = severity === 'high' ? 'high' : 'medium';
    suggestions.push('✏️ Mix uppercase and lowercase for better readability and tone');
  }

  // Check for excessive repetition
  if (/(.)\1{4,}/.test(text)) {
    issues.push('🔁 Excessive character repetition (e.g., "heeeyyyy" or "soooo")');
    severity = severity === 'high' ? 'high' : 'low';
    suggestions.push('✏️ Use proper spelling and punctuation instead of repeated characters');
  }

  // Check for spam patterns
  const spamIndicators = /click here|buy now|free money|work from home|bitcoin|cryptocurrency|limited time|act now/gi;
  if (spamIndicators.test(lowerText)) {
    issues.push('⚠️ Spam-like content detected');
    severity = 'high';
    suggestions.push('❌ Remove promotional or sales language from your content');
  }

  return {
    isClean: issues.length === 0 && !profanityFound,
    issues,
    severity,
    suggestions,
    profanityFound,
  };
};

// Basic spell checker with common literary words
const commonMisspellings: Record<string, string[]> = {
  // Common misspellings
  'recieve': ['receive'],
  'occured': ['occurred'],
  'seperate': ['separate'],
  'definately': ['definitely'],
  'necessery': ['necessary'],
  'grammer': ['grammar'],
  'suprise': ['surprise'],
  'oppurtunity': ['opportunity'],
  'goverment': ['government'],
  'enviroment': ['environment'],
  'freind': ['friend'],
  'wich': ['which', 'witch'],
  'wierd': ['weird'],
  'occassion': ['occasion'],
  'untill': ['until'],
  'begining': ['beginning'],
  'comming': ['coming'],
  'writting': ['writing'],
  'reccommend': ['recommend'],
  'existance': ['existence'],
  'concious': ['conscious'],
  'acheive': ['achieve'],
  'bussiness': ['business'],
  'succesful': ['successful'],
  'sincerly': ['sincerely'],
  'adress': ['address'],
  'assesment': ['assessment'],
  'judgement': ['judgment'],
  'millenium': ['millennium'],
};

export interface SpellCheckResult {
  hasErrors: boolean;
  errors: Array<{
    word: string;
    position: number;
    suggestions: string[];
    type: 'spelling' | 'grammar' | 'vocabulary';
  }>;
  warnings: string[];
  grammarIssuesFound: number;
  vocabularyIssuesFound: number;
}

export const checkSpelling = (text: string): SpellCheckResult => {
  const errors: SpellCheckResult['errors'] = [];
  const warnings: string[] = [];
  const words = text.split(/\s+/);
  let charPosition = 0;
  let grammarIssuesFound = 0;
  let vocabularyIssuesFound = 0;

  for (const word of words) {
    // Remove punctuation for checking
    const cleanWord = word.replace(/[.,!?;:'""-]/g, '').toLowerCase();

    // Check for common misspellings
    if (commonMisspellings[cleanWord]) {
      errors.push({
        word: cleanWord,
        position: charPosition,
        suggestions: commonMisspellings[cleanWord],
        type: 'spelling',
      });
    }

    // Check for grammar issues (common mistakes)
    for (const [issue, correction] of Object.entries(grammarIssues)) {
      if (text.toLowerCase().includes(issue)) {
        errors.push({
          word: issue,
          position: charPosition,
          suggestions: [correction],
          type: 'grammar',
        });
        grammarIssuesFound++;
      }
    }

    // Check for weak vocabulary (common overused words)
    if (weakVocabulary[cleanWord] && text.toLowerCase().split(/\s+/).filter(w => w.toLowerCase() === cleanWord).length > 2) {
      errors.push({
        word: cleanWord,
        position: charPosition,
        suggestions: weakVocabulary[cleanWord],
        type: 'vocabulary',
      });
      vocabularyIssuesFound++;
    }

    // Warn about very long words
    if (cleanWord.length > 15 && !advancedVocabulary.has(cleanWord)) {
      warnings.push(`📏 Long word "${word}" - consider using simpler alternatives`);
    }

    charPosition += word.length + 1;
  }

  return {
    hasErrors: errors.length > 0,
    errors,
    warnings,
    grammarIssuesFound,
    vocabularyIssuesFound,
  };
};

export interface ContentAnalysis {
  wordCount: number;
  characterCount: number;
  sentenceCount: number;
  paragraphCount: number;
  averageWordLength: number;
  averageSentenceLength: number;
  readabilityScore: number;
  readabilityLevel: string;
  estimatedReadingTime: string;
  vocabularyDiversity: number;
  advancedVocabularyCount: number;
  weakVocabularyCount: number;
}

export const analyzeContent = (text: string): ContentAnalysis => {
  const words = text.trim().split(/\s+/).filter(w => w.length > 0);
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const paragraphs = text.split(/\n\n+/).filter(p => p.trim().length > 0);
  const characters = text.length;
  const charWithoutSpaces = text.replace(/\s/g, '').length;

  const wordCount = words.length;
  const sentenceCount = sentences.length || 1;
  const paragraphCount = paragraphs.length || 1;
  const averageWordLength = wordCount > 0 ? charWithoutSpaces / wordCount : 0;
  const averageSentenceLength = wordCount > 0 ? wordCount / sentenceCount : 0;

  // Calculate vocabulary diversity (unique words / total words)
  const uniqueWords = new Set(words.map(w => w.toLowerCase()));
  const vocabularyDiversity = Math.round((uniqueWords.size / wordCount) * 100);

  // Count advanced vocabulary usage
  let advancedVocabularyCount = 0;
  let weakVocabularyCount = 0;
  for (const word of words) {
    const cleanWord = word.replace(/[.,!?;:'""-]/g, '').toLowerCase();
    if (advancedVocabulary.has(cleanWord)) advancedVocabularyCount++;
    if (Object.keys(weakVocabulary).includes(cleanWord)) weakVocabularyCount++;
  }

  // Enhanced readability score (Flesch-Kincaid formula)
  let readabilityScore = 100;
  let readabilityLevel = 'Very Easy';
  if (wordCount > 0 && sentenceCount > 0) {
    const readingEase = 206.835 - 1.015 * (wordCount / sentenceCount) - 84.6 * (charWithoutSpaces / wordCount);
    readabilityScore = Math.max(0, Math.min(100, readingEase));

    // Determine readability level
    if (readabilityScore >= 90) readabilityLevel = '🟢 Very Easy (Elementary)';
    else if (readabilityScore >= 80) readabilityLevel = '🟢 Easy (Middle School)';
    else if (readabilityScore >= 70) readabilityLevel = '🟡 Fairly Easy (High School)';
    else if (readabilityScore >= 60) readabilityLevel = '🟡 Standard (College)';
    else if (readabilityScore >= 50) readabilityLevel = '🟠 Fairly Difficult (College Graduate)';
    else if (readabilityScore >= 30) readabilityLevel = '🔴 Difficult (Professional)';
    else readabilityLevel = '🔴 Very Difficult (Academic)';
  }

  // Estimate reading time (average 200 words per minute)
  const minutesToRead = Math.ceil(wordCount / 200);
  const estimatedReadingTime = minutesToRead === 0 ? '< 1 min' : `~${minutesToRead} min read`;

  return {
    wordCount,
    characterCount: characters,
    sentenceCount,
    paragraphCount,
    averageWordLength: Math.round(averageWordLength * 100) / 100,
    averageSentenceLength: Math.round(averageSentenceLength * 100) / 100,
    readabilityScore: Math.round(readabilityScore),
    readabilityLevel,
    estimatedReadingTime,
    vocabularyDiversity,
    advancedVocabularyCount,
    weakVocabularyCount,
  };
};

export interface FullContentReview {
  profanityCheck: ContentCheckResult;
  spellCheck: SpellCheckResult;
  analysis: ContentAnalysis;
  overallScore: number;
  canPublish: boolean;
  feedback: string[];
  suggestions: string[];
  qualityLevel: string;
}

export const performFullContentReview = (text: string): FullContentReview => {
  if (text.trim().length === 0) {
    return {
      profanityCheck: { isClean: true, issues: [], severity: 'none', suggestions: [], profanityFound: false },
      spellCheck: { hasErrors: false, errors: [], warnings: [], grammarIssuesFound: 0, vocabularyIssuesFound: 0 },
      analysis: {
        wordCount: 0, characterCount: 0, sentenceCount: 0, paragraphCount: 0,
        averageWordLength: 0, averageSentenceLength: 0, readabilityScore: 0,
        readabilityLevel: 'N/A', estimatedReadingTime: '0 min', vocabularyDiversity: 0,
        advancedVocabularyCount: 0, weakVocabularyCount: 0,
      },
      overallScore: 0,
      canPublish: false,
      feedback: ['📝 Your submission is empty. Please write something!'],
      suggestions: [],
      qualityLevel: 'Empty',
    };
  }

  const profanityCheck = checkContentForProfanity(text);
  const spellCheck = checkSpelling(text);
  const analysis = analyzeContent(text);

  // Calculate overall score (0-100) with detailed breakdown
  let overallScore = 100;
  const feedback: string[] = [];
  const suggestions: string[] = [];

  // === PROFANITY CHECK SCORING ===
  if (profanityCheck.severity === 'high') {
    overallScore -= 50;
    feedback.push(`❌ ${profanityCheck.issues.length} serious issue(s) detected`);
    profanityCheck.suggestions.forEach(s => suggestions.push(s));
  } else if (profanityCheck.severity === 'medium') {
    overallScore -= 20;
    feedback.push(`⚠️ ${profanityCheck.issues.length} moderation issue(s)`);
    profanityCheck.suggestions.forEach(s => suggestions.push(s));
  } else if (profanityCheck.severity === 'low') {
    overallScore -= 5;
    feedback.push(`ℹ️ Minor tone issue(s) detected`);
  }

  // === SPELLING & GRAMMAR CHECK SCORING ===
  if (spellCheck.errors.length > 0) {
    const spellingErrors = spellCheck.errors.filter(e => e.type === 'spelling').length;
    const grammarErrors = spellCheck.errors.filter(e => e.type === 'grammar').length;
    const vocabErrors = spellCheck.errors.filter(e => e.type === 'vocabulary').length;

    if (spellingErrors > 0) {
      overallScore -= Math.min(15, spellingErrors * 2);
      feedback.push(`📝 ${spellingErrors} spelling error(s) found`);
      spellCheck.errors.filter(e => e.type === 'spelling').forEach(e => {
        suggestions.push(`Spelling: "${e.word}" → ${e.suggestions.join(' or ')}`);
      });
    }

    if (grammarErrors > 0) {
      overallScore -= Math.min(15, grammarErrors * 2);
      feedback.push(`✏️ ${grammarErrors} grammar issue(s) found`);
      spellCheck.errors.filter(e => e.type === 'grammar').forEach(e => {
        suggestions.push(`Grammar: "${e.word}" → ${e.suggestions.join(' or ')}`);
      });
    }

    if (vocabErrors > 0) {
      overallScore -= Math.min(10, vocabErrors);
      feedback.push(`💡 ${vocabErrors} vocabulary suggestion(s)`);
      spellCheck.errors.filter(e => e.type === 'vocabulary').forEach(e => {
        suggestions.push(`Vocabulary: Use "${e.suggestions.join(', ')}" instead of "${e.word}"`);
      });
    }
  }

  // === READABILITY SCORING ===
  if (analysis.readabilityScore > 80) {
    overallScore += 5;
    feedback.push('✅ Excellent readability');
  } else if (analysis.readabilityScore > 60) {
    feedback.push('🟡 Good readability');
  } else if (analysis.readabilityScore < 30) {
    overallScore -= 10;
    feedback.push('❌ Readability needs improvement - use shorter sentences');
    suggestions.push('💬 Break sentences into smaller chunks for clarity');
  }

  // === VOCABULARY DIVERSITY SCORING ===
  if (analysis.vocabularyDiversity < 40) {
    overallScore -= 8;
    feedback.push('💭 Low vocabulary diversity - consider using synonyms');
    suggestions.push('📚 Vary your word choices throughout the text');
  } else if (analysis.vocabularyDiversity > 60) {
    overallScore += 5;
    feedback.push('✅ Great vocabulary diversity');
  }

  // === ADVANCED VOCABULARY BONUS ===
  if (analysis.advancedVocabularyCount > 0) {
    overallScore += Math.min(10, analysis.advancedVocabularyCount);
    feedback.push(`✨ Excellent use of sophisticated vocabulary (${analysis.advancedVocabularyCount} words)`);
  }

  // === LENGTH ANALYSIS ===
  if (analysis.wordCount < 20) {
    overallScore -= 10;
    feedback.push('📏 Content is too short - expand your thoughts');
    suggestions.push('📝 Aim for at least 20-50 words for meaningful submissions');
  } else if (analysis.wordCount > 5000) {
    overallScore -= 5;
    feedback.push('📏 Content is quite long - consider breaking it into sections');
    suggestions.push('✂️ For very long pieces, consider adding headings or sections');
  } else {
    feedback.push(`✅ Content length is appropriate (${analysis.wordCount} words)`);
  }

  // === PARAGRAPH STRUCTURE ===
  if (analysis.paragraphCount < 1 && analysis.wordCount > 50) {
    overallScore -= 5;
    suggestions.push('📋 Consider adding paragraph breaks for better structure');
  }

  // Ensure score stays in 0-100 range
  overallScore = Math.max(0, Math.min(100, overallScore));

  // Determine quality level and publishability
  let qualityLevel = 'Fair';
  let canPublish = true;

  if (profanityCheck.severity === 'high' || analysis.wordCount < 10) {
    canPublish = false;
    qualityLevel = 'Not Ready';
  } else if (overallScore >= 80) {
    qualityLevel = 'Excellent';
  } else if (overallScore >= 60) {
    qualityLevel = 'Good';
  } else if (overallScore >= 40) {
    qualityLevel = 'Fair';
  } else {
    qualityLevel = 'Needs Work';
    canPublish = overallScore >= 30;
  }

  return {
    profanityCheck,
    spellCheck,
    analysis,
    overallScore,
    canPublish,
    feedback,
    suggestions,
    qualityLevel,
  };
};
