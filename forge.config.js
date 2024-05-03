const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

// TODO: Some smart checking around which platform we're building from
const makerList = [];
// Windows 64
makerList.push({
  name: '@electron-forge/maker-squirrel',
  config: {},
});
// Generic zipper, read the docs before using
makerList.push({
  name: '@electron-forge/maker-zip',
  platforms: ['darwin'],
});
/*  // lil debbie
makerList.push({
  name: '@electron-forge/maker-deb',
  config: {},
});
*/

// TODO: Look into code signing, worth it? https://www.electronjs.org/docs/latest/tutorial/code-signing
module.exports = {
  packagerConfig: {
    asar: true,
  },
  rebuildConfig: {},
  makers: makerList,
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
