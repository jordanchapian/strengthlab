angular.module('strengthlab.constant')
.constant('AUTH_EVENTS', {
  loginSuccess: 'auth-login-success',
  loginFailed: 'auth-login-failed',

  signupSuccess: 'auth-signup-success',
  signupFailed: 'auth-signup-failed',
  
  logoutSuccess: 'auth-logout-success',
  sessionTimeout: 'auth-session-timeout',
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})
.constant('UPLOAD_EVENTS', {
  uploadAudioSuccess: 'upload-audio-success',
  uploadAudioFailure: 'upload-audio-failed',
  uploadAudioStart: 'upload-audio-start',
})
.constant('AUDIO_RESOURCE_EVENTS', {
  addedToTheme: 'audio-resource-attheme',
  removedFromTheme: 'audio-resource-rftheme',

  addedToCategory: 'audio-resource-atcategory',
  removedFromCategory: 'audio-resource-rfcategory',

  addedToTag: 'audio-resource-attag',
  removedFromTag: 'audio-resource-rftag'
});