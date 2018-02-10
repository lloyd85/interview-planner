module.exports = {
  'Demo test Interviews': browser => browser
    .url('http://localhost:3002')
    .waitForElementVisible('body', 1000)
    .click('a')
    .pause(1000)
    .assert.containsText('h1', 'Interview List')
    .end(),
};
