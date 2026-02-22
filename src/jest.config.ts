import { getJestProjectsAsync } from '@nx/jest';

const jest_ = async () => ({
  projects: await getJestProjectsAsync(),
});
export default jest_;
