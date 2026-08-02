import { useSyncExternalStore } from "react";

function subscribe() {
  return () => {};
}

/** True only once mounted on the client — for portals and other APIs that
 * don't exist during SSR. Uses useSyncExternalStore (not useState+useEffect)
 * so there's no setState-in-effect render cascade. */
export function useHasMounted() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
