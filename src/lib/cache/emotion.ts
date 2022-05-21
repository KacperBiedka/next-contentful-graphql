import createCache from "@emotion/cache";
import createEmotionServer from "@emotion/server/create-instance";

export const EMOTION_CACHE_KEY = "emotion-cache";

export const emotionCache = createCache({ key: EMOTION_CACHE_KEY });

export const { extractCritical } = createEmotionServer(emotionCache);
