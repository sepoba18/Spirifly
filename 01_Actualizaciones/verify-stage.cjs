const path = require('node:path');
const { spawnSync } = require('node:child_process');
const TESTS = ['build-base-stats', 'build-review', 'farming-schedule', 'artifact-icons', 'traveler-material-audit', 'traveler-planner', 'site-audit'];
function verify(root, directory, log = console.log) {
  return TESTS.map(name => {
    const result = spawnSync(process.execPath, ['--require', path.join(__dirname, 'verify-stage-hook.cjs'), path.join(root, 'tests', `${name}.cjs`)], {
      cwd: root, encoding: 'utf8', timeout: 30000, env: { ...process.env, SPIRIFLY_STAGE_DIRECTORY: path.resolve(directory) }
    });
    const status = result.status === 0 && !result.error ? 'passed' : 'failed';
    log(`${status === 'passed' ? 'OK' : 'ERROR'} paquete web: ${name}`);
    return { name, status, exitCode: result.status, output: `${result.stdout || ''}${result.stderr || ''}${result.error ? result.error.message : ''}` };
  });
}
module.exports = { verify };
