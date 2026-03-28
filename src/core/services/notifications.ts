import { AppState, AppStateStatus, Platform } from "react-native";

// Lazy load — only import on Android where native module exists
let Notifications: typeof import("expo-notifications") | null = null;

function getNotifications() {
  if (!Notifications && Platform.OS === "android") {
    Notifications = require("expo-notifications");
    Notifications!.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: false,
        shouldShowBanner: false,
        shouldShowList: false,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
  }
  return Notifications;
}

const EXIT_NOTIFICATION_ID = "promo-exit";
const RECURRING_NOTIFICATION_PREFIX = "promo-recurring-";

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

async function scheduleExitNotifications() {
  const N = getNotifications();
  if (!N) return;
  const msg = getRandomExitMessage();

  await N.scheduleNotificationAsync({
    identifier: EXIT_NOTIFICATION_ID,
    content: {
      title: msg.title,
      body: msg.body,
      sound: "default",
    },
    trigger: {
      type: N.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 5,
    },
  });

  const TWO_HOURS = 2 * 60 * 60;
  for (let i = 1; i <= 4; i++) {
    const recurringMsg = getRandomExitMessage();
    await N.scheduleNotificationAsync({
      identifier: `${RECURRING_NOTIFICATION_PREFIX}${i}`,
      content: {
        title: recurringMsg.title,
        body: recurringMsg.body,
        sound: "default",
      },
      trigger: {
        type: N.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: TWO_HOURS * i,
      },
    });
  }
}

async function cancelAllPromoNotifications() {
  const N = getNotifications();
  if (!N) return;
  const ids = [
    EXIT_NOTIFICATION_ID,
    ...Array.from({ length: 4 }, (_, i) => `${RECURRING_NOTIFICATION_PREFIX}${i + 1}`),
  ];

  await Promise.all(
    ids.map((id) =>
      N.cancelScheduledNotificationAsync(id).catch(() => {})
    )
  );
}

export async function requestNotificationPermissions(): Promise<boolean> {
  const N = getNotifications();
  if (!N) return false;
  const { status: existing } = await N.getPermissionsAsync();
  if (existing === "granted") return true;

  const { status } = await N.requestPermissionsAsync();
  return status === "granted";
}

export function setupAppLifecycleNotifications() {
  if (Platform.OS !== "android") return;

  appStateSubscription?.remove();
  let previousState: AppStateStatus = AppState.currentState;

  appStateSubscription = AppState.addEventListener(
    "change",
    async (nextState) => {
      if (
        previousState === "active" &&
        (nextState === "background" || nextState === "inactive")
      ) {
        await scheduleExitNotifications();
      } else if (nextState === "active") {
        await cancelAllPromoNotifications();
      }
      previousState = nextState;
    }
  );
}

export function cleanupNotifications() {
  appStateSubscription?.remove();
  appStateSubscription = null;
}
