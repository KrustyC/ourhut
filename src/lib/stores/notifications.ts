import { writable, derived } from "svelte/store";

const DEFAULT_TIMEOUT = 3000;

type Message = {
  title: string;
  text: string;
};

export enum NotificationType {
  DEFAULT = "default",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  SUCCESS = "success",
}

function createNotificationStore() {
  const _notifications = writable([]);

  function send(
    message: Message,
    type: NotificationType = NotificationType.DEFAULT,
    timeout = DEFAULT_TIMEOUT
  ) {
    _notifications.update((state) => {
      return [...state, { id: id(), type, message, timeout }];
    });
  }

  //   @TODO Potentially implement removal

  const notifications = derived(_notifications, ($_notifications, set) => {
    set($_notifications);

    if ($_notifications.length > 0) {
      const timer = setTimeout(() => {
        _notifications.update((state) => {
          state.shift();
          return state;
        });
      }, $_notifications[0].timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  });

  const { subscribe } = notifications;

  return {
    subscribe,
    send,
    default: (msg, timeout) => send(msg, NotificationType.DEFAULT, timeout),
    danger: (msg, timeout) => send(msg, NotificationType.DANGER, timeout),
    warning: (msg, timeout) => send(msg, NotificationType.WARNING, timeout),
    info: (msg, timeout) => send(msg, NotificationType.INFO, timeout),
    success: (msg, timeout) => send(msg, NotificationType.SUCCESS, timeout),
  };
}

function id() {
  return "_" + Math.random().toString(36);
}

export const notifications = createNotificationStore();
