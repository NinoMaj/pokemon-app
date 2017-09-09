export const DISPLAY_NOTIFICATION = 'DISPLAY_NOTIFICATION';

export const displayNotification = (notificationType, title, message, icon) => (
  { type: DISPLAY_NOTIFICATION, id: Date.now(), notificationType, title, message, icon }
);
