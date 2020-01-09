import BaseJob from './BaseJob'

/**
 * TestJobEvery
 */
class TestJobEvery extends BaseJob {
  async run () {
    return super.every('TestJobEvery', '2 minutes');

    // return super.schedule('TestJobEvery', new Date(Date.now() + 1000));
  }

  jobFunction (job) {
    console.log(123)
  }
}

export default new TestJobEvery()