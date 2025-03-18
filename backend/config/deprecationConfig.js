process.removeAllListeners('warning');
process.on('warning', (warning) => {
  if (warning.name === 'DeprecationWarning') {
    if (warning.code === 'DEP0040' || warning.code === 'DEP0060') {
      return;
    }
  }
  console.warn(warning.name, warning.message);
});