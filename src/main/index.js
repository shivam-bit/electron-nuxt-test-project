import { dialog,app } from 'electron'
const { autoUpdater } = require('electron-updater');
const logger = require('electron-log');

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on("ready", function() {
  autoUpdater.logger = logger;
  autoUpdater.setFeedURL({
    provider: 'github',
    repo: 'electron-nuxt-test-project',
    owner: 'shivam-bit',
    private: false,
})

  autoUpdater.logger.transports.file.level = 'info';
  autoUpdater.checkForUpdates();
  logger.info('checkForUpdatesAndNotify');

  autoUpdater.on('checking-for-update', (info) => {
    logger.info('checking-for-update');
    logger.info(info);
  });

  autoUpdater.on('update-downloaded', (info) => {
    const quitAndInstalled = autoUpdater.quitAndInstall();
    logger.info('quitAndInstalled');
    logger.info(quitAndInstalled);
  });

  autoUpdater.on('update-available', (arg) => {
    logger.info('update-available');
    logger.info(arg);
  });

  autoUpdater.on('update-not-available', (arg) => {
    logger.info('update-not-available');
    logger.info(arg);
  });

  autoUpdater.on('download-progress', (arg) => {
    logger.info('download-progress');
    logger.info(arg);
  });

  autoUpdater.on('error', (error) => {
    logger.info('error');
    logger.info(error.message);
    logger.info(error.stack);
  });
 });
// Load here all startup windows
require('./mainWindow')
