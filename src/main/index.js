import { dialog,app } from 'electron'
const { autoUpdater } = require('electron-updater');

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

autoUpdater.on('error',(message)=>{
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: message,
    detail: message
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    // if (response === 0) { 
    //   autoUpdater.quitAndInstall();
    // }
  });
})

autoUpdater.on('checking-for-update',(event)=>{
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Application Checking for Update',
    detail:'Application Checking for Update',
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    // if (response === 0) { 
    //   autoUpdater.quitAndInstall();
    // }
  });
})

autoUpdater.on('update-available',(event)=>{
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Application Update Available',
    detail:'Application Update Available',
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    // if (response === 0) { 
    //   autoUpdater.quitAndInstall();
    // }
  });
})

autoUpdater.on('update-not-available',(event)=>{
  const dialogOpts = {
    type: 'info',
    buttons: ['Ok'],
    title: 'Application Update not Available!',
    detail:'Application Update not Available',
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    // if (response === 0) { 
    //   autoUpdater.quitAndInstall();
    // }
  });
})


autoUpdater.on('update-downloaded', (info) => {
  const dialogOpts = {
    type: 'info',
    buttons: ['Restart', 'Update'],
    title: 'Application Update',
    detail: 'A new version has been downloaded. Restart the application to apply the updates.'
  };

  dialog.showMessageBox(dialogOpts, (response) => {
    if (response === 0) { 
      autoUpdater.quitAndInstall();
    }
  });
});

app.on("ready", function() {
  autoUpdater.checkForUpdatesAndNotify();
 });
// Load here all startup windows
require('./mainWindow')
