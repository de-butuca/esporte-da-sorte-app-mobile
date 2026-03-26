import * as Notifications from "expo-notifications";
import { AppState, AppStateStatus } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

const IN_APP_NOTIFICATION_ID = "promo-in-app";
const EXIT_NOTIFICATION_ID = "promo-exit";
const RECURRING_NOTIFICATION_PREFIX = "promo-recurring-";

const IN_APP_MESSAGE = {
  title: "Voltou na hora certa! ⚽",
  body: "Aposte nos melhores jogos de hoje com odds especiais!",
};

const EXIT_MESSAGES = [
  {
    title: "Sentiu falta? A sorte te espera! 🍀",
    body: "Volte agora e confira as melhores odds do momento!",
  },
  {
    title: "Ei, não vai embora não! 🎯",
    body: "Tem promoção exclusiva te esperando. Aproveite!",
  },
  {
    title: "Sua sorte está aqui! 🎰",
    body: "Jogos ao vivo acontecendo agora. Não perca!",
  },
  {
    title: "A partida já começou! 🏆",
    body: "Entre agora e aproveite as melhores oportunidades!",
  },
];

let appStateSubscription: ReturnType<typeof AppState.addEventListener> | null =
  null;

function getRandomExitMessage() {
  return EXIT_MESSAGES[Math.floor(Math.random() * EXIT_MESSAGES.length)];
}

// Immediately when opening the app
async function fireInAppNotification() {
  await Notifications.scheduleNotificationAsync({
    identifier: IN_APP_NOTIFICATION_ID,
    content: {
      title: IN_APP_MESSAGE.title,
      body: IN_APP_MESSAGE.body,
      sound: "default",
    },
    trigger: null, // fires immediately
  });
}

// Immediately on exit + every 2 hours after
async function scheduleExitNotifications() {
  const msg = getRandomExitMessage();

  // Immediate notification on exit (5 seconds to ensure delivery)
  await Notifications.scheduleNotificationAsync({
    identifier: EXIT_NOTIFICATION_ID,
    content: {
      title: msg.title,
      body: msg.body,
      sound: "default",
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });

  // Recurring every 2 hours (schedule a few in advance)
  const TWO_HOURS = 2 * 60 * 60;
  for (let i = 1; i <= 4; i++) {
    const recurringMsg = getRandomExitMessage();
    await Notifications.scheduleNotificationAsync({
      identifier: `${RECURRING_NOTIFICATION_PREFIX}${i}`,
      content: {
        title: recurringMsg.title,
        body: recurringMsg.body,
        sound: "default",
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: TWO_HOURS * i,
      },
    });
  }
}

async function cancelAllPromoNotifications() {
  const ids = [
    IN_APP_NOTIFICATION_ID,
    EXIT_NOTIFICATION_ID,
    ...Array.from({ length: 4 }, (_, i) => `${RECURRING_NOTIFICATION_PREFIX}${i + 1}`),
  ];

  await Promise.all(
    ids.map((id) =>
      Notifications.cancelScheduledNotificationAsync(id).catch(() => {})
    )
  );
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const { status: existing } = await Notifications.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

export function setupAppLifecycleNotifications() {
  appStateSubscription?.remove();

  let previousState: AppStateStatus = AppState.currentState;

  // Schedule the 1-minute in-app notification on startup
  fireInAppNotification();

  appStateSubscription = AppState.addEventListener(
    "change",
    async (nextState) => {
      if (
        previousState === "active" &&
        (nextState === "background" || nextState === "inactive")
      ) {
        // User left — immediate + recurring notifications
        await scheduleExitNotifications();
      } else if (nextState === "active") {
        // User came back — cancel all pending promos, reschedule in-app
        await cancelAllPromoNotifications();
        await fireInAppNotification();
      }

      previousState = nextState;
    }
  );
}

export function cleanupNotifications() {
  appStateSubscription?.remove();
  appStateSubscription = null;
}
