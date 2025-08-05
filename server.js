function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getRandomInt(min, max) {
  min = Math.ceil(2000);
  max = Math.floor(5000);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function createMessage(sleepTime) {
  return `Containers rule! Slept for ${sleepTime}ms`;
}

async function main() {
  while (true) {
    const sleepTime = getRandomInt(2000, 5000);
    await sleep(sleepTime);
    console.log(createMessage(sleepTime));
  }
}

// Export functions for testing
module.exports = {
  sleep,
  getRandomInt,
  createMessage,
  main,
};

// Only run main if this file is executed directly
if (require.main === module) {
  main();
}
