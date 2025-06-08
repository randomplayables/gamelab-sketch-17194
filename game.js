// Inject CSS styles
const styles = `
  #game-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-family: Arial, sans-serif;
    background-color: #f0f0f0;
    height: 100%;
    text-align: center;
    box-sizing: border-box;
    padding: 20px;
  }
  h1 {
    color: #333;
    margin-bottom: 0.5rem;
  }
  p {
    font-size: 1.5rem;
    margin: 1rem;
  }
  button {
    background-color: #10B981;
    color: white;
    border: none;
    padding: 12px 24px;
    margin: 8px;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }
  button:hover {
    background-color: #059669;
  }
`;
const styleSheet = document.createElement('style');
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// Set up game elements
const container = document.getElementById('game-container');
if (container) {
  let score = 0;

  const title = document.createElement('h1');
  title.textContent = 'Vanilla JS Clicker Game';

  const scoreDisplay = document.createElement('p');
  scoreDisplay.textContent = 'Score: 0';

  const clickButton = document.createElement('button');
  clickButton.textContent = 'Click Me!';

  const resetButton = document.createElement('button');
  resetButton.textContent = 'Reset Score';

  container.appendChild(title);
  container.appendChild(scoreDisplay);
  container.appendChild(clickButton);
  container.appendChild(resetButton);

  // Click handler
  clickButton.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = 'Score: ' + score;
    if (typeof window.sendDataToGameLab === 'function') {
      window.sendDataToGameLab({
        event: 'click',
        newScore: score,
        timestamp: new Date().toISOString()
      });
    }
  });

  // Reset handler
  resetButton.addEventListener('click', () => {
    score = 0;
    scoreDisplay.textContent = 'Score: ' + score;
    if (typeof window.sendDataToGameLab === 'function') {
      window.sendDataToGameLab({
        event: 'reset',
        newScore: score,
        timestamp: new Date().toISOString()
      });
    }
  });
}