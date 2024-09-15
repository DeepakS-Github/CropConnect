module.exports = {
    testEnvironment: 'node',
    verbose: true,
    forceExit: true,
    clearMocks: true,
    setupFilesAfterEnv: ['./tests/jest.mongodb.setup.js'], 
    // setupFiles: ['./tests/jest.setup.js'], // Corrected path
    // testTimeout: 10000, // Set global timeout to 10 seconds
};
  